import { useEffect, useMemo, useState } from 'react'
import { PhoneFrame, StatusBar, TopBar } from './components/chrome.jsx'
import {
  Welcome,
  PathChoice,
  NameScreen,
  GoalQuiz,
  FrequencyQuiz,
  SpendQuiz,
  Reassurance,
  TourWelcome,
  TourStreak,
  TourUrge,
  TourLessons,
  Science,
  Credibility,
  Referral,
  Insight,
  Fork,
  Projection,
} from './screens/onboarding.jsx'
import { Home } from './screens/Home.jsx'

const PER_WEEK = { daily: 6, few: 3, weekends: 2, social: 1 }
const PER_NIGHT = { low: 15, mid: 30, high: 60, big: 100 }
const CALS_PER_NIGHT = 600 // ~4 drinks + the 2am snack

const DEFAULT_ANSWERS = { path: '', name: '', goals: [], freq: '', spend: '', code: '' }

// Flow: each entry is [Component, phase]. Progress bars are per-phase,
// matching the segmented bars in the source frames.
const FLOW = [
  [Welcome, null],
  [PathChoice, 'quiz'],
  [NameScreen, 'quiz'],
  [GoalQuiz, 'quiz'],
  [FrequencyQuiz, 'quiz'],
  [SpendQuiz, 'quiz'],
  [Reassurance, 'quiz'],
  [TourWelcome, 'tour'],
  [TourStreak, 'tour'],
  [TourUrge, 'tour'],
  [TourLessons, 'tour'],
  [Science, 'proof'],
  [Credibility, 'proof'],
  [Referral, 'proof'],
  [Insight, 'proof'],
  [Fork, 'proof'],
  [Projection, 'proof'],
]

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export default function App() {
  const [step, setStep] = useState(() => load('unwined.step', 0))
  const [answers, setAnswers] = useState(() => ({ ...DEFAULT_ANSWERS, ...load('unwined.answers', {}) }))
  const [startedAt, setStartedAt] = useState(() => load('unwined.startedAt', null))

  // Settings & progress survive reloads.
  useEffect(() => localStorage.setItem('unwined.step', JSON.stringify(step)), [step])
  useEffect(() => localStorage.setItem('unwined.answers', JSON.stringify(answers)), [answers])
  useEffect(() => localStorage.setItem('unwined.startedAt', JSON.stringify(startedAt)), [startedAt])

  const setAnswer = (k, v) => setAnswers((a) => ({ ...a, [k]: v }))

  const projection = useMemo(() => {
    const nightsPerWeek = PER_WEEK[answers.freq] || 3
    const perNight = PER_NIGHT[answers.spend] || 30
    const nights90 = Math.round((nightsPerWeek * 90) / 7)
    const start = startedAt ? new Date(startedAt) : new Date()
    return {
      startDate: start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      money: nights90 * perNight,
      calories: nights90 * CALS_PER_NIGHT,
      hangovers: nights90,
    }
  }, [answers.freq, answers.spend, startedAt])

  const streak = useMemo(() => {
    if (!startedAt) return 1
    const days = Math.floor((Date.now() - startedAt) / 86400000) + 1
    return Math.max(days, 1)
  }, [startedAt])

  const done = step >= FLOW.length
  const next = () => {
    if (step === FLOW.length - 1 && !startedAt) setStartedAt(Date.now())
    setStep((s) => s + 1)
  }
  const back = () => setStep((s) => Math.max(s - 1, 0))
  const reset = () => {
    setAnswers(DEFAULT_ANSWERS)
    setStartedAt(null)
    setStep(0)
  }

  let body
  if (done) {
    body = <Home answers={answers} projection={projection} streak={streak} onReset={reset} />
  } else {
    const [Screen, phase] = FLOW[step]
    const phaseSteps = FLOW.filter(([, p]) => p && p === phase)
    const phaseIndex = phaseSteps.findIndex(([c]) => c === Screen) + 1
    body = (
      <>
        {phase && (
          <div style={{ padding: '0 24px' }}>
            <TopBar onBack={back} step={phaseIndex} total={phaseSteps.length} />
          </div>
        )}
        <Screen next={next} answers={answers} setAnswer={setAnswer} projection={projection} />
      </>
    )
  }

  return (
    <PhoneFrame>
      <div className={`app ${step === 0 && !done ? 'side' : ''}`}>
        <StatusBar />
        {body}
      </div>
    </PhoneFrame>
  )
}
