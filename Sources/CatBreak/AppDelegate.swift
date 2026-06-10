import AppKit
import SwiftUI

final class AppDelegate: NSObject, NSApplicationDelegate {

    private let settings = Settings.shared

    private var statusItem: NSStatusItem!
    private var nextBreakMenuItem: NSMenuItem!
    private var tickTimer: Timer?
    private var nextBreakDate = Date().addingTimeInterval(Settings.shared.breakInterval)
    private var breaksTaken = 0
    private var breakInProgress = false
    private var overlays: [OverlayWindowController] = []

    func applicationDidFinishLaunching(_ notification: Notification) {
        NSApp.setActivationPolicy(.accessory)

        statusItem = NSStatusBar.system.statusItem(withLength: NSStatusItem.variableLength)
        statusItem.button?.title = "🐈"
        buildMenu()

        let timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { [weak self] _ in
            self?.tick()
        }
        RunLoop.main.add(timer, forMode: .common)
        tickTimer = timer
        tick()

        // Reschedule the countdown whenever the user changes the interval.
        settings.onIntervalChange = { [weak self] in
            guard let self, !self.breakInProgress else { return }
            self.nextBreakDate = Date().addingTimeInterval(self.settings.breakInterval)
            self.tick()
        }

        // Quietly check for a newer build a few seconds after launch;
        // only prompts if an update is actually available.
        DispatchQueue.main.asyncAfter(deadline: .now() + 4) {
            Updater.checkForUpdates(userInitiated: false)
        }
    }

    @objc private func checkForUpdates() {
        Updater.checkForUpdates(userInitiated: true)
    }

    @objc private func openSettings() {
        SettingsWindowController.shared.show()
    }

    private func buildMenu() {
        let menu = NSMenu()

        nextBreakMenuItem = NSMenuItem(title: "Next break: —", action: nil, keyEquivalent: "")
        nextBreakMenuItem.isEnabled = false
        menu.addItem(nextBreakMenuItem)
        menu.addItem(.separator())

        let breakNow = NSMenuItem(title: "Take a break now", action: #selector(takeBreakNow), keyEquivalent: "b")
        breakNow.target = self
        menu.addItem(breakNow)

        let restart = NSMenuItem(title: "Restart timer", action: #selector(restartTimer), keyEquivalent: "r")
        restart.target = self
        menu.addItem(restart)

        menu.addItem(.separator())

        let settingsItem = NSMenuItem(title: "Settings…", action: #selector(openSettings), keyEquivalent: ",")
        settingsItem.target = self
        menu.addItem(settingsItem)

        let update = NSMenuItem(title: "Check for Updates…", action: #selector(checkForUpdates), keyEquivalent: "u")
        update.target = self
        menu.addItem(update)

        menu.addItem(.separator())
        menu.addItem(NSMenuItem(title: "Quit CatBreak", action: #selector(NSApplication.terminate(_:)), keyEquivalent: "q"))

        statusItem.menu = menu
    }

    private func tick() {
        guard !breakInProgress else { return }

        // Clamp in case the system clock jumped backwards.
        if nextBreakDate.timeIntervalSinceNow > settings.breakInterval {
            nextBreakDate = Date().addingTimeInterval(settings.breakInterval)
        }

        let remaining = nextBreakDate.timeIntervalSinceNow
        if remaining <= 0 {
            startBreak()
            return
        }

        let minutes = Int(remaining) / 60
        let seconds = Int(remaining) % 60
        statusItem.button?.title = String(format: "🐈 %02d:%02d", minutes, seconds)
        nextBreakMenuItem.title = String(format: "Next break in %02d:%02d", minutes, seconds)
    }

    @objc private func takeBreakNow() {
        guard !breakInProgress else { return }
        startBreak()
    }

    @objc private func restartTimer() {
        guard !breakInProgress else { return }
        nextBreakDate = Date().addingTimeInterval(settings.breakInterval)
        tick()
    }

    private func startBreak() {
        breakInProgress = true
        breaksTaken += 1
        statusItem.button?.title = "🐈 break!"
        nextBreakMenuItem.title = "Break in progress…"

        var items = [
            ChecklistItem(emoji: "👀", text: "Look at something far away for 20 seconds", isEyeRest: true),
            ChecklistItem(emoji: "🪑", text: "Straighten your back & drop your shoulders"),
            ChecklistItem(emoji: "🤸", text: "Stand up and stretch"),
        ]
        if breaksTaken % settings.waterEveryNBreaks == 0 {
            items.append(ChecklistItem(emoji: "💧", text: "Sip some water"))
        }

        let mainScreen = NSScreen.main ?? NSScreen.screens.first
        for screen in NSScreen.screens {
            let controller = OverlayWindowController(
                screen: screen,
                items: screen == mainScreen ? items : nil
            ) { [weak self] in
                self?.endBreak()
            }
            controller.show()
            overlays.append(controller)
        }
        NSApp.activate(ignoringOtherApps: true)
    }

    private func endBreak() {
        overlays.forEach { $0.close() }
        overlays.removeAll()
        breakInProgress = false
        nextBreakDate = Date().addingTimeInterval(settings.breakInterval)
        tick()
    }
}
