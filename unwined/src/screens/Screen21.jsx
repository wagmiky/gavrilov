import { StatusBar, QuizChrome } from '../components/Shell.jsx'

// Figma 318:1348 "21" — "You are not choosing every drink": the habit loop
// (Trigger → Craving → Drink → Relief) on the orange gradient.
const ORANGE =
  'radial-gradient(956px at 220px 0px, rgb(229,97,60) 0%, rgb(226,126,54) 35.8%, rgb(226,106,36) 63.84%, rgb(225,87,18) 91.88%)'

const NODES = [
  { x: 191, y: 319, emoji: '⚡️', label: 'Trigger', lx: 182, ly: 381 },
  { x: 330, y: 461, emoji: '🧠', label: 'Craving', lx: 321, ly: 523 },
  { x: 191, y: 592, emoji: '🍷', label: 'Drink', lx: 182, ly: 654 },
  { x: 55, y: 461, emoji: '😌', label: 'Relief', lx: 46, ly: 523 },
]

// clockwise arrowheads sitting on the 280px loop circle
const ARROWS = [
  [324, 392, 45],
  [311, 588, 135],
  [122, 581, 225],
  [128, 380, 315],
]

export default function Screen21({ next, back }) {
  return (
    <div className="fig" style={{ background: ORANGE }}>
      <StatusBar />
      <QuizChrome back={back} progress={0.78} />
      <p className="abs serif" style={{ left: 55, top: 121, width: 329, fontSize: 46, lineHeight: '51px', textAlign: 'center', color: '#fff' }}>
        You are not choosing every drink
      </p>
      <p className="abs" style={{ left: 80, top: 233, width: 280, fontSize: 22, lineHeight: '24px', textAlign: 'center', color: '#fff' }}>
        It’s a loop – and it’s designed to repeat.
      </p>

      {/* the loop */}
      <div className="abs" style={{ left: 80, top: 344, width: 280, height: 280, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.8)', opacity: 0.8 }} />
      {ARROWS.map(([x, y, deg], i) => (
        <svg key={i} className="abs" style={{ left: x - 7, top: y - 7, transform: `rotate(${deg}deg)` }} width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 1l8 6-8 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ))}
      <p className="abs" style={{ left: 181, top: 479, width: 77, fontSize: 22, lineHeight: '24px', textAlign: 'center', color: '#fff' }}>
        Repeat
      </p>
      {NODES.map((n) => (
        <div key={n.label}>
          <div
            className="abs"
            style={{ left: n.x, top: n.y, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.5)' }}
          />
          <p className="abs" style={{ left: n.x + 11, top: n.y + 13, width: 38, fontSize: 35, lineHeight: '35px', textAlign: 'center' }}>
            {n.emoji}
          </p>
          <p className="abs" style={{ left: n.lx, top: n.ly, width: 77, fontSize: 22, lineHeight: '24px', textAlign: 'center', color: '#fff' }}>
            {n.label}
          </p>
        </div>
      ))}

      <p className="abs" style={{ left: 35, top: 723, width: 370, fontSize: 22, lineHeight: '24px', textAlign: 'center', color: '#fff' }}>
        That pattern you encountered many times? A lot of those weren&apos;t decisions. They were defaults, <b>an autopilot.</b>
      </p>

      <button className="pill" style={{ left: 129, top: 839, width: 182 }} onClick={next}>
        Next
      </button>
    </div>
  )
}
