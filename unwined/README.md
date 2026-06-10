# UnWined — iPhone app (React)

A pixel-faithful recreation of the UnWined onboarding + tracker flow as a
mobile-first React app. Built from the UnWined design system (the "dawn"
brand kit) and the final onboarding copy flow.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # serve the production build
```

Open on a phone (or a ~393px viewport) for the native, full-bleed
experience; on desktop the app renders inside an iPhone frame for preview.

## The flow

Welcome → path choice (quit / mindful) → name → quiz (goals, frequency,
spend) → reassurance (frame 22) → feature tour (26 welcome + social proof,
27 streak, 28 urge tools, 31 lessons) → science connector (32) →
credibility ("our program is based on") → referral code (35) → insight
("your answers tell a story") → the "2 paths" divergence chart → 90-day
benefits projection (36) → tracker home with streak ring, money saved,
empty calories avoided, aura farmed, and the Urge button (5-minute timer +
guided breathing).

Projection numbers are computed from the quiz answers (drinking frequency ×
typical spend). Progress and answers persist in `localStorage`, so the app
restores exactly where you left off; "Start over" on the home screen resets.

## Design system

Tokens live in `src/styles/tokens.css`, straight from the brand kit:

- **Dawn gradient** background (periwinkle → navy → plum), full-bleed on
  every screen; a sideways variant on the welcome hero.
- **Instrument Serif** for display headlines (sentence case, ending in a
  period); the SF Pro Display stack (`-apple-system`) for everything else.
- **Glass surfaces**: `rgba(255,255,255,.08)` fill + 1px inset hairline —
  no drop shadows; depth comes from hairlines and soft glows.
- Accents with meaning: blue `#0088FF` (clarity), red `#E23250` (urges /
  the old pattern), gold `#FFDD19` (milestones & sparkle).
- White pill primary buttons, 48px tall, ink `rgb(35,35,35)`.
- Motion: 240ms `cubic-bezier(0.22,1,0.36,1)` fades/rises, press scale 0.97,
  no bounce.

> Note: the shared Figma link contains the competitor-research board only;
> the UnWined product frames live in a separate .fig. This build follows
> the design-system readme and the onboarding copy-flow HTML for screen
> content and visuals.
