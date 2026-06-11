import { StatusBar, QuizChrome } from '../components/Shell.jsx'
import { QuestionTitle, QuestionText, RadioOption, SkipQuiz, useChoice } from '../components/Question.jsx'

// Figma 112:870 "6" — Question 3: weekly drink count.
// (The frame's title literally reads "Question Y" — a designer placeholder;
// numbered per flow position here.)
const OPTIONS = [
  ['0-4', '0-4', 311],
  ['5-9', '5-9', 389],
  ['10-14', '10-14', 467],
  ['15-19', '15-19', 545],
  ['20+', '20+', 623],
]

export default function Screen06({ next, back, setAnswer }) {
  const [sel, choose] = useChoice(next, setAnswer, 'q06')
  return (
    <div className="fig quiz">
      <StatusBar />
      <QuizChrome back={back} progress={0.12} />
      <p className="abs serif" style={{ left: 0, right: 0, top: 121, textAlign: 'center', fontSize: 46, color: '#fff' }}>
        Question 3
      </p>
      <p className="abs" style={{ left: 31, top: 216, width: 325, fontSize: 28, lineHeight: '31px', color: '#fff' }}>
        How many drinks do you consume weekly?
      </p>
      {OPTIONS.map(([value, label, y]) => (
        <RadioOption key={value} y={y} label={label} selected={sel === value} onClick={() => choose(value)} />
      ))}
      <SkipQuiz onClick={next} />
    </div>
  )
}
