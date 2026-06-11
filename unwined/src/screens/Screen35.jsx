import { useState } from 'react'
import { StatusBar, QuizChrome, Pill } from '../components/Shell.jsx'

// Figma 114:1091 "35" — referral code (skippable).
export default function Screen35({ next, back, setAnswer }) {
  const [code, setCode] = useState('')
  return (
    <div className="fig quiz">
      <StatusBar />
      <QuizChrome back={back} progress={0.96} />
      <style>{'.s35-input::placeholder{color:rgba(255,255,255,0.25)}'}</style>
      <p className="abs" style={{ left: 31, top: 216, width: 325, fontSize: 28, lineHeight: '35px', color: '#fff' }}>
        Do you have a referral code?
      </p>
      <p className="abs" style={{ left: 31, top: 286, width: 325, fontSize: 18, lineHeight: '35px', color: 'rgba(255,255,255,0.5)' }}>
        You can skip this step.
      </p>
      <input
        className="abs s35-input"
        value={code}
        placeholder="Referral code"
        onChange={(e) => {
          setCode(e.target.value)
          setAnswer('referral', e.target.value)
        }}
        style={{
          left: 31,
          top: 346,
          width: 379,
          height: 58,
          borderRadius: 45,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.25)',
          padding: '0 26px',
          fontSize: 22,
          color: '#fff',
          outline: 'none',
        }}
      />
      <Pill x={129} y={839} label="Next" onClick={next} />
    </div>
  )
}
