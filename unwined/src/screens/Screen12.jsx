import { StatusBar, QuizChrome } from '../components/Shell.jsx'
import { RadioOption, SkipQuiz, useChoice } from '../components/Question.jsx'

// Figma 153:868 "12" — Question 9: how long has change felt needed.
// (Frame title reads "Question D" — designer placeholder; numbered per flow.)
const OPTIONS = [
  ['just-recently', 'Just recently', 340],
  ['few-weeks', 'A few weeks', 418],
  ['few-months', 'A few months', 496],
  ['about-a-year', 'About a year', 574],
  ['for-years', 'For years', 652],
]

export default function Screen12({ next, back, answers, setAnswer }) {
  const [sel, choose] = useChoice(next, setAnswer, 'q12')
  return (
    <div className="fig quiz">
      <StatusBar />
      <QuizChrome back={back} progress={0.42} />
      <p className="abs serif" style={{ left: 0, right: 0, top: 121, textAlign: 'center', fontSize: 46, color: '#fff' }}>
        Question 9
      </p>
      <p className="abs" style={{ left: 31, top: 195, fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>
        So tell us, {(answers.name || 'Name').trim()}
      </p>
      <p className="abs" style={{ left: 31, top: 216, width: 360, fontSize: 28, lineHeight: '31px', color: '#fff' }}>
        How long have you felt like your drinking needed to change?
      </p>
      {OPTIONS.map(([value, label, y]) => (
        <RadioOption key={value} y={y} label={label} selected={sel === value} onClick={() => choose(value)} />
      ))}
      <SkipQuiz onClick={next} />
    </div>
  )
}
