import { StatusBar, QuizChrome } from '../components/Shell.jsx'
import uniMask from '../assets/s34-unimask.svg'
import harvard from '../assets/s34-harvard.png'
import stanford from '../assets/s34-stanford.png'

// Figma 114:974 "34" — "Name, we've got you": research credibility with
// tilted proof chips and monochrome university marks.
function Chip({ rotate = 0, x, y, w, emoji, label, labelW }) {
  return (
    <div
      className="abs"
      style={{
        left: x,
        top: y,
        width: w,
        height: 48,
        borderRadius: 30,
        background: 'rgba(217,217,217,0.2)',
        border: '1px solid rgba(255,255,255,0.5)',
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <span style={{ position: 'absolute', left: 13, top: 6, fontSize: 22, lineHeight: '35px' }}>{emoji}</span>
      <span style={{ position: 'absolute', left: 42, top: 7, fontSize: 21, lineHeight: '33px', color: '#fff', whiteSpace: 'nowrap' }}>{label}</span>
    </div>
  )
}

export default function Screen34({ next, back, answers }) {
  return (
    <div className="fig quiz">
      <StatusBar />
      <QuizChrome back={back} progress={0.93} />
      <p className="abs serif" style={{ left: 0, right: 0, top: 121, textAlign: 'center', fontSize: 46, color: '#fff', whiteSpace: 'nowrap' }}>
        {(answers.name || 'Name').trim()}, we’ve got you
      </p>
      <p className="abs" style={{ left: 30, top: 216, width: 325, fontSize: 28, lineHeight: '35px', color: '#fff' }}>
        Our program is based on years of foundational research in the field.
      </p>

      <Chip rotate={-10} x={28} y={361} w={296} emoji="🔎" label="5000+ research citations" labelW={242} />
      <Chip rotate={10} x={137} y={422} w={275} emoji="🤘" label="Real life improvements" labelW={224} />
      <Chip x={86} y={469} w={267} emoji="🧠" label="Supported by experts" labelW={211} />

      <p className="abs" style={{ left: 30, top: 545, width: 347, fontSize: 18, lineHeight: '35px', color: 'rgba(255,255,255,0.5)' }}>
        Research institutions include
      </p>
      {/* monochrome university wordmarks (white via mask) */}
      <div
        className="abs"
        style={{
          left: 49,
          top: 580,
          width: 342.4,
          height: 112,
          background: '#fff',
          WebkitMaskImage: `url(${uniMask})`,
          maskImage: `url(${uniMask})`,
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
        }}
      />
      <div className="abs" style={{ left: 49, top: 580, width: 45, height: 48, overflow: 'hidden' }}>
        <img src={harvard} alt="Harvard" style={{ height: '100%', width: 'auto', maxWidth: 'none' }} />
      </div>
      <div className="abs" style={{ left: 244, top: 580, width: 38, height: 48, overflow: 'hidden' }}>
        <img src={stanford} alt="Stanford" style={{ height: '100%', width: 'auto', maxWidth: 'none' }} />
      </div>

      {/* 20+ techniques badge */}
      <div
        className="abs"
        style={{ left: 51, top: 743, width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.5)' }}
      />
      <p className="abs serif" style={{ left: 51, top: 757, width: 52, fontSize: 26, lineHeight: '26px', textAlign: 'center', color: '#fff', transform: 'rotate(-6deg)' }}>
        20+
      </p>
      <p className="abs" style={{ left: 116, top: 758, width: 270, fontSize: 22, lineHeight: '24px', color: '#fff' }}>
        Proven cognitive techniques for lasting change
      </p>

      <button className="pill" style={{ left: 124, top: 839, width: 187 }} onClick={next}>
        Looks solid
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
          <path d="M1 8h17m0 0-6-6m6 6-6 6" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}
