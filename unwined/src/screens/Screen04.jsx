import { StatusBar, QuizChrome } from '../components/Shell.jsx'
import { QuestionTitle, QuestionText, RadioOption, SkipQuiz, useChoice } from '../components/Question.jsx'

// Figma 102:508 "4" + 111:487 (selected state) — Question 1: gender.
const OPTIONS = [
  ['male', 'Male', 279],
  ['female', 'Female', 357],
  ['other', 'Other', 435],
  ['prefer-not-to-share', 'Prefer not to share', 513],
]

export default function Screen04({ next, back, setAnswer }) {
  const [sel, choose] = useChoice(next, setAnswer, 'q04')
  return (
    <div className="fig quiz">
      <StatusBar />
      <QuizChrome back={back} progress={0.02} />
      <QuestionTitle top={151}>Question 1</QuestionTitle>
      <QuestionText>What’s your gender?</QuestionText>
      {OPTIONS.map(([value, label, y]) => (
        <RadioOption key={value} y={y} label={label} selected={sel === value} onClick={() => choose(value)} />
      ))}
      <SkipQuiz onClick={next} />
    </div>
  )
}
