import { useState } from 'react'
import { StatusBar, QuizChrome, Pill } from '../components/Shell.jsx'
import icAppStore from '../assets/s05-appstore.png'
import icInstagram from '../assets/s05-instagram.png'
import icTiktok from '../assets/s05-tiktok.png'
import icFacebook from '../assets/s05-facebook.png'
import icX from '../assets/s05-x.png'

// Figma 112:732 "5" — Question 2: where did you hear about us (multi-select).
const OPTIONS = [
  ['app-store', 'App Store', 345, icAppStore],
  ['instagram', 'Instagram', 423, icInstagram],
  ['tiktok', 'TikTok', 501, icTiktok],
  ['facebook', 'Facebook', 579, icFacebook],
  ['x', 'X', 657, icX],
  ['word-of-mouth', 'Word of mouth', 735, null],
]

export default function Screen05({ next, back, setAnswer }) {
  const [sel, setSel] = useState([])
  const toggle = (v) => {
    const out = sel.includes(v) ? sel.filter((s) => s !== v) : [...sel, v]
    setSel(out)
    setAnswer('q05', out)
  }
  return (
    <div className="fig quiz">
      <StatusBar />
      <QuizChrome back={back} progress={0.07} />
      <p className="abs serif" style={{ left: 0, right: 0, top: 121, textAlign: 'center', fontSize: 46, color: '#fff' }}>
        Question 2
      </p>
      <p className="abs" style={{ left: 31, top: 216, width: 325, fontSize: 32, lineHeight: '35px', color: '#fff' }}>
        Where did you hear about us?
      </p>
      <p className="abs" style={{ left: 31, top: 285, width: 325, fontSize: 18, lineHeight: '35px', color: 'rgba(255,255,255,0.5)' }}>
        Select all that apply.
      </p>
      {OPTIONS.map(([value, label, y, icon]) => {
        const on = sel.includes(value)
        return (
          <button
            key={value}
            className="abs"
            onClick={() => toggle(value)}
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
                background: on ? '#fff' : 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.25)',
                display: 'grid',
                placeItems: 'center',
                transition: 'background 240ms cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              {on && (
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path d="M1 5.2 4.4 8.5 11 1.5" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            {icon ? (
              <img src={icon} alt="" style={{ position: 'absolute', left: 50, top: 19, width: 20, height: 20, borderRadius: 20, objectFit: 'cover' }} />
            ) : (
              <span style={{ position: 'absolute', left: 53, top: 21, fontSize: 16 }}>🗣️</span>
            )}
            <span style={{ position: 'absolute', left: 78, top: 17, fontSize: 22, color: '#fff' }}>{label}</span>
          </button>
        )
      })}
      <Pill x={129} y={839} label="Next" glass onClick={next} disabled={sel.length === 0} style={{ fontWeight: 400 }} />
    </div>
  )
}
