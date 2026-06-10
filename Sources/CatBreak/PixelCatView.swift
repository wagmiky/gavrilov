import SwiftUI

/// A pixel-art orange tabby drawn from a character grid.
/// Blinks every few seconds.
struct PixelCatView: View {

    static let openEyes: [String] = [
        "..K..........K..",
        ".KPK........KPK.",
        ".KOOK......KOOK.",
        "KOOOOKKKKKKOOOOK",
        "KOOOODOODOODOOOK",
        "KOOWEOOOOOOWEOOK",
        "KOOEEOOOOOOEEOOK",
        "KOOOOOOPPOOOOOOK",
        "KPOOOOKOOKOOOOPK",
        ".KOOOOOOOOOOOOK.",
        ".KOOOOOOOOOOOOK.",
        "..KOOOOOOOOOOK..",
        "..KOOOOOOOOOOK..",
        "...KKKKKKKKKK...",
    ]

    static let closedEyes: [String] = [
        "..K..........K..",
        ".KPK........KPK.",
        ".KOOK......KOOK.",
        "KOOOOKKKKKKOOOOK",
        "KOOOODOODOODOOOK",
        "KOOOOOOOOOOOOOOK",
        "KOOKKOOOOOOKKOOK",
        "KOOOOOOPPOOOOOOK",
        "KPOOOOKOOKOOOOPK",
        ".KOOOOOOOOOOOOK.",
        ".KOOOOOOOOOOOOK.",
        "..KOOOOOOOOOOK..",
        "..KOOOOOOOOOOK..",
        "...KKKKKKKKKK...",
    ]

    static let palette: [Character: Color] = [
        "K": Color(red: 0.16, green: 0.11, blue: 0.13),  // outline
        "O": Color(red: 0.96, green: 0.62, blue: 0.26),  // orange fur
        "D": Color(red: 0.83, green: 0.45, blue: 0.15),  // darker stripes
        "W": Color.white,                                // eye shine
        "P": Color(red: 0.99, green: 0.62, blue: 0.68),  // ears, nose, blush
        "E": Color(red: 0.18, green: 0.55, blue: 0.32),  // green eyes
    ]

    var body: some View {
        TimelineView(.periodic(from: .now, by: 0.2)) { context in
            let t = context.date.timeIntervalSinceReferenceDate
            let blinking = t.truncatingRemainder(dividingBy: 4.0) < 0.25
            let grid = blinking ? Self.closedEyes : Self.openEyes

            Canvas { ctx, size in
                let rows = grid.count
                let cols = grid[0].count
                let cell = min(size.width / CGFloat(cols), size.height / CGFloat(rows))
                let xOff = (size.width - cell * CGFloat(cols)) / 2
                let yOff = (size.height - cell * CGFloat(rows)) / 2

                for (r, row) in grid.enumerated() {
                    for (c, ch) in row.enumerated() {
                        guard let color = Self.palette[ch] else { continue }
                        let rect = CGRect(
                            x: xOff + CGFloat(c) * cell,
                            y: yOff + CGFloat(r) * cell,
                            // Slight overlap hides hairline seams between cells.
                            width: cell + 0.5,
                            height: cell + 0.5
                        )
                        ctx.fill(Path(rect), with: .color(color))
                    }
                }
            }
        }
    }
}
