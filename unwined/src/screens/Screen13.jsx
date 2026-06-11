import { StatusBar, QuizChrome } from '../components/Shell.jsx'
import { RadioOption, SkipQuiz, useChoice } from '../components/Question.jsx'

// Figma 135:689 "13" — Question 10: tried quitting in the last 12 months?
// Routes the screen-14 variant. ("Yes, unsucessfully" kept as in the frame.)
const OPTIONS = [
  ['yes-successfully', 'Yes, successfully', 309],
  ['yes-unsuccessfully', 'Yes, unsucessfully', 387],
  ['no', 'No', 465],
]

export default function Screen13({ next, back, answers, setAnswer }) {
  const [sel, choose] = useChoice(next, setAnswer, 'q13')
  return (
    <div className="fig quiz">
      <StatusBar />
      <QuizChrome back={back} progress={0.47} />
      <p className="abs serif" style={{ left: 0, right: 0, top: 121, textAlign: 'center', fontSize: 46, color: '#fff' }}>
        Question 10
      </p>
      <p className="abs" style={{ left: 31, top: 195, fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>
        So tell us, {(answers.name || 'Name').trim()}
      </p>
      <p className="abs" style={{ left: 31, top: 216, width: 360, fontSize: 28, lineHeight: '31px', color: '#fff' }}>
        Have you tried quitting drinking in the last 12 months?
      </p>
      {OPTIONS.map(([value, label, y]) => (
        <RadioOption key={value} y={y} label={label} selected={sel === value} onClick={() => choose(value)} />
      ))}
      <SkipQuiz onClick={next} />
    </div>
  )
}
