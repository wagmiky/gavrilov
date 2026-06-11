import { useEffect, useRef, useState } from 'react'
import { StatusBar, QuizChrome } from '../components/Shell.jsx'
import { CheckOption } from '../components/Question.jsx'

// Figma 112:1663 "16" — motivations (multi-select). Question copy kept
// exactly as in the frame. No CTA in the design — advances shortly after
// the user stops selecting.
const OPTIONS = [
  ['health', 'Improve my health and wellness', 337],
  ['relationships', 'Improve relationships', 415],
  ['self', 'Feel better about myself', 493],
  ['money', 'Save money', 571],
  ['aging', 'Slow down aging process', 649],
  ['coping', 'Find healthier coping methods', 727],
]

export default function Screen16({ next, back, answers, setAnswer }) {
  const [sel, setSel] = useState([])
  const timer = useRef(null)
  const toggle = (v) => {
    const out = sel.includes(v) ? sel.filter((s) => s !== v) : [...sel, v]
    setSel(out)
    setAnswer('q16', out)
    clearTimeout(timer.current)
    if (out.length) timer.current = setTimeout(next, 1200)
  }
  useEffect(() => () => clearTimeout(timer.current), [])
  return (
    <div className="fig quiz">
      <StatusBar />
      <QuizChrome back={back} progress={0.6} />
      <p className="abs serif" style={{ left: 0, right: 0, top: 121, textAlign: 'center', fontSize: 46, color: '#fff' }}>
        Question 12
      </p>
      <p className="abs" style={{ left: 31, top: 195, fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>
        {(answers.name || 'Name').trim()},
      </p>
      <p className="abs" style={{ left: 31, top: 216, width: 389, fontSize: 28, lineHeight: '31px', color: '#fff' }}>
        Why do you wish to achieve by changing your drinking habits?
      </p>
      <p className="abs" style={{ left: 31, top: 286, fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>
        Select all that inspire you.
      </p>
      {OPTIONS.map(([value, label, y]) => (
        <CheckOption key={value} y={y} label={label} selected={sel.includes(value)} onClick={() => toggle(value)} />
      ))}
      <div
        className="abs"
        style={{ left: 154, top: 864, width: 132, height: 28, borderRadius: 20, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.25)' }}
      />
      <button className="abs" onClick={next} style={{ left: 154, top: 866, width: 132, textAlign: 'center', fontSize: 18, color: '#fff' }}>
        skip quiz
      </button>
    </div>
  )
}
