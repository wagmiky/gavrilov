import SwiftUI
import Combine

struct ChecklistItem: Identifiable {
    let id = UUID()
    let emoji: String
    let text: String
    var isEyeRest = false
}

/// The full break screen: pixel cat, speech bubble, mandatory
/// checklist and a "back to work" button that only unlocks once
/// every box is ticked.
struct BreakView: View {
    let items: [ChecklistItem]
    let onSnooze: () -> Void
    let onComplete: () -> Void

    @State private var checked: Set<UUID> = []

    private var allDone: Bool { checked.count == items.count }

    var body: some View {
        VStack(spacing: 26) {
            PixelCatView()
                .frame(width: 180, height: 158)

            Text("Mrrow! Hooman, it's break o'clock! 🐾")
                .font(.system(size: 26, weight: .bold, design: .rounded))
                .foregroundColor(.white)
                .shadow(radius: 4)

            VStack(alignment: .leading, spacing: 16) {
                ForEach(items) { item in
                    ChecklistRow(item: item, checked: $checked)
                }
            }
            .padding(26)
            .frame(maxWidth: 560)
            .background(
                RoundedRectangle(cornerRadius: 18, style: .continuous)
                    .fill(Color.white.opacity(0.12))
            )

            if !allDone {
                Button {
                    withAnimation(.easeInOut(duration: 0.2)) {
                        checked = Set(items.map(\.id))
                    }
                } label: {
                    Text("Check all  ✓")
                        .font(.system(size: 14, weight: .semibold, design: .rounded))
                        .foregroundColor(.white.opacity(0.9))
                        .padding(.horizontal, 18)
                        .padding(.vertical, 8)
                        .background(Capsule().fill(Color.white.opacity(0.15)))
                }
                .buttonStyle(.plain)
            }

            Button(action: onComplete) {
                Text(allDone ? "Back to work!  ✅" : "Finish the checklist first, hooman 🐾")
                    .font(.system(size: 17, weight: .semibold, design: .rounded))
                    .foregroundColor(allDone ? .black : .white.opacity(0.55))
                    .padding(.horizontal, 28)
                    .padding(.vertical, 13)
                    .background(
                        Capsule().fill(allDone ? Color.green : Color.white.opacity(0.12))
                    )
            }
            .buttonStyle(.plain)
            .disabled(!allDone)
            .animation(.easeInOut(duration: 0.2), value: allDone)

            if !allDone {
                Button(action: onSnooze) {
                    Text("Snooze 15 min 💤")
                        .font(.system(size: 13, weight: .medium, design: .rounded))
                        .foregroundColor(.white.opacity(0.6))
                        .underline()
                }
                .buttonStyle(.plain)
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}

struct ChecklistRow: View {
    let item: ChecklistItem
    @Binding var checked: Set<UUID>

    /// Remaining seconds of the optional 20-second eye-rest countdown.
    @State private var eyeCountdown: Int?
    private let ticker = Timer.publish(every: 1, on: .main, in: .common).autoconnect()

    private var isChecked: Bool { checked.contains(item.id) }

    var body: some View {
        HStack(spacing: 14) {
            Button {
                if isChecked {
                    checked.remove(item.id)
                } else {
                    checked.insert(item.id)
                    eyeCountdown = nil
                }
            } label: {
                Image(systemName: isChecked ? "checkmark.square.fill" : "square")
                    .font(.system(size: 24))
                    .foregroundColor(isChecked ? .green : .white.opacity(0.85))
            }
            .buttonStyle(.plain)

            Text("\(item.emoji)  \(item.text)")
                .font(.system(size: 16, weight: .medium, design: .rounded))
                .foregroundColor(.white)
                .strikethrough(isChecked, color: .white.opacity(0.6))
                .opacity(isChecked ? 0.6 : 1)

            Spacer(minLength: 12)

            if item.isEyeRest && !isChecked {
                if let seconds = eyeCountdown {
                    Text("\(seconds)s")
                        .font(.system(size: 15, weight: .bold, design: .monospaced))
                        .foregroundColor(.yellow)
                        .frame(minWidth: 38)
                } else {
                    Button("⏱ 20s timer") {
                        eyeCountdown = 20
                    }
                    .buttonStyle(.plain)
                    .font(.system(size: 13, weight: .semibold, design: .rounded))
                    .foregroundColor(.white.opacity(0.9))
                    .padding(.horizontal, 10)
                    .padding(.vertical, 5)
                    .background(Capsule().fill(Color.white.opacity(0.15)))
                }
            }
        }
        .onReceive(ticker) { _ in
            guard let seconds = eyeCountdown else { return }
            if seconds <= 1 {
                eyeCountdown = nil
                checked.insert(item.id)
            } else {
                eyeCountdown = seconds - 1
            }
        }
    }
}

/// Shown on any additional monitors: just the blur, the cat and a hint.
struct SecondaryScreenView: View {
    var body: some View {
        VStack(spacing: 20) {
            PixelCatView()
                .frame(width: 140, height: 123)
            Text("Break time 🐾 — finish the checklist on your main screen")
                .font(.system(size: 18, weight: .semibold, design: .rounded))
                .foregroundColor(.white.opacity(0.9))
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}
