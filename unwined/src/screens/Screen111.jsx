import { StatusBar, QuizChrome, Pill } from '../components/Shell.jsx'

// Figma 277:1629 "111" — first screen after onboarding.
export default function Screen111({ next, back }) {
  return (
    <div className="fig quiz">
      <StatusBar />
      <QuizChrome back={back} progress={1} />
      <p className="abs" style={{ left: 57, top: 416, width: 325, fontSize: 28, lineHeight: '31px', color: '#fff' }}>
        How are you feeling about it now?
      </p>
      <Pill x={129} y={839} label="I’m ready" onClick={next} />
    </div>
  )
}
