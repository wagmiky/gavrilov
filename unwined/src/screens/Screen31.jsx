import { StatusBar, Logo, Pill } from '../components/Shell.jsx'

// Figma 212:967 "31" — lessons teaser. Copy kept exactly as in the frame.
export default function Screen31({ next }) {
  return (
    <div className="fig side">
      <StatusBar />
      <Logo />
      <p className="abs" style={{ left: 30, top: 213, width: 337, fontSize: 32, lineHeight: 'normal', color: '#fff' }}>
        Pass lessons to grow your soberity resposnibility.
      </p>
      <p className="abs" style={{ left: 94, top: 803, width: 251, fontSize: 22, lineHeight: '24px', textAlign: 'center', color: '#fff' }}>
        Day 1 begins now.
      </p>
      <Pill x={129} y={839} label="Next" onClick={next} />
    </div>
  )
}
