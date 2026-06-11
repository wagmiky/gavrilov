import { StatusBar, QuizChrome } from '../components/Shell.jsx'
import curveBlue from '../assets/s19q-curve-blue.svg'
import curveRed from '../assets/s19q-curve-red.svg'
import dotGlow from '../assets/s19q-dot-glow.svg'

// Figma 186:803 "19-1" — the "2 paths" divergence chart (quit path).
export default function Screen19Quit({ next, back }) {
  return (
    <div className="fig quiz">
      <StatusBar />
      <QuizChrome back={back} progress={0.7} />
      <p className="abs serif" style={{ left: 0, right: 0, top: 121, textAlign: 'center', fontSize: 46, color: '#fff' }}>
        2 paths from here.
      </p>

      <p className="abs" style={{ left: 34, top: 215, width: 129, fontSize: 22, lineHeight: '24px', color: '#fff' }}>
        Same habits, same results.
      </p>
      <p className="abs" style={{ left: 193, top: 226, width: 42, fontSize: 30, lineHeight: '24px', textAlign: 'center', color: '#fff' }}>
        or
      </p>
      <p className="abs" style={{ left: 265, top: 215, width: 141, fontSize: 22, lineHeight: '24px', color: '#fff' }}>
        Something changes today.
      </p>

      {/* chart card */}
      <div
        className="abs"
        style={{ left: 30, top: 314, width: 380, height: 266, borderRadius: 30, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.25)' }}
      />
      <div className="abs" style={{ left: 50.5, top: 340.5, width: 318, height: 184.47 }}>
        <img src={curveBlue} alt="" style={{ position: 'absolute', inset: '-10.03% -5.82%', width: '111.64%', height: '120.06%' }} />
      </div>
      <div className="abs" style={{ left: 50, top: 441.5, width: 319, height: 83 }}>
        <img src={curveRed} alt="" style={{ position: 'absolute', inset: '-21.69% -5.64%', width: '111.28%', height: '143.38%' }} />
      </div>
      <div className="abs" style={{ left: 364, top: 333, width: 14, height: 14 }}>
        <img src={dotGlow} alt="" style={{ position: 'absolute', inset: '-107.14%', width: '314.28%', height: '314.28%' }} />
      </div>

      {/* labels */}
      <div
        className="abs"
        style={{ left: 83, top: 351, width: 134, height: 56, borderRadius: 30, background: 'rgba(0,0,0,0.25)', border: '1px solid #0088FF' }}
      />
      <span className="abs" style={{ left: 95, top: 374, width: 10, height: 10, borderRadius: '50%', background: '#0088FF', boxShadow: '0 0 8px rgba(0,136,255,0.9)' }} />
      <p className="abs" style={{ left: 92, top: 361, width: 127, fontSize: 18, lineHeight: '20px', textAlign: 'center', color: '#fff' }}>
        Clarity with UnWined
      </p>
      <div
        className="abs"
        style={{ left: 229, top: 538, width: 162, height: 28, borderRadius: 30, background: 'rgba(0,0,0,0.25)', border: '1px solid #E23250' }}
      />
      <span className="abs" style={{ left: 241, top: 547, width: 10, height: 10, borderRadius: '50%', background: '#E23250', boxShadow: '0 0 8px rgba(226,50,80,0.9)' }} />
      <p className="abs" style={{ left: 249, top: 542, width: 138, fontSize: 17, textAlign: 'center', color: '#E23250', whiteSpace: 'nowrap' }}>
        Same old habits
      </p>

      <p className="abs" style={{ left: 55, top: 591, fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>
        Start
      </p>
      <p className="abs" style={{ left: 186, top: 591, width: 67, fontSize: 18, textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
        Process
      </p>
      <p className="abs" style={{ left: 326, top: 591, width: 67, fontSize: 18, textAlign: 'right', color: 'rgba(255,255,255,0.5)' }}>
        Clarity
      </p>

      <p className="abs" style={{ left: 81, top: 658, width: 283, fontSize: 28, lineHeight: '24px', textAlign: 'center', color: '#fff' }}>
        Your answers tell a story.
      </p>
      <p className="abs" style={{ left: 67, top: 721, width: 305, fontSize: 22, lineHeight: '24px', textAlign: 'center', color: '#fff' }}>
        But that story doesn&apos;t have to continue the way it&apos;s been going.
      </p>

      <button className="pill" style={{ left: 129, top: 839, width: 182 }} onClick={next}>
        Show me
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
          <path d="M1 8h17m0 0-6-6m6 6-6 6" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}
