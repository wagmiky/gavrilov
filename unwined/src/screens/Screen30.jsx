import { StatusBar, Logo, Pill } from '../components/Shell.jsx'
import circleBlue from '../assets/s30-circle-blue.svg'
import circleRed from '../assets/s30-circle-red.svg'
import circleGreen from '../assets/s30-circle-green.svg'
import circleYellow from '../assets/s30-circle-yellow.svg'
import circleGray from '../assets/s30-circle-gray.svg'
import star from '../assets/s30-star.svg'

// Figma 217:873 "30" — journaling + emotion wheel (mood-meter quadrants).
export default function Screen30({ next }) {
  return (
    <div className="fig side">
      <StatusBar />
      <Logo />
      <p className="abs" style={{ left: 30, top: 168, width: 337, fontSize: 32, lineHeight: 'normal', color: '#fff' }}>
        Complete journaling and log your emotions.
      </p>

      {/* journal input */}
      <div
        className="abs"
        style={{ left: 30, top: 278, width: 380, height: 58, borderRadius: 50, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.25)' }}
      />
      <p className="abs" style={{ left: 55, top: 296, fontSize: 22, fontStyle: 'italic', color: 'rgba(255,255,255,0.5)' }}>
        Share top-3 things about today
      </p>
      <div
        className="abs"
        style={{ left: 360, top: 289, width: 36, height: 36, borderRadius: 100, background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.25)' }}
      />
      <svg className="abs" style={{ left: 367, top: 300 }} width="22" height="15" viewBox="0 0 22 15" fill="none">
        <path d="M1 7.5h19m0 0-6-6m6 6-6 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* emotion wheel */}
      <img src={circleGray} alt="" className="abs" style={{ left: 79, top: 418, width: 100, height: 100 }} />
      <img src={circleGray} alt="" className="abs" style={{ left: 257, top: 418, width: 100, height: 100 }} />
      <img src={circleGray} alt="" className="abs" style={{ left: 79, top: 593, width: 100, height: 100 }} />
      <img src={circleGray} alt="" className="abs" style={{ left: 257, top: 593, width: 100, height: 100 }} />
      <img src={circleBlue} alt="" className="abs" style={{ left: 30, top: 487, width: 150, height: 150 }} />
      <img src={circleRed} alt="" className="abs" style={{ left: 145, top: 602, width: 150, height: 150 }} />
      <img src={circleGreen} alt="" className="abs" style={{ left: 260, top: 487, width: 150, height: 150 }} />
      <img src={circleYellow} alt="" className="abs" style={{ left: 145, top: 371, width: 150, height: 150 }} />
      <p className="abs" style={{ left: 162, top: 420, width: 115, fontSize: 20, lineHeight: "22px", textAlign: "center", color: "#000" }}>
        High energy pleasant
      </p>
      <p className="abs" style={{ left: 51, top: 536, width: 107, fontSize: 20, lineHeight: "22px", textAlign: "center", color: "#000" }}>
        Low energy unpleasant
      </p>
      <p className="abs" style={{ left: 276, top: 536, width: 118, fontSize: 20, lineHeight: "22px", textAlign: "center", color: "#000" }}>
        Low energy pleasant
      </p>
      <p className="abs" style={{ left: 148, top: 651, width: 144, fontSize: 20, lineHeight: "22px", textAlign: "center", color: "#000" }}>
        High energy unpleasant
      </p>
      <img src={star} alt="" className="abs" style={{ left: 179, top: 521, width: 81, height: 81 }} />

      <p className="abs" style={{ left: 73, top: 806, width: 293, fontSize: 18, lineHeight: '24px', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
        Choose from 50+ emotions.
      </p>

      <Pill x={129} y={839} label="Next" onClick={next} />
    </div>
  )
}
