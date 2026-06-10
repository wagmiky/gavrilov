#!/bin/bash
# Builds CatBreak.app (universal: Apple Silicon + Intel) and zips it.
# Must run on macOS. Output: build/CatBreak.zip
set -euo pipefail
cd "$(dirname "$0")/.."

swift build -c release --arch arm64 --arch x86_64
BIN=".build/apple/Products/Release/CatBreak"

APP="build/CatBreak.app"
rm -rf build
mkdir -p "$APP/Contents/MacOS" "$APP/Contents/Resources"

cp "$BIN" "$APP/Contents/MacOS/CatBreak"
cp packaging/Info.plist "$APP/Contents/Info.plist"

# Bake the git commit into the bundle so the in-app updater can tell
# whether a newer release exists, and publish the same id as version.txt.
SHA=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
/usr/libexec/PlistBuddy -c "Add :GitCommitSHA string $SHA" "$APP/Contents/Info.plist" 2>/dev/null \
    || /usr/libexec/PlistBuddy -c "Set :GitCommitSHA $SHA" "$APP/Contents/Info.plist"
printf '%s' "$SHA" > build/version.txt

# Build the .icns icon from the committed 1024px pixel-cat PNG.
if [ -f packaging/icon_1024.png ]; then
    ICONSET="build/AppIcon.iconset"
    mkdir -p "$ICONSET"
    for size in 16 32 128 256 512; do
        sips -z "$size" "$size" packaging/icon_1024.png --out "$ICONSET/icon_${size}x${size}.png" >/dev/null
        double=$((size * 2))
        sips -z "$double" "$double" packaging/icon_1024.png --out "$ICONSET/icon_${size}x${size}@2x.png" >/dev/null
    done
    iconutil -c icns "$ICONSET" -o "$APP/Contents/Resources/AppIcon.icns"
fi

# Ad-hoc signature so the app runs on Apple Silicon.
codesign --force --deep -s - "$APP"

ditto -c -k --keepParent "$APP" build/CatBreak.zip
echo "Built $APP -> build/CatBreak.zip"
