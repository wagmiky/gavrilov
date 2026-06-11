import { StatusBar, QuizChrome, Pill } from '../components/Shell.jsx'

// Figma 115:1568 "36" — "Your life, but better." 90-day benefits projection.
// The frame carries the three stat labels; values are computed from the
// quiz answers (drinks per week × calories, weekly spend × 13 weeks),
// numbers formatted per the approved copy flow.
const DRINKS_MID = { '0-4': 2, '5-9': 7, '10-14': 12, '15-19': 17, '20+': 22 }

export default function Screen36({ next, back, answers }) {
  const drinks = DRINKS_MID[answers.q06] || 7
  const calories = Math.round(drinks * 150 * 13)
  const money = Math.round((answers.q17 || 30) * 13)
  return (
    <div className="fig quiz">
      <StatusBar />
      <QuizChrome back={back} progress={1} />
      <p className="abs serif" style={{ left: 0, right: 0, top: 121, textAlign: 'center', fontSize: 46, color: '#fff', whiteSpace: 'nowrap' }}>
        Your life, but better.
      </p>

      <p className="abs" style={{ left: 31, top: 298, width: 325, fontSize: 28, lineHeight: '35px', color: '#fff' }}>
        Empty calories avoided
      </p>
      <p className="abs serif" style={{ left: 31, top: 340, fontSize: 52, color: '#fff' }}>
        {calories.toLocaleString('en-US')}
      </p>

      <p className="abs" style={{ left: 31, top: 450, width: 325, fontSize: 28, lineHeight: '35px', color: '#fff' }}>
        Money saved
      </p>
      <p className="abs serif" style={{ left: 31, top: 492, fontSize: 52, color: '#fff' }}>
        {money.toLocaleString('en-US')}$
      </p>

      <p className="abs" style={{ left: 32, top: 601, width: 325, fontSize: 28, lineHeight: '35px', color: '#fff' }}>
        Aura farmed
      </p>
      <p className="abs serif" style={{ left: 32, top: 643, fontSize: 52, color: '#FFDD19' }}>
        +999
      </p>

      <Pill x={129} y={839} label="Next" onClick={next} />
    </div>
  )
}
