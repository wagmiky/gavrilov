import { useEffect, useState } from 'react'
import { Button, StreakRing, WeekRow } from '../components/ui.jsx'

// ── Tracker home: streak, money saved, calories avoided, Urge button ──

export function Home({ answers, projection, streak, onReset }) {
  const [urgeOpen, setUrgeOpen] = useState(false)
  const name = answers.name.trim()
  const dayFraction = Math.min((streak % 30) / 30 || 0.04, 1)

  if (urgeOpen) return <Urge onDone={() => setUrgeOpen(false)} />

  return (
    <div className="screen">
      <div className="home-head">
        <div>
          <p className="eyebrow">{answers.path === 'mindful' ? 'Mindful streak' : 'Sobriety streak'}</p>
          <h1 className="display sm" style={{ marginTop: 4 }}>
            {name ? `${name}, we’ve got you.` : 'We’ve got you.'}
          </h1>
        </div>
      </div>

      <div className="ring-wrap" style={{ margin: '18px 0 14px' }}>
        <StreakRing value={streak} label={streak === 1 ? 'day strong' : 'days strong'} size={190} fraction={dayFraction} />
      </div>

      <WeekRow done={Math.min(streak, 7)} />

      <div className="home-grid">
        <div className="cell">
          <span className="k">💸 Money saved</span>
          <span className="v" style={{ color: 'var(--blue)' }}>
            ${Math.round((projection.money / 90) * streak).toLocaleString()}
          </span>
        </div>
        <div className="cell">
          <span className="k">🍔 Empty calories avoided</span>
          <span className="v">{Math.round((projection.calories / 90) * streak).toLocaleString()}</span>
        </div>
        <div className="cell gold">
          <span className="k">✨ Aura farmed</span>
          <span className="v">+{streak * 11}</span>
        </div>
        <div className="cell">
          <span className="k">🏆 Next milestone</span>
          <span className="v">{streak < 7 ? '7 days' : streak < 30 ? '30 days' : '90 days'}</span>
        </div>
      </div>

      <div className="cta-zone">
        <Button variant="urge" onClick={() => setUrgeOpen(true)}>
          I’m having an urge
        </Button>
        <Button variant="ghost" onClick={onReset}>
          Start over
        </Button>
      </div>
    </div>
  )
}

// ── Urge support: 5-minute timer + guided breathing ──────────────

function Urge({ onDone }) {
  const [secs, setSecs] = useState(5 * 60)

  useEffect(() => {
    const t = setInterval(() => setSecs((s) => Math.max(s - 1, 0)), 1000)
    return () => clearInterval(t)
  }, [])

  const mm = String(Math.floor(secs / 60)).padStart(1, '0')
  const ss = String(secs % 60).padStart(2, '0')

  return (
    <div className="screen center">
      <p className="eyebrow">It passes. It always does.</p>
      <h1 className="display" style={{ marginTop: 14 }}>
        Breathe with us.
      </h1>
      <div className="breath-wrap">
        <div className="breath-circle" />
        <div className="breath-timer">
          {mm}:{ss}
        </div>
      </div>
      <p className="sub" style={{ maxWidth: 260 }}>
        In through the nose, out through the mouth. Stay here for five minutes — the urge crests and falls.
      </p>
      <div className="cta-zone" style={{ width: '100%' }}>
        <Button onClick={onDone}>{secs === 0 ? 'I made it' : 'I’m good now'}</Button>
      </div>
    </div>
  )
}
