import { useState } from 'react'
import { StatusBar, QuizChrome, Pill } from '../components/Shell.jsx'
import { CheckOption } from '../components/Question.jsx'

// Figma 112:1170 "7" — Question 4: reasons to drink (multi-select).
// (Frame title reads "Question P" — designer placeholder; numbered per flow.)
const OPTIONS = [
  ['relax', 'To relax', 336],
  ['fun', 'To have fun', 414],
  ['stress', 'To escape or relieve stress', 492],
  ['anger', 'To get rid of anger', 570],
  ['sadness', 'To get rid of sadness', 648],
  ['other', 'Other', 726],
]

export default function Screen07({ next, back, answers, setAnswer }) {
  const [sel, setSel] = useState([])
  const toggle = (v) => {
    const out = sel.includes(v) ? sel.filter((s) => s !== v) : [...sel, v]
    setSel(out)
    setAnswer('q07', out)
  }
  return (
    <div className="fig quiz">
      <StatusBar />
      <QuizChrome back={back} progress={0.17} />
      <p className="abs serif" style={{ left: 0, right: 0, top: 121, textAlign: 'center', fontSize: 46, color: '#fff' }}>
        Question 4
      </p>
      <p className="abs" style={{ left: 31, top: 195, fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>
        {(answers.name || 'Name').trim()},
      </p>
      <p className="abs" style={{ left: 31, top: 216, width: 325, fontSize: 28, lineHeight: '31px', color: '#fff' }}>
        What are your reasons to drink?
      </p>
      <p className="abs" style={{ left: 31, top: 286, fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>
        Select all that feel true.
      </p>
      {OPTIONS.map(([value, label, y]) => (
        <CheckOption key={value} y={y} label={label} selected={sel.includes(value)} onClick={() => toggle(value)} />
      ))}
      <Pill x={129} y={839} label="Next" glass onClick={next} disabled={sel.length === 0} style={{ fontWeight: 400 }} />
    </div>
  )
}
