import { StatusBar, Pill } from '../components/Shell.jsx'
import grid from '../assets/s37-grid.svg'

// Figma 125:979 "37" — "Name, this is how many days has already passed in 2026."
// Dot grid of 365 days (29 filled), caption "29 out of 365.", Next CTA.
export default function Screen37({ next, back }) {
  return (
    <div className="fig">
      <StatusBar />

      {/* language pill */}
      <div
        className="abs"
        style={{
          left: 355,
          top: 75,
          width: 55,
          height: 22,
          borderRadius: 20,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.25)',
        }}
      />
      <p className="abs" style={{ left: 392, top: 78, width: 36, fontSize: 14, textAlign: 'center', color: '#fff', transform: 'translateX(-50%)' }}>
        EN
      </p>
      <p className="abs" style={{ left: 370.5, top: 77, width: 17, fontSize: 18, textAlign: 'center', color: '#fff', transform: 'translateX(-50%)' }}>
        🇺🇸
      </p>

      {/* back arrow */}
      <button className="abs" style={{ left: 31, top: 77.5, width: 20, height: 15 }} onClick={back} aria-label="back">
        <svg width="20" height="15" viewBox="0 0 21 15" fill="none" style={{ display: 'block' }}>
          <path d="M20 7.36H2m0 0 6.07-6.07M2 7.36l6.07 6.07" stroke="#fff" strokeWidth="2" />
        </svg>
      </button>

      {/* progress bar (0%) */}
      <div className="abs" style={{ left: 67, top: 83, width: 272, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.2)' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: 6, height: 6, borderRadius: 3, background: '#fff' }} />
      </div>

      <p
        className="abs"
        style={{ left: 220, top: 135, width: 298, fontSize: 28, lineHeight: '31px', textAlign: 'center', color: '#fff', transform: 'translateX(-50%)' }}
      >
        Name, this is how many days has already passed in 2026.
      </p>

      <img src={grid} alt="" className="abs" style={{ left: 90, top: 271, width: 260, height: 293 }} />

      <p className="abs" style={{ left: 90, top: 572, width: 257, fontSize: 18, lineHeight: '19px', color: 'rgba(255,255,255,0.5)' }}>
        29 out of 365.
      </p>

      <Pill x={129} y={839} label="Next" onClick={next} />
    </div>
  )
}
