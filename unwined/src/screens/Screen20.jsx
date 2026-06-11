import { StatusBar, QuizChrome } from '../components/Shell.jsx'

// Figma 318:1278 "20" — "Alcohol doesn't just affect you." Orange-gradient
// mind-map: a central 🥂 with consequence bubbles connected by lines.
const ORANGE =
  'radial-gradient(956px at 220px 0px, rgb(229,97,60) 0%, rgb(226,126,54) 35.8%, rgb(226,106,36) 63.84%, rgb(225,87,18) 91.88%)'

const BUBBLES = [
  { x: 9, y: 274, w: 250, h: 70, emoji: '😪', ex: 24, ey: 292, text: 'The conversations you half-remember', tx: 59, ty: 285, tw: 212 },
  { x: 201, y: 350, w: 228, h: 64, emoji: '😡', ex: 220, ey: 366, text: 'Mood swings you can’t control', tx: 256, ty: 357, tw: 182 },
  { x: 214, y: 565, w: 219, h: 70, emoji: '🥱', ex: 228, ey: 583, text: 'Waking up in an unfamiliar place', tx: 262, ty: 576, tw: 185 },
  { x: 5, y: 644, w: 331, h: 70, emoji: '🚷', ex: 20, ey: 662, text: 'The plans you cancelled because you were hungover', tx: 55, ty: 655, tw: 300 },
]

const DOTS = [
  [124, 339],
  [182, 435],
  [267, 457],
  [325, 560],
  [324, 409],
  [267, 512],
  [191, 539],
  [157, 641],
]

export default function Screen20({ next, back }) {
  return (
    <div className="fig" style={{ background: ORANGE }}>
      <StatusBar />
      <QuizChrome back={back} progress={0.75} />
      <p className="abs serif" style={{ left: 60, top: 126, width: 320, fontSize: 46, lineHeight: '51px', textAlign: 'center', color: '#fff' }}>
        Alcohol doesn’t just affect you.
      </p>
      <p className="abs" style={{ left: 94, top: 233, width: 251, fontSize: 22, lineHeight: '24px', textAlign: 'center', color: '#fff' }}>
        It leaks into everything.
      </p>

      {/* connector lines */}
      <svg className="abs" style={{ left: 0, top: 0 }} width="440" height="956" fill="none">
        <line x1="129" y1="346" x2="186" y2="440" stroke="#fff" strokeWidth="2" strokeOpacity="0.9" />
        <line x1="195" y1="543" x2="161" y2="645" stroke="#fff" strokeWidth="2" strokeOpacity="0.9" />
        <line x1="329" y1="413" x2="272" y2="461" stroke="#fff" strokeWidth="2" strokeOpacity="0.9" />
        <line x1="272" y1="518" x2="330" y2="567" stroke="#fff" strokeWidth="2" strokeOpacity="0.9" />
      </svg>
      {DOTS.map(([x, y], i) => (
        <span key={i} className="abs" style={{ left: x, top: y, width: 10, height: 10, borderRadius: '50%', background: '#fff' }} />
      ))}

      {/* central glass */}
      <div
        className="abs"
        style={{ left: 160, top: 429, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.5)' }}
      />
      <p className="abs" style={{ left: 180, top: 452, width: 80, fontSize: 75, lineHeight: '75px', textAlign: 'center' }}>
        🥂
      </p>

      {BUBBLES.map((b) => (
        <div key={b.text}>
          <div
            className="abs"
            style={{
              left: b.x,
              top: b.y,
              width: b.w,
              height: b.h,
              borderRadius: 30,
              background: 'rgba(217,217,217,0.2)',
              border: '1px solid rgba(255,255,255,0.5)',
            }}
          />
          <p className="abs" style={{ left: b.ex, top: b.ey - 18, fontSize: 28, lineHeight: '35px' }}>
            {b.emoji}
          </p>
          <p className="abs" style={{ left: b.tx, top: b.ty, width: b.tw, fontSize: 20, lineHeight: '22px', color: '#fff' }}>
            {b.text}
          </p>
        </div>
      ))}

      <p className="abs" style={{ left: 35, top: 741, width: 370, fontSize: 22, lineHeight: '24px', textAlign: 'center', color: '#fff' }}>
        Alcohol has adverse effects on many levels. <b>You are not alone</b> – many people face the exact same situation as you do.
      </p>

      <button className="pill" style={{ left: 129, top: 839, width: 182 }} onClick={next}>
        Next
      </button>
    </div>
  )
}
