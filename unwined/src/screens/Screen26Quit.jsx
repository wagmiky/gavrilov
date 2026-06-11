import { StatusBar, Logo, Pill } from '../components/Shell.jsx'
import star from '../assets/star-gold.svg'

// Figma 139:1338 "26-1" — Welcome to UnWined (quit path).
export default function Screen26Quit({ next }) {
  return (
    <div className="fig side">
      <StatusBar />
      <Logo />
      <p className="abs serif" style={{ left: 30, top: 336, fontSize: 52, color: '#fff', whiteSpace: 'nowrap' }}>
        Welcome to UnWined!
      </p>
      <p className="abs" style={{ left: 30, top: 411, width: 368, fontSize: 32, lineHeight: 'normal', color: '#fff' }}>
        Industry-leading app that helps you find your way to clarity.
      </p>
      {[0, 1, 2, 3, 4].map((i) => (
        <img key={i} src={star} alt="" className="abs" style={{ left: 30 + i * 31, top: 547, width: 31, height: 28 }} />
      ))}
      <Pill x={129} y={839} label="Next" onClick={next} />
    </div>
  )
}
