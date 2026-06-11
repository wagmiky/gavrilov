import { StatusBar, Logo, Pill } from '../components/Shell.jsx'

// Figma 153:993 "28-1" — urge tools teaser (quit path).
export default function Screen28Quit({ next }) {
  return (
    <div className="fig side">
      <StatusBar />
      <Logo />
      <p className="abs" style={{ left: 30, top: 411, width: 368, fontSize: 32, lineHeight: 'normal', color: '#fff' }}>
        When urges hit, we’ve got tools that work.
      </p>
      <Pill x={129} y={839} label="Next" onClick={next} />
    </div>
  )
}
