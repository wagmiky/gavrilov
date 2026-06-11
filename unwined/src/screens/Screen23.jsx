import { useState } from 'react'
import { StatusBar, QuizChrome, Pill } from '../components/Shell.jsx'
import { CheckOption } from '../components/Question.jsx'

// Figma 135:621 "23" — "About future." What do you plan to use UnWined for?
const OPTIONS = [
  ['streak', 'Track my sobriety streak', 337],
  ['friends', 'See my friends’ sobriety streaks', 415],
  ['urge', 'Use urge button* when needed', 493],
  ['usage', 'Keep track of my alcohol usage', 571],
  ['program', 'Make a long term goal program', 649],
]

export default function Screen23({ next, back, answers, setAnswer }) {
  const [sel, setSel] = useState([])
  const toggle = (v) => {
    const out = sel.includes(v) ? sel.filter((s) => s !== v) : [...sel, v]
    setSel(out)
    setAnswer('q23', out)
  }
  return (
    <div className="fig quiz">
      <StatusBar />
      <QuizChrome back={back} progress={0.86} />
      <p className="abs serif" style={{ left: 0, right: 0, top: 121, textAlign: 'center', fontSize: 46, color: '#fff' }}>
        About future.
      </p>
      <p className="abs" style={{ left: 31, top: 195, fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>
        {(answers.name || 'Name').trim()},
      </p>
      <p className="abs" style={{ left: 31, top: 216, width: 389, fontSize: 28, lineHeight: '31px', color: '#fff' }}>
        What do you plan to use UnWined for?
      </p>
      <p className="abs" style={{ left: 31, top: 286, fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>
        Select all that you wish to do.
      </p>
      {OPTIONS.map(([value, label, y]) => (
        <CheckOption key={value} y={y} label={label} selected={sel.includes(value)} onClick={() => toggle(value)} />
      ))}
      <p className="abs" style={{ left: 29, top: 727, width: 370, fontSize: 18, lineHeight: '20px', color: 'rgba(255,255,255,0.5)' }}>
        * <b>Urge button</b> is a panic button when alcohol cravings hit. It gives immediate support to help you get through it.
      </p>
      <Pill x={129} y={839} label="Next" glass onClick={next} disabled={sel.length === 0} style={{ fontWeight: 400 }} />
    </div>
  )
}
