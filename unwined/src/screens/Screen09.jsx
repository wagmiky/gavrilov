import { StatusBar, Pill } from '../components/Shell.jsx'

// TODO: implement from Figma (placeholder stub)
export default function Screen09({ next, back, answers, setAnswer }) {
  return (
    <div className="fig">
      <StatusBar />
      <p className="abs serif" style={{ left: 30, top: 336, fontSize: 52, color: '#fff' }}>Screen 09</p>
      <Pill x={129} y={776} label="Next" onClick={next} />
    </div>
  )
}
