import { StatusBar, QuizChrome } from '../components/Shell.jsx'
import { RadioOption, SkipQuiz, useChoice } from '../components/Question.jsx'

// Figma 112:1039 "10" — Question 7: regret after drinking.
// (Frame title reads "Question L" — designer placeholder; numbered per flow.
// "Occasionaly" / "regret about it" kept exactly as written in the frame.)
const OPTIONS = [
  ['almost-always', 'Almost always', 311],
  ['quite-often', 'Quite often', 389],
  ['occasionally', 'Occasionaly', 467],
  ['almost-never', 'Almost never', 545],
]

export default function Screen10({ next, back, answers, setAnswer }) {
  const [sel, choose] = useChoice(next, setAnswer, 'q10')
  return (
    <div className="fig quiz">
      <StatusBar />
      <QuizChrome back={back} progress={0.32} />
      <p className="abs serif" style={{ left: 0, right: 0, top: 121, textAlign: 'center', fontSize: 46, color: '#fff' }}>
        Question 7
      </p>
      <p className="abs" style={{ left: 31, top: 195, fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>
        {(answers.name || 'Name').trim()}, be honest.
      </p>
      <p className="abs" style={{ left: 31, top: 216, width: 325, fontSize: 28, lineHeight: '31px', color: '#fff' }}>
        After consuming a drink, do you regret about it?
      </p>
      {OPTIONS.map(([value, label, y]) => (
        <RadioOption key={value} y={y} label={label} selected={sel === value} onClick={() => choose(value)} />
      ))}
      <SkipQuiz onClick={next} />
    </div>
  )
}
