import { StatusBar, Logo, Pill, SkipLink } from '../components/Shell.jsx'
import star from '../assets/star-gold.svg'

// Figma 112:1574 "2" — welcome.
export default function Screen02({ next }) {
  return (
    <div className="fig">
      <StatusBar />
      <Logo />
      <p className="abs serif" style={{ left: 30, top: 336, fontSize: 52, color: '#fff' }}>
        Welcome!
      </p>
      <p className="abs" style={{ left: 30, top: 411, width: 368, fontSize: 32, lineHeight: 'normal', color: '#fff' }}>
        Let’s start by finding out about your relationship with alcohol.
      </p>
      {[0, 1, 2, 3, 4].map((i) => (
        <img key={i} src={star} alt="" className="abs" style={{ left: 30 + i * 31, top: 547, width: 31, height: 28 }} />
      ))}
      <Pill x={129} y={776} label="Start quiz" onClick={next} />
      <SkipLink onClick={next} />
    </div>
  )
}
