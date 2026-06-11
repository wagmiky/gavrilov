import { StatusBar, Logo, Pill } from '../components/Shell.jsx'

// Figma 212:1052 "28-2" — cravings tools teaser (mindful path).
export default function Screen28Mindful({ next }) {
  return (
    <div className="fig side">
      <StatusBar />
      <Logo />
      <p className="abs" style={{ left: 30, top: 411, width: 368, fontSize: 32, lineHeight: 'normal', color: '#fff' }}>
        When you feel like cravings hit, we’ve got tools that work.
      </p>
      <Pill x={129} y={839} label="Next" onClick={next} />
    </div>
  )
}
