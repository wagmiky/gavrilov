#!/usr/bin/env python3
"""Generates packaging/icon_1024.png — the pixel cat on a rounded
pastel background — using only the Python standard library."""

import os
import struct
import zlib

GRID = [
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

PALETTE = {
    "K": (41, 28, 33, 255),
    "O": (245, 158, 66, 255),
    "D": (212, 115, 38, 255),
    "W": (255, 255, 255, 255),
    "P": (252, 158, 173, 255),
    "E": (46, 140, 82, 255),
}

SIZE = 1024
BACKGROUND = (255, 224, 178, 255)  # warm pastel
CORNER_RADIUS = 180


def rounded_rect_contains(x, y, size, radius):
    if radius <= x < size - radius or radius <= y < size - radius:
        return True
    cx = radius if x < radius else size - 1 - radius
    cy = radius if y < radius else size - 1 - radius
    return (x - cx) ** 2 + (y - cy) ** 2 <= radius ** 2


def build_pixels():
    cols = len(GRID[0])
    rows = len(GRID)
    cell = (SIZE - 160) // cols          # leave a margin around the cat
    cat_w, cat_h = cell * cols, cell * rows
    x0 = (SIZE - cat_w) // 2
    y0 = (SIZE - cat_h) // 2

    pixels = bytearray()
    for y in range(SIZE):
        row = bytearray()
        for x in range(SIZE):
            if not rounded_rect_contains(x, y, SIZE, CORNER_RADIUS):
                row += bytes((0, 0, 0, 0))
                continue
            color = BACKGROUND
            gx, gy = (x - x0) // cell, (y - y0) // cell
            if 0 <= gx < cols and 0 <= gy < rows:
                ch = GRID[gy][gx]
                if ch in PALETTE:
                    color = PALETTE[ch]
            row += bytes(color)
        pixels += b"\x00" + row  # filter byte 0 per scanline
    return bytes(pixels)


def write_png(path, pixels):
    def chunk(tag, data):
        block = tag + data
        return struct.pack(">I", len(data)) + block + struct.pack(">I", zlib.crc32(block))

    ihdr = struct.pack(">IIBBBBB", SIZE, SIZE, 8, 6, 0, 0, 0)
    with open(path, "wb") as f:
        f.write(b"\x89PNG\r\n\x1a\n")
        f.write(chunk(b"IHDR", ihdr))
        f.write(chunk(b"IDAT", zlib.compress(pixels, 9)))
        f.write(chunk(b"IEND", b""))


if __name__ == "__main__":
    out = os.path.join(os.path.dirname(__file__), "..", "packaging", "icon_1024.png")
    write_png(out, build_pixels())
    print(f"Wrote {os.path.abspath(out)}")
