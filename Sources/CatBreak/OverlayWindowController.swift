import AppKit
import SwiftUI

/// A borderless window that is allowed to become key so the
/// checklist inside it can receive clicks.
private final class OverlayWindow: NSWindow {
    override var canBecomeKey: Bool { true }
    override var canBecomeMain: Bool { true }
}

/// Covers one screen with a blurred, dimmed layer and (on the main
/// screen) the cat + checklist. The window sits above normal app
/// windows so work is paused until the checklist is completed.
final class OverlayWindowController {

    private let window: NSWindow

    init(screen: NSScreen, items: [ChecklistItem]?, onComplete: @escaping () -> Void) {
        window = OverlayWindow(
            contentRect: screen.frame,
            styleMask: .borderless,
            backing: .buffered,
            defer: false
        )
        window.level = .screenSaver
        window.isOpaque = false
        window.backgroundColor = .clear
        window.isReleasedWhenClosed = false
        window.collectionBehavior = [.canJoinAllSpaces, .fullScreenAuxiliary, .stationary]

        let blur = NSVisualEffectView(frame: NSRect(origin: .zero, size: screen.frame.size))
        blur.material = .fullScreenUI
        blur.blendingMode = .behindWindow
        blur.state = .active
        blur.autoresizingMask = [.width, .height]

        let dim = NSView(frame: blur.bounds)
        dim.wantsLayer = true
        dim.layer?.backgroundColor = NSColor.black.withAlphaComponent(0.45).cgColor
        dim.autoresizingMask = [.width, .height]
        blur.addSubview(dim)

        let content: NSView
        if let items {
            content = NSHostingView(rootView: BreakView(items: items, onComplete: onComplete))
        } else {
            content = NSHostingView(rootView: SecondaryScreenView())
        }
        content.frame = blur.bounds
        content.autoresizingMask = [.width, .height]
        blur.addSubview(content)

        window.contentView = blur
        window.setFrame(screen.frame, display: true)
    }

    func show() {
        window.makeKeyAndOrderFront(nil)
    }

    func close() {
        window.orderOut(nil)
    }
}
