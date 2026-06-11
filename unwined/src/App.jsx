import { useEffect, useMemo, useState } from 'react'
import { Shell } from './components/Shell.jsx'

import Screen01 from './screens/Screen01.jsx'
import Screen02 from './screens/Screen02.jsx'
import Screen03 from './screens/Screen03.jsx'
import Screen04 from './screens/Screen04.jsx'
import Screen05 from './screens/Screen05.jsx'
import Screen06 from './screens/Screen06.jsx'
import Screen07 from './screens/Screen07.jsx'
import Screen08 from './screens/Screen08.jsx'
import Screen09 from './screens/Screen09.jsx'
import Screen10 from './screens/Screen10.jsx'
import Screen11 from './screens/Screen11.jsx'
import Screen12 from './screens/Screen12.jsx'
import Screen13 from './screens/Screen13.jsx'
import Screen14A from './screens/Screen14A.jsx'
import Screen14B from './screens/Screen14B.jsx'
import Screen14C from './screens/Screen14C.jsx'
import Screen15 from './screens/Screen15.jsx'
import Screen16 from './screens/Screen16.jsx'
import Screen17 from './screens/Screen17.jsx'
import Screen19Quit from './screens/Screen19Quit.jsx'
import Screen19Mindful from './screens/Screen19Mindful.jsx'
import Screen20 from './screens/Screen20.jsx'
import Screen21 from './screens/Screen21.jsx'
import Screen22 from './screens/Screen22.jsx'
import Screen23 from './screens/Screen23.jsx'
import Screen26Quit from './screens/Screen26Quit.jsx'
import Screen26Mindful from './screens/Screen26Mindful.jsx'
import Screen27Quit from './screens/Screen27Quit.jsx'
import Screen27Mindful from './screens/Screen27Mindful.jsx'
import Screen28Quit from './screens/Screen28Quit.jsx'
import Screen28Mindful from './screens/Screen28Mindful.jsx'
import Screen29 from './screens/Screen29.jsx'
import Screen30 from './screens/Screen30.jsx'
import Screen31 from './screens/Screen31.jsx'
import Screen32 from './screens/Screen32.jsx'
import Screen33 from './screens/Screen33.jsx'
import Screen34 from './screens/Screen34.jsx'
import Screen35 from './screens/Screen35.jsx'
import Screen36 from './screens/Screen36.jsx'
import Screen37 from './screens/Screen37.jsx'
import Screen38 from './screens/Screen38.jsx'
import Screen39 from './screens/Screen39.jsx'
import Screen111 from './screens/Screen111.jsx'

// Flow order matches the numbered frames on the "Дизайн экранов" page.
// Variant screens resolve against the user's answers:
//  - 14: follow-up to the "tried before?" question on 13
//  - 19 / 26 / 27 / 28: split by chosen path (quit vs mindful)
const FLOW = [
  ['01', () => Screen01],
  ['02', () => Screen02],
  ['03', () => Screen03],
  ['04', () => Screen04],
  ['05', () => Screen05],
  ['06', () => Screen06],
  ['07', () => Screen07],
  ['08', () => Screen08],
  ['09', () => Screen09],
  ['10', () => Screen10],
  ['11', () => Screen11],
  ['12', () => Screen12],
  ['13', () => Screen13],
  ['14', (a) => (a.q13 === 'no' ? Screen14C : a.q13 === 'yes-successfully' ? Screen14B : Screen14A)],
  ['15', () => Screen15],
  ['16', () => Screen16],
  // Frame 18 is the selected state of 17 (merged into Screen17).
  ['17', () => Screen17],
  ['19', (a) => (a.path === 'mindful' ? Screen19Mindful : Screen19Quit)],
  ['20', () => Screen20],
  ['21', () => Screen21],
  ['22', () => Screen22],
  ['23', () => Screen23],
  ['26', (a) => (a.path === 'mindful' ? Screen26Mindful : Screen26Quit)],
  ['27', (a) => (a.path === 'mindful' ? Screen27Mindful : Screen27Quit)],
  ['28', (a) => (a.path === 'mindful' ? Screen28Mindful : Screen28Quit)],
  ['29', () => Screen29],
  ['30', () => Screen30],
  ['31', () => Screen31],
  ['32', () => Screen32],
  ['33', () => Screen33],
  ['34', () => Screen34],
  ['35', () => Screen35],
  ['36', () => Screen36],
  ['37', () => Screen37],
  ['38', () => Screen38],
  ['39', () => Screen39],
  ['111', () => Screen111],
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
  const [answers, setAnswers] = useState(() => load('unwined.answers', {}))

  useEffect(() => localStorage.setItem('unwined.step', JSON.stringify(step)), [step])
  useEffect(() => localStorage.setItem('unwined.answers', JSON.stringify(answers)), [answers])

  const setAnswer = (k, v) => setAnswers((a) => ({ ...a, [k]: v }))
  const next = () => setStep((s) => Math.min(s + 1, FLOW.length - 1))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  // dev/preview helpers: jump anywhere with window.__go(n) or arrow keys
  useEffect(() => {
    window.__go = (n) => setStep(Math.max(0, Math.min(n, FLOW.length - 1)))
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') back()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const Screen = useMemo(() => FLOW[step][1](answers), [step, answers])

  return (
    <Shell>
      <Screen key={step} next={next} back={back} answers={answers} setAnswer={setAnswer} />
    </Shell>
  )
}
