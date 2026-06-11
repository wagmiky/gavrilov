import { StatusBar, Logo } from '../components/Shell.jsx'
import ringOuter from '../assets/s27q-ring-outer.svg'
import speckles from '../assets/s27q-speckles.svg'
import dayOrange from '../assets/s27q-day-orange.svg'
import dayBlue from '../assets/s27q-day-blue.svg'
import drip1 from '../assets/s27q-drip1.svg'
import drip2 from '../assets/s27q-drip2.svg'
import drip3 from '../assets/s27q-drip3.svg'

// Figma 153:964 "27-1" — "Your streak, tracked." (quit path): speckled
// streak ring + week card with drink-day markers.
const DAYS = [
  ['Mon', 47, 'check'],
  ['Tue', 99, 'check'],
  ['Wed', 151, 'check'],
  ['Thu', 203, 'drink'],
  ['Fri', 255, 'drink'],
  ['Sat', 307, 'check'],
  ['San', 359, 'check'],
]

function DayMark({ x, kind }) {
  if (kind === 'check') {
    return (
      <span className="abs" style={{ left: x, top: 752, width: 35, height: 35 }}>
        <img src={dayOrange} alt="" style={{ width: 35, height: 35 }} />
        <svg width="17" height="14" viewBox="0 0 17 14" fill="none" style={{ position: 'absolute', left: 9, top: 11 }}>
          <path d="M1.5 7.5 6 12 15.5 1.5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    )
  }
  return (
    <span className="abs" style={{ left: x, top: 752, width: 35, height: 35 }}>
      <img src={dayBlue} alt="" style={{ width: 35, height: 35 }} />
      <img src={drip1} alt="" style={{ position: 'absolute', left: 1, top: 19, width: 12, height: 24, transform: 'scaleY(-1)' }} />
      <img src={drip2} alt="" style={{ position: 'absolute', left: 13, top: 11, width: 12, height: 45, transform: 'scaleY(-1)' }} />
      <img src={drip3} alt="" style={{ position: 'absolute', left: 23, top: 15, width: 12, height: 22, transform: 'scaleY(-1)' }} />
    </span>
  )
}

export default function Screen27Quit({ next }) {
  return (
    <div className="fig side">
      <StatusBar />
      <Logo />
      {/* streak ring */}
      <img src={ringOuter} alt="" className="abs" style={{ left: 75, top: 178, width: 290, height: 291 }} />
      <img src={speckles} alt="" className="abs" style={{ left: 84.3, top: 186.5, width: 271.8, height: 272.4 }} />
      <p className="abs serif" style={{ left: 0, right: 0, top: 269, fontSize: 52, textAlign: 'center', color: '#fff', whiteSpace: 'nowrap' }}>
        0 days
      </p>
      <p className="abs" style={{ left: 129, top: 348, width: 190, fontSize: 26, textAlign: 'center', color: '#fff' }}>
        Alcohol-free.
      </p>
      <p className="abs" style={{ left: 115, top: 475, width: 205, fontSize: 26, textAlign: 'center', color: '#fff' }}>
        Free since
      </p>
      <p className="abs serif" style={{ left: 115, top: 506, width: 205, fontSize: 26, textAlign: 'center', color: '#fff' }}>
        01/22/26
      </p>

      <p className="abs" style={{ left: 33, top: 609, width: 337, fontSize: 32, color: '#fff' }}>
        Your streak, tracked.
      </p>

      {/* week card ("San" kept as in the frame) */}
      <div
        className="abs"
        style={{ left: 30, top: 711, width: 380, height: 87, borderRadius: 20, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.25)' }}
      />
      {DAYS.map(([d, x, kind]) => (
        <span key={d}>
          <p className="abs" style={{ left: x - 10, top: 722, width: 55, fontSize: 22, textAlign: 'center', color: '#fff' }}>
            {d}
          </p>
          <DayMark x={x} kind={kind} />
        </span>
      ))}

      <button className="pill" style={{ left: 129, top: 839, width: 182 }} onClick={next}>
        Next
      </button>
    </div>
  )
}
