import { useState } from 'react'

// Shared pieces for the quiz question screens (frames 4-23): the serif
// "Question N" header, glass radio option pills with the white selected
// state (frame 111:487), and the dimmed "skip quiz" link.

export function QuestionTitle({ children, top = 151 }) {
  return (
    <p
      className="abs serif"
      style={{ left: 0, right: 0, top: top - 28, textAlign: 'center', fontSize: 46, color: '#fff', lineHeight: 'normal' }}
    >
      {children}
    </p>
  )
}

export function QuestionText({ children, top = 216, width = 325, left = 31 }) {
  return (
    <p className="abs" style={{ left, top, width, fontSize: 28, lineHeight: 'normal', color: '#fff' }}>
      {children}
    </p>
  )
}

// 380×58 glass pill option with a 20px radio at x=46 and a 22px label at
// x=80. Selected: solid white, black medium label, check instead of radio.
export function RadioOption({ y, label, selected, onClick, multi = false }) {
  return (
    <button
      className="abs"
      onClick={onClick}
      style={{
        left: 30,
        top: y,
        width: 380,
        height: 58,
        borderRadius: multi ? 12 : 50,
        background: selected ? '#fff' : 'rgba(255,255,255,0.08)',
        border: selected ? '1px solid #fff' : '1px solid rgba(255,255,255,0.25)',
        textAlign: 'left',
        transition: 'background 240ms cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <span style={{ position: 'absolute', left: 16, top: 19, width: 20, height: 20 }}>
        {selected ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3.5 10.5 8 15 16.5 5.5" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {multi ? (
              <rect x="0.5" y="0.5" width="19" height="19" rx="6.5" stroke="#fff" />
            ) : (
              <circle cx="10" cy="10" r="9.5" stroke="#fff" />
            )}
          </svg>
        )}
      </span>
      <span
        style={{
          position: 'absolute',
          left: 50,
          top: 0,
          height: 58,
          display: 'inline-flex',
          alignItems: 'center',
          fontSize: 22,
          fontWeight: selected ? 500 : 400,
          color: selected ? '#000' : '#fff',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </button>
  )
}

// Multi-select row: 20px rounded-7 checkbox at x≈51, label at labelX.
export function CheckOption({ y, label, selected, onClick, labelX = 84, children }) {
  return (
    <button
      className="abs"
      onClick={onClick}
      style={{
        left: 30,
        top: y,
        width: 380,
        height: 58,
        borderRadius: 50,
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.25)',
        textAlign: 'left',
      }}
    >
      <span
        style={{
          position: 'absolute',
          left: 21,
          top: 19,
          width: 20,
          height: 20,
          borderRadius: 7,
          background: selected ? '#fff' : 'rgba(255,255,255,0.2)',
          border: '1px solid rgba(255,255,255,0.25)',
          display: 'grid',
          placeItems: 'center',
          transition: 'background 240ms cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {selected && (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M1 5.2 4.4 8.5 11 1.5" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {children}
      <span style={{ position: 'absolute', left: labelX - 30, top: 17, fontSize: 22, color: '#fff', whiteSpace: 'nowrap' }}>{label}</span>
    </button>
  )
}

export function SkipQuiz({ onClick, label = 'skip quiz' }) {
  return (
    <button
      className="abs"
      onClick={onClick}
      style={{ left: 0, right: 0, top: 866, textAlign: 'center', fontSize: 18, color: 'rgba(255,255,255,0.5)' }}
    >
      {label}
    </button>
  )
}

// Single-choice question: tap → selected state shows → advance after 500ms.
export function useChoice(next, setAnswer, key) {
  const [sel, setSel] = useState(null)
  return [
    sel,
    (value) => {
      if (sel) return
      setSel(value)
      setAnswer(key, value)
      setTimeout(next, 500)
    },
  ]
}
