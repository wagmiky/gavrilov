import { StatusBar, QuizChrome, Pill } from '../components/Shell.jsx'
import huberman from '../assets/s33-huberman.jpg'
import bartlett from '../assets/s33-bartlett.png'
import holland from '../assets/s33-holland.png'
import verified from '../assets/s33-verified.svg'

// Figma 114:784 "33" — expert quotes. Copy kept exactly as in the frame.
const QUOTES = [
  {
    avatar: huberman,
    avatarY: 254,
    name: 'Andrew Huberman, PhD',
    nameX: 81,
    nameY: 258,
    badge: [314, 263],
    bubble: [81, 296, 99],
    title: 'Even moderate drinking harms brain',
    body: 'Alcohol is a known toxin to the cells of the body. It produces substantial stress and damage to cells.',
    bodyW: 307,
  },
  {
    avatar: bartlett,
    avatarY: 410,
    name: 'Steve Bartlett, “Diary of a CEO”',
    nameX: 83,
    nameY: 414,
    badge: [380, 419],
    bubble: [81, 452, 137],
    title: 'The subtle addiction trap',
    body:
      'Alcohol taxes your ambition, your relationships and your ability to show up as your best self. The hangover isn’t just a headache, it’s a stolen day of progress, energy and self‑belief.',
    bodyW: 307,
  },
  {
    avatar: holland,
    avatarY: 604,
    name: 'Tom Holland, actor',
    nameX: 80,
    nameY: 607,
    badge: [262, 612],
    bubble: [81, 645, 160],
    title: 'Alcohol is modern enslavement',
    body:
      'Getting sober is honestly the best thing I’ve ever done. By the time I got to six months, I was the happiest I’ve ever been in my life. I could sleep better, handle problems better, and my mental clarity improved significantly.',
    bodyW: 302,
  },
]

export default function Screen33({ next, back }) {
  return (
    <div className="fig quiz">
      <StatusBar />
      <QuizChrome back={back} progress={0.9} />
      <p className="abs" style={{ left: 30, top: 122, width: 325, fontSize: 32, lineHeight: '35px', color: '#fff' }}>
        X% of experts say that alcohol consumtion leads to a worse life.
      </p>
      {QUOTES.map((q) => (
        <div key={q.name}>
          <img src={q.avatar} alt="" className="abs" style={{ left: 30, top: q.avatarY, width: 42, height: 42, borderRadius: 50, objectFit: 'cover' }} />
          <p
            className="abs med"
            style={{ left: q.nameX, top: q.nameY, fontSize: 21, lineHeight: '35px', color: '#fff', display: 'inline-flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap' }}
          >
            {q.name}
            <img src={verified} alt="" style={{ width: 25, height: 25 }} />
          </p>
          <div
            className="abs"
            style={{
              left: q.bubble[0],
              top: q.bubble[1],
              width: 329,
              height: q.bubble[2],
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '0 20px 20px 20px',
            }}
          />
          <p className="abs" style={{ left: 92, top: q.bubble[1], fontSize: 17, fontWeight: 700, lineHeight: '35px', color: '#fff', whiteSpace: 'nowrap' }}>
            {q.title}
          </p>
          <p className="abs" style={{ left: 92, top: q.bubble[1] + 32, width: q.bodyW, fontSize: 17, lineHeight: '19px', color: '#fff' }}>
            {q.body}
          </p>
        </div>
      ))}
      <Pill x={129} y={839} label="Next" onClick={next} />
    </div>
  )
}
