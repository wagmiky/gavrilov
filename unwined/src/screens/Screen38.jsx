import { StatusBar, QuizChrome } from '../components/Shell.jsx'
import grid from '../assets/s38-grid.svg'
import glow from '../assets/s38-glow.svg'

// Figma 125:565 "38" — "No more excuses." The days of 2026 as a dot grid.
export default function Screen38({ next, back, answers }) {
  return (
    <div className="fig quiz">
      <StatusBar />
      <QuizChrome back={back} progress={1} />
      <p className="abs" style={{ left: 71, top: 135, width: 298, fontSize: 28, lineHeight: '31px', textAlign: 'center', color: '#fff' }}>
        {(answers.name || 'Name').trim()}, this is how many days has already passed in 2026.
      </p>
      <img src={glow} alt="" className="abs" style={{ left: 209, top: 265, width: 50, height: 50 }} />
      <img src={grid} alt="" className="abs" style={{ left: 90, top: 271, width: 260, height: 293 }} />
      <p className="abs serif" style={{ left: 54, top: 632, width: 331, fontSize: 46, textAlign: 'center', color: '#fff' }}>
        No more excuses.
      </p>
      <p className="abs" style={{ left: 57, top: 709, width: 325, fontSize: 28, lineHeight: '31px', textAlign: 'center', color: '#fff' }}>
        Lock in and make your next day count.
      </p>
      <button className="pill" style={{ left: 129, top: 839, width: 182 }} onClick={next}>
        I’m ready
      </button>
    </div>
  )
}
