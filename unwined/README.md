# UnWined — iPhone app (React)

A 1:1 recreation of the UnWined onboarding flow from the Figma file
(page "Дизайн экранов", numbered frames 1–39 + 111), as a mobile-first
React app.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # serve the production build
```

Every screen is laid out in the exact 440×956 coordinate space of the
Figma frames and scaled uniformly to the device, so it renders
pixel-faithfully on any phone; on desktop it sits in an iPhone bezel.

## The flow

Splash (1) → welcome (2) → name & age (3) → quiz: gender (4), source (5),
weekly drinks (6), reasons (7), 8, 9, regret (10), day-after (11),
how long (12), tried quitting (13) → encouragement variant 14-1/2/3 (routed
by 13) → goal/path question (15, sets quit vs mindful) → motivations (16) →
spend wheel (17, includes the selected state from frame 18) → "2 paths"
chart / "Hard truth" calendar (19-1 / 19-2 by path) → consequences map (20)
→ habit loop (21) → "Clarity is closer" (22) → plans (23) → feature tour
(26–31: welcome, streak ring, urge tools, friends & accountability,
journaling/emotions, lessons) → science connector (32) → expert quotes (33)
→ research credibility (34) → referral (35) → "Your life, but better."
projection (36) → 37 → "No more excuses" (38) → slide to commit (39) →
after-onboarding (111).

All controls work: single-choice questions show the white selected state
and auto-advance, multi-selects toggle, the spend wheel rotates by drag,
and frame 39 is a real slide-to-commit. Answers (name, path, spend…)
personalize later screens and persist in `localStorage`.

Reference screenshots of every source frame live in `figma-refs/` for
side-by-side comparison. `CONVENTIONS.md` documents the implementation
rules. Designer placeholders in the frames ("Question Y", "лого") are
resolved per flow position and the UnWined wordmark; placeholder frame 32
uses the approved onboarding copy. Source typos ("Occasionaly",
"unsucessfully", "San") are kept verbatim per the pixel-fidelity bar.
