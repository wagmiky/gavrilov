import AppKit
import SwiftUI

/// User-adjustable preferences, persisted in UserDefaults.
final class Settings: ObservableObject {
    static let shared = Settings()

    private let breakKey = "breakIntervalMinutes"
    private let waterKey = "waterEveryNBreaks"

    /// Minutes between breaks (15...120 in 15-minute steps).
    @Published var breakIntervalMinutes: Int {
        didSet {
            UserDefaults.standard.set(breakIntervalMinutes, forKey: breakKey)
            onIntervalChange?()
        }
    }

    /// Show the water reminder on every Nth break (1, 2 or 3).
    @Published var waterEveryNBreaks: Int {
        didSet { UserDefaults.standard.set(waterEveryNBreaks, forKey: waterKey) }
    }

    /// Called when the break interval changes, so the app can reschedule.
    var onIntervalChange: (() -> Void)?

    var breakInterval: TimeInterval { TimeInterval(breakIntervalMinutes * 60) }

    private init() {
        let d = UserDefaults.standard
        let m = d.integer(forKey: breakKey)
        breakIntervalMinutes = (m == 0) ? 60 : min(max(m, 15), 120)
        let w = d.integer(forKey: waterKey)
        waterEveryNBreaks = (w == 0) ? 2 : min(max(w, 1), 3)
    }
}

/// AppKit slider wrapper so we get real tick marks (one every 15 minutes)
/// and snap-to-mark behaviour, which SwiftUI's Slider can't do on macOS.
struct TickSlider: NSViewRepresentable {
    @Binding var value: Double
    let minValue: Double
    let maxValue: Double
    let tickCount: Int

    func makeNSView(context: Context) -> NSSlider {
        let slider = NSSlider(value: value, minValue: minValue, maxValue: maxValue,
                              target: context.coordinator,
                              action: #selector(Coordinator.changed(_:)))
        slider.numberOfTickMarks = tickCount
        slider.allowsTickMarkValuesOnly = true
        slider.tickMarkPosition = .below
        return slider
    }

    func updateNSView(_ nsView: NSSlider, context: Context) {
        nsView.doubleValue = value
    }

    func makeCoordinator() -> Coordinator { Coordinator(self) }

    final class Coordinator: NSObject {
        let parent: TickSlider
        init(_ parent: TickSlider) { self.parent = parent }
        @objc func changed(_ sender: NSSlider) { parent.value = sender.doubleValue }
    }
}

struct SettingsView: View {
    @ObservedObject private var settings = Settings.shared
    @State private var sliderValue = Double(Settings.shared.breakIntervalMinutes)

    private var intervalLabel: String {
        let m = Int(sliderValue)
        if m % 60 == 0 { return m == 60 ? "1 hour" : "\(m / 60) hours" }
        if m > 60 { return "\(m / 60) h \(m % 60) min" }
        return "\(m) min"
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 22) {
            Text("CatBreak Settings 🐈")
                .font(.system(size: 17, weight: .bold, design: .rounded))

            VStack(alignment: .leading, spacing: 8) {
                Text("Break every \(intervalLabel)")
                    .font(.system(size: 14, weight: .semibold))
                TickSlider(value: $sliderValue, minValue: 15, maxValue: 120, tickCount: 8)
                HStack {
                    Text("15 min").font(.caption).foregroundColor(.secondary)
                    Spacer()
                    Text("2 hours").font(.caption).foregroundColor(.secondary)
                }
            }

            VStack(alignment: .leading, spacing: 8) {
                Text("Remind me to sip water")
                    .font(.system(size: 14, weight: .semibold))
                Picker("", selection: $settings.waterEveryNBreaks) {
                    Text("Every break").tag(1)
                    Text("Every 2 breaks").tag(2)
                    Text("Every 3 breaks").tag(3)
                }
                .pickerStyle(.segmented)
                .labelsHidden()
            }

            Text("Changing the interval restarts the countdown.")
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .padding(24)
        .frame(width: 400)
        .onChange(of: sliderValue) { newValue in
            settings.breakIntervalMinutes = Int(newValue)
        }
    }
}

/// Owns the single settings window (the app has no dock icon, so we
/// create the window on demand and bring it to the front).
final class SettingsWindowController {
    static let shared = SettingsWindowController()
    private var window: NSWindow?

    func show() {
        if window == nil {
            let hosting = NSHostingController(rootView: SettingsView())
            let win = NSWindow(contentViewController: hosting)
            win.title = "CatBreak Settings"
            win.styleMask = [.titled, .closable]
            win.isReleasedWhenClosed = false
            window = win
        }
        NSApp.activate(ignoringOtherApps: true)
        window?.center()
        window?.makeKeyAndOrderFront(nil)
    }
}
