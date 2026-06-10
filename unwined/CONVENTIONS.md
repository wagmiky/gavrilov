# UnWined screen implementation conventions (for Figma → React)

Project: Vite + React (plain JSX, no TypeScript, **no Tailwind**). Each Figma
frame (440×956) becomes one component in `src/screens/Screen{NN}.jsx`. The
shell scales the 440×956 design space to the device, so **use absolute
positioning with the exact pixel values from Figma** — left/top/width/height
and font sizes are copied verbatim from the design context.

## Figma source

File key: `wiy1toWAjKdgsNwcizCtI0`, page "Дизайн экранов" (1:519).
Use `mcp__Figma__get_design_context` with `excludeScreenshot: true` for each
assigned node, and `mcp__Figma__get_screenshot` (maxDimension 956) to download
a reference PNG into `figma-refs/{NN}.png` via curl.

## Component contract

```jsx
import { StatusBar, Logo, Pill, SkipLink } from '../components/Shell.jsx'

export default function Screen05({ next, back, answers, setAnswer }) { ... }
```

- Root element: `<div className="fig">` — this carries the signature radial
  gradient (dark plum top → periwinkle bottom) already defined in CSS.
  For white frames use `<div className="fig white">` and `<StatusBar dark />`.
- `<StatusBar />` always; it renders the 9:41 iOS status bar (62px tall).
- The `лого` placeholder text in frames = render `<Logo />` (UnWined wordmark,
  top 78 centered). Keep its position if the frame moves it.
- Positioned elements: `<p className="abs" style={{ left, top, width, fontSize }}>`.
  Class `serif` = Instrument Serif (display headlines). Default font is the
  SF Pro Display system stack. `med` = weight 500.
- Primary CTA: `<Pill x={129} y={776} label="…" onClick={next} />` (182×48
  white pill, exact Figma geometry — adjust x/y/w to the frame's values).
  `glass` prop for the translucent variant, `disabled` prop when the design
  shows a not-yet-active state.
- `skip →` link: `<SkipLink onClick={next} />`.
- Keep ALL copy exactly as written in the frame (capitalization, periods,
  typos included). Russian annotation texts/`safe zone` overlays are NOT part
  of the screen — skip anything `hidden="true"` and anything outside the
  440×956 frame.

## Interactivity

- Question screens: tapping an option stores the answer
  (`setAnswer('qNN', value)`) **and** shows the selected state; the screen
  advances via its CTA, or ~500ms after selection if the frame has no CTA
  (frames named `N` + a confirm variant show selection then advance).
- If a question's options are "i wanna quit drinking" / "be mindful about
  drinking" (any casing), ALSO store `setAnswer('path', 'quit' | 'mindful')`.
- Screen 13's answer must be stored as
  `setAnswer('q13', 'yes-unsuccessfully' | 'yes-successfully' | 'no')`
  (it routes the screen-14 variant).
- Sliders / inputs / multi-selects: implement them working (React state),
  visually exact to the frame.

## Assets

Download every `https://www.figma.com/api/mcp/asset/...` URL referenced by
your screens with curl into `src/assets/s{NN}-{shortname}.{svg|png}` and
import them. Never hot-link the figma URLs (they expire). Check the file type
(`file` command) — name SVGs `.svg`, PNGs `.png`. Shared star asset already
exists: `src/assets/star-gold.svg` (gold ★, 31px grid).

## Fidelity bar

Positions, sizes, colors, gradients, radii, opacities and copy must match the
design context exactly. Recreate simple vectors (arrows, strokes, dots) as
inline SVG; download complex ones. When the design context shows an absolute
center transform (`-translate-x-1/2`), reproduce with
`transform: 'translateX(-50%)'`.

After writing your screens, run `npm run build` in `/home/user/gavrilov/unwined`
to confirm they compile. Do not modify files outside your assigned screens,
except adding assets.
