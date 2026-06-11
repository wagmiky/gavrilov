import { useState } from 'react'
import { StatusBar, QuizChrome } from '../components/Shell.jsx'

// Figma 112:514 "15" — the goal/path question. Sets answers.path, which
// screens 19/26/27/28 branch on. (Frame title reads "Question X".)
const OPTIONS = [
  ['quit', 'I’m trying to quit drinking completely.', 317],
  ['mindful', 'I’d love to be more mindful about drinking.', 425],
]

export default function Screen15({ next, back, answers, setAnswer }) {
  const [sel, setSel] = useState(null)
  const choose = (value) => {
    if (sel) return
    setSel(value)
    setAnswer('q15', value)
    setAnswer('path', value)
    setTimeout(next, 500)
  }
  return (
    <div className="fig quiz">
      <StatusBar />
      <QuizChrome back={back} progress={0.55} />
      <p className="abs serif" style={{ left: 0, right: 0, top: 121, textAlign: 'center', fontSize: 46, color: '#fff' }}>
        Question 11
      </p>
      <p className="abs" style={{ left: 31, top: 195, fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>
        So tell us, {(answers.name || 'Name').trim()}
      </p>
      <p className="abs" style={{ left: 31, top: 216, width: 325, fontSize: 28, lineHeight: '35px', color: '#fff' }}>
        What’s your goal with drinking?
      </p>
      {OPTIONS.map(([value, label, y]) => {
        const on = sel === value
        return (
          <button
            key={value}
            className="abs"
            onClick={() => choose(value)}
            style={{
              left: 30,
              top: y,
              width: 379,
              height: 88,
              borderRadius: 30,
              background: on ? '#fff' : 'rgba(255,255,255,0.08)',
              border: on ? '1px solid #fff' : '1px solid rgba(255,255,255,0.25)',
              textAlign: 'left',
              transition: 'background 240ms cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <span style={{ position: 'absolute', left: 16, top: 34, width: 20, height: 20 }}>
              {on ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3.5 10.5 8 15 16.5 5.5" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9.5" stroke="#fff" />
                </svg>
              )}
            </span>
            <span
              style={{
                position: 'absolute',
                left: 50,
                top: 0,
                width: 299,
                height: 88,
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: 24,
                lineHeight: 1.1,
                color: on ? '#000' : '#fff',
                fontWeight: on ? 500 : 400,
              }}
            >
              {label}
            </span>
          </button>
        )
      })}
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
