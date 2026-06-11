import { useState } from 'react'
import { StatusBar, QuizChrome, Pill } from '../components/Shell.jsx'
import { CheckOption } from '../components/Question.jsx'

// Figma 153:789 "11" — Question 8: how do you feel the day after (multi).
// (Frame title reads "Question F" — designer placeholder; numbered per flow.)
const OPTIONS = [
  ['anxious', 'Anxious or on the edge', 334],
  ['guilty', 'Guilty or embarrassed', 412],
  ['rough', 'Physically rough', 490],
  ['foggy', 'Mentally foggy', 568],
  ['fine', 'Fine, honestly', 646],
  ['depends', 'Depends on how much I drank', 724],
]

export default function Screen11({ next, back, answers, setAnswer }) {
  const [sel, setSel] = useState([])
  const toggle = (v) => {
    const out = sel.includes(v) ? sel.filter((s) => s !== v) : [...sel, v]
    setSel(out)
    setAnswer('q11', out)
  }
  return (
    <div className="fig quiz">
      <StatusBar />
      <QuizChrome back={back} progress={0.37} />
      <p className="abs serif" style={{ left: 0, right: 0, top: 121, textAlign: 'center', fontSize: 46, color: '#fff' }}>
        Question 8
      </p>
      <p className="abs" style={{ left: 31, top: 195, fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>
        {(answers.name || 'Name').trim()}, be honest.
      </p>
      <p className="abs" style={{ left: 31, top: 216, width: 362, fontSize: 28, lineHeight: '31px', color: '#fff' }}>
        How do you usually feel the day after drinking?
      </p>
      <p className="abs" style={{ left: 31, top: 286, fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>
        Select all that sound true.
      </p>
      {OPTIONS.map(([value, label, y]) => (
        <CheckOption key={value} y={y} label={label} selected={sel.includes(value)} onClick={() => toggle(value)} />
      ))}
      <Pill x={129} y={839} label="Next" glass onClick={next} disabled={sel.length === 0} style={{ fontWeight: 400 }} />
    </div>
  )
}
