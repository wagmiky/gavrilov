import AppKit
import SwiftUI

final class AppDelegate: NSObject, NSApplicationDelegate {

    private let settings = Settings.shared

    private var statusItem: NSStatusItem!
    private var nextBreakMenuItem: NSMenuItem!
    private var tickTimer: Timer?
    private var nextBreakDate = Date().addingTimeInterval(Settings.shared.breakInterval)
    /// How much time the current countdown was given (interval + any
    /// snoozes); the clock-jump clamp in tick() must respect snoozed time.
    private var scheduledRemaining = Settings.shared.breakInterval
    static let snoozeInterval: TimeInterval = 15 * 60
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
            self.rescheduleFullInterval()
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

        let snooze = NSMenuItem(title: "Snooze 15 minutes", action: #selector(snoozeFromMenu), keyEquivalent: "s")
        snooze.target = self
        menu.addItem(snooze)

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
        if nextBreakDate.timeIntervalSinceNow > scheduledRemaining {
            nextBreakDate = Date().addingTimeInterval(scheduledRemaining)
        }

        let remaining = nextBreakDate.timeIntervalSinceNow
        if remaining <= 0 {
            startBreak()
            return
        }

        let text = Self.formatRemaining(remaining)
        statusItem.button?.title = "🐈 \(text)"
        nextBreakMenuItem.title = "Next break in \(text)"
    }

    /// Human-friendly countdown: "57 min" under an hour, "1 h 23 min" above.
    /// Minutes round up so it never reads "0 min" while time remains.
    static func formatRemaining(_ remaining: TimeInterval) -> String {
        let totalMinutes = max(1, Int(ceil(remaining / 60)))
        if totalMinutes >= 60 {
            let hours = totalMinutes / 60
            let minutes = totalMinutes % 60
            return minutes == 0 ? "\(hours) h" : "\(hours) h \(minutes) min"
        }
        return "\(totalMinutes) min"
    }

    @objc private func takeBreakNow() {
        guard !breakInProgress else { return }
        startBreak()
    }

    @objc private func restartTimer() {
        guard !breakInProgress else { return }
        rescheduleFullInterval()
    }

    private func rescheduleFullInterval() {
        scheduledRemaining = settings.breakInterval
        nextBreakDate = Date().addingTimeInterval(settings.breakInterval)
        tick()
    }

    /// From the menu: delay the upcoming break by 15 minutes. If the break
    /// overlay is already up, this dismisses it and re-fires in 15 minutes.
    @objc private func snoozeFromMenu() {
        if breakInProgress {
            snoozeBreak()
        } else {
            nextBreakDate = nextBreakDate.addingTimeInterval(Self.snoozeInterval)
            scheduledRemaining += Self.snoozeInterval
            tick()
        }
    }

    /// Dismiss the current break overlay and bring it back in 15 minutes.
    /// The skipped break doesn't count towards the water cadence.
    private func snoozeBreak() {
        overlays.forEach { $0.close() }
        overlays.removeAll()
        breaksTaken -= 1
        breakInProgress = false
        scheduledRemaining = Self.snoozeInterval
        nextBreakDate = Date().addingTimeInterval(Self.snoozeInterval)
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
                items: screen == mainScreen ? items : nil,
                onSnooze: { [weak self] in self?.snoozeBreak() }
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
        rescheduleFullInterval()
    }
}
