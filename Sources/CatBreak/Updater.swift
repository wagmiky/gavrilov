import AppKit
import Foundation

/// Self-updater. On demand (menu) or silently at launch, it asks GitHub
/// for the latest release, compares the embedded git commit against it,
/// and — if a newer build exists — downloads the app, swaps it in place
/// and relaunches. Works without a token because the repo is public.
enum Updater {

    static let owner = "wagmiky"
    static let repo = "gavrilov"
    static let zipAssetName = "CatBreak.zip"
    static let versionAssetName = "version.txt"

    /// The git short SHA this build was compiled from (baked into Info.plist
    /// by scripts/build_app.sh). "dev" when running via `swift run`.
    static var currentSHA: String {
        (Bundle.main.object(forInfoDictionaryKey: "GitCommitSHA") as? String) ?? "dev"
    }

    private static var isChecking = false

    struct ReleaseInfo {
        let sha: String
        let zipURL: URL
    }

    enum UpdaterError: LocalizedError {
        case http(Int)
        case noAsset
        case unknownVersion
        case badArchive
        case process(String, Int32)

        var errorDescription: String? {
            switch self {
            case .http(let code): return "GitHub returned HTTP \(code)."
            case .noAsset: return "The latest release has no CatBreak.zip yet."
            case .unknownVersion: return "Couldn't read the latest version info."
            case .badArchive: return "The downloaded update was not a valid app."
            case .process(let tool, let code): return "\(tool) failed (exit \(code))."
            }
        }
    }

    // MARK: - Entry point

    static func checkForUpdates(userInitiated: Bool) {
        // Dev builds have no real SHA — skip the silent launch check.
        if !userInitiated && currentSHA == "dev" { return }
        if isChecking { return }
        isChecking = true

        Task {
            defer { isChecking = false }
            do {
                let info = try await fetchLatest()
                await MainActor.run {
                    if info.sha == currentSHA {
                        if userInitiated { showUpToDate() }
                    } else {
                        promptUpdate(info: info)
                    }
                }
            } catch {
                await MainActor.run {
                    if userInitiated { showError(error) }
                }
            }
        }
    }

    // MARK: - Networking

    private static func fetchLatest() async throws -> ReleaseInfo {
        let apiURL = URL(string: "https://api.github.com/repos/\(owner)/\(repo)/releases/latest")!
        var req = URLRequest(url: apiURL)
        req.setValue("application/vnd.github+json", forHTTPHeaderField: "Accept")
        req.setValue("CatBreak", forHTTPHeaderField: "User-Agent")
        req.cachePolicy = .reloadIgnoringLocalCacheData

        let (data, resp) = try await URLSession.shared.data(for: req)
        guard let http = resp as? HTTPURLResponse else { throw UpdaterError.http(-1) }
        guard http.statusCode == 200 else { throw UpdaterError.http(http.statusCode) }

        let release = try JSONDecoder().decode(GHRelease.self, from: data)
        guard let zipAsset = release.assets.first(where: { $0.name == zipAssetName }),
              let zipURL = URL(string: zipAsset.browser_download_url) else {
            throw UpdaterError.noAsset
        }
        guard let verAsset = release.assets.first(where: { $0.name == versionAssetName }),
              let verURL = URL(string: verAsset.browser_download_url) else {
            throw UpdaterError.unknownVersion
        }

        let (verData, _) = try await URLSession.shared.data(from: verURL)
        let sha = String(decoding: verData, as: UTF8.self)
            .trimmingCharacters(in: .whitespacesAndNewlines)
        guard !sha.isEmpty else { throw UpdaterError.unknownVersion }

        return ReleaseInfo(sha: sha, zipURL: zipURL)
    }

    // MARK: - Install

    private static func performUpdate(zipURL: URL) {
        Task {
            do {
                try await downloadAndInstall(zipURL: zipURL)
            } catch {
                await MainActor.run { showError(error) }
            }
        }
    }

