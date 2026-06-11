import { StatusBar, QuizChrome } from '../components/Shell.jsx'
import ring from '../assets/s19m-ring.svg'
import arrow from '../assets/s19m-arrow.svg'

// Figma 268:1788 "19-2" — "Hard truth." (mindful path): a tilted wall of
// faded calendar numbers with "18" highlighted, and "next month" called out.
// Number centers are taken verbatim from the frame.
const NUMBERS = [
  [1, -152.5, 352.8], [2, -57.1, 334.7], [3, 56.2, 313.2], [4, 175.8, 290.5], [5, 295.4, 267.8], [6, 421.3, 243.9], [7, 546.0, 220.3],
  [8, -132.0, 439.1], [9, -36.5, 421.0], [10, 75.4, 399.7], [11, 196.3, 376.8], [12, 315.9, 354.1], [13, 440.6, 330.5], [14, 566.6, 306.6],
  [15, -111.4, 525.4], [16, -16.0, 507.3], [17, 96.0, 486.0], [18, 215.6, 463.3], [19, 335.2, 440.6], [20, 461.2, 416.7], [21, 588.4, 392.6],
  [22, -92.1, 611.9], [23, 5.8, 593.3], [24, 117.8, 572.1], [25, 237.4, 549.4], [26, 355.8, 526.9], [27, 480.5, 503.3], [28, 609.0, 478.9],
  [29, -74.1, 703.4], [30, 27.9, 684.1], [31, 137.6, 663.2],
]

export default function Screen19Mindful({ next, back, answers }) {
  return (
    <div className="fig quiz" style={{ overflow: 'hidden' }}>
      <StatusBar />
      <QuizChrome back={back} progress={0.7} />
      <p className="abs serif" style={{ left: 0, right: 0, top: 121, textAlign: 'center', fontSize: 46, color: '#fff' }}>
        Hard truth.
      </p>
      <p className="abs" style={{ left: 31, top: 195, fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>
        {(answers.name || 'Name').trim()},
      </p>

      {/* faded calendar wall */}
      {NUMBERS.map(([n, cx, cy]) => (
        <p
          key={n}
          className="abs"
          style={{
            left: cx - 55,
            top: cy - 35,
            width: 110,
            textAlign: 'center',
            fontSize: 71,
            lineHeight: '70px',
            transform: 'rotate(-10.74deg) skewX(2.66deg)',
            background: 'linear-gradient(89deg, rgba(0,0,0,0) 7.4%, rgba(255,255,255,0.2) 53%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: n === 18 ? '#fff' : 'transparent',
          }}
        >
          {n}
        </p>
      ))}
      <img src={ring} alt="" className="abs" style={{ left: 163, top: 408, width: 114.3, height: 105.1 }} />
      <img
        src={arrow}
        alt=""
        className="abs"
        style={{ left: 233, top: 588, width: 179, transform: 'rotate(-11.27deg)' }}
      />
      <p
        className="abs"
        style={{
          left: 192,
          top: 621,
          width: 123,
          fontSize: 28,
          lineHeight: '30px',
          transform: 'rotate(-13.1deg)',
          background: 'linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.45))',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        next month
      </p>

      <p className="abs" style={{ left: 78, top: 742, width: 283, fontSize: 28, lineHeight: '30px', textAlign: 'center', color: '#fff' }}>
        It was supposed to be an exception.
      </p>

      <button className="pill" style={{ left: 129, top: 839, width: 182 }} onClick={next}>
        Next
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
          <path d="M1 8h17m0 0-6-6m6 6-6 6" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}