    private static func downloadAndInstall(zipURL: URL) async throws {
        let fm = FileManager.default

        let (tmpFile, _) = try await URLSession.shared.download(from: zipURL)
        let workDir = fm.temporaryDirectory
            .appendingPathComponent("CatBreakUpdate-\(UUID().uuidString)")
        try fm.createDirectory(at: workDir, withIntermediateDirectories: true)
        let zipPath = workDir.appendingPathComponent(zipAssetName)
        try fm.moveItem(at: tmpFile, to: zipPath)

        try runProcess("/usr/bin/ditto", ["-x", "-k", zipPath.path, workDir.path])
        let newApp = workDir.appendingPathComponent("CatBreak.app")
        guard fm.fileExists(atPath: newApp.path) else { throw UpdaterError.badArchive }

        // Resolve the real bundle path, undoing App Translocation if needed
        // (a quarantined app runs from a read-only random mount, which we
        // can't write to). The replacement strips quarantine, so subsequent
        // launches run normally from the real location.
        let destURL = realBundleURL()
        let destPath = destURL.path
        let destParent = destURL.deletingLastPathComponent().path
        guard fm.isWritableFile(atPath: destParent) else {
            await MainActor.run { showNotWritable(at: destPath) }
            return
        }

        // A tiny script (outside workDir so it can clean workDir up) waits for
        // this process to quit, replaces the bundle, then relaunches it.
        let script = """
        #!/bin/bash
        APP_PID="$1"; NEW="$2"; DEST="$3"; WORK="$4"
        while kill -0 "$APP_PID" 2>/dev/null; do sleep 0.3; done
        sleep 0.5
        rm -rf "$DEST"
        /usr/bin/ditto "$NEW" "$DEST"
        /usr/bin/xattr -dr com.apple.quarantine "$DEST" 2>/dev/null
        rm -rf "$WORK"
        open "$DEST"
        """
        let scriptPath = fm.temporaryDirectory
            .appendingPathComponent("CatBreakInstall-\(UUID().uuidString).sh")
        try script.write(to: scriptPath, atomically: true, encoding: .utf8)

        let pid = ProcessInfo.processInfo.processIdentifier
        let launch = Process()
        launch.executableURL = URL(fileURLWithPath: "/bin/bash")
        launch.arguments = ["-c",
            "nohup bash \"\(scriptPath.path)\" \(pid) \"\(newApp.path)\" \"\(destPath)\" \"\(workDir.path)\" >/dev/null 2>&1 &"]
        try launch.run()

        await MainActor.run { NSApp.terminate(nil) }
    }

    /// The real on-disk bundle URL. When macOS App Translocation is active
    /// (the app runs from a random read-only `/AppTranslocation/…` mount
    /// because it's still quarantined), this asks the Security framework for
    /// the original path so we can update the actual app in /Applications.
    private static func realBundleURL() -> URL {
        let current = Bundle.main.bundleURL
        guard current.path.contains("/AppTranslocation/") else { return current }

        typealias OriginalPathFn = @convention(c)
            (CFURL, UnsafeMutablePointer<Unmanaged<CFError>?>?) -> Unmanaged<CFURL>?
        guard let handle = dlopen("/System/Library/Frameworks/Security.framework/Security", RTLD_NOW),
              let sym = dlsym(handle, "SecTranslocateCreateOriginalPathForURL") else {
            return current
        }
        let resolve = unsafeBitCast(sym, to: OriginalPathFn.self)
        if let result = resolve(current as CFURL, nil) {
            return result.takeRetainedValue() as URL
        }
        return current
    }

    @discardableResult
    private static func runProcess(_ path: String, _ args: [String]) throws -> Int32 {
        let p = Process()
        p.executableURL = URL(fileURLWithPath: path)
        p.arguments = args
        try p.run()
        p.waitUntilExit()
        if p.terminationStatus != 0 {
            throw UpdaterError.process(path, p.terminationStatus)
        }
        return p.terminationStatus
    }

    // MARK: - Alerts

    private static func promptUpdate(info: ReleaseInfo) {
        NSApp.activate(ignoringOtherApps: true)
        let alert = NSAlert()
        alert.messageText = "A new version of CatBreak is available 🐈"
        alert.informativeText = "You're on build \(currentSHA); the latest is \(info.sha).\n\nUpdate now? CatBreak will briefly quit and reopen automatically."
        alert.addButton(withTitle: "Update Now")
        alert.addButton(withTitle: "Later")
        if alert.runModal() == .alertFirstButtonReturn {
            performUpdate(zipURL: info.zipURL)
        }
    }

    private static func showUpToDate() {
        NSApp.activate(ignoringOtherApps: true)
        let alert = NSAlert()
        alert.messageText = "You're up to date 🐾"
        alert.informativeText = "CatBreak is running the latest version (build \(currentSHA))."
        alert.addButton(withTitle: "OK")
        alert.runModal()
    }

    private static func showError(_ error: Error) {
        NSApp.activate(ignoringOtherApps: true)
        let alert = NSAlert()
        alert.messageText = "Couldn't check for updates"
        alert.informativeText = error.localizedDescription
        alert.addButton(withTitle: "OK")
        alert.runModal()
    }

    private static func showNotWritable(at path: String) {
        NSApp.activate(ignoringOtherApps: true)
        let alert = NSAlert()
        alert.messageText = "Update needs write access"
        alert.informativeText = "CatBreak couldn't replace itself at:\n\(path)\n\nQuit CatBreak and run this once in Terminal, then reopen it from Applications:\n\nxattr -dr com.apple.quarantine /Applications/CatBreak.app"
        alert.addButton(withTitle: "OK")
        alert.runModal()
    }
}

private struct GHRelease: Decodable {
    let assets: [GHAsset]
}

private struct GHAsset: Decodable {
    let name: String
    let browser_download_url: String
}
