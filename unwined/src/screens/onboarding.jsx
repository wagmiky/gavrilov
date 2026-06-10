import { Button, OptionRow, Sparkle, StreakRing, WeekRow, TwoPathsChart } from '../components/ui.jsx'

// ── 1 · Welcome ───────────────────────────────────────────────────

export function Welcome({ next }) {
  return (
    <div className="screen center">
      <div style={{ marginTop: 'auto' }}>
        <Sparkle />
        <h1 className="display" style={{ fontSize: 52 }}>
          Your life, but better.
        </h1>
        <p className="sub" style={{ marginTop: 16, maxWidth: 280, marginInline: 'auto' }}>
          The calmer way to drink less — or not at all. On your own terms.
        </p>
      </div>
      <div className="cta-zone" style={{ width: '100%' }}>
        <Button onClick={next} arrow>
          Show me
        </Button>
        <p className="footnote" style={{ textAlign: 'center', marginTop: 10 }}>
          <span className="wordmark">UnWined</span>
        </p>
      </div>
    </div>
  )
}

// ── 2 · Path choice ───────────────────────────────────────────────

export function PathChoice({ next, answers, setAnswer }) {
  return (
    <div className="screen">
      <h1 className="display">2 paths from here.</h1>
      <p className="sub" style={{ marginTop: 14 }}>
        Pick your lane. You can always change it later.
      </p>
      <div className="option-list" style={{ marginTop: 28 }}>
        <OptionRow
          emoji="🎯"
          label="I wanna quit drinking"
          sub="Full sobriety, streak-driven"
          selected={answers.path === 'quit'}
          onClick={() => setAnswer('path', 'quit')}
        />
        <OptionRow
          emoji="🧠"
          label="Be mindful about drinking"
          sub="Moderation, awareness, tracking"
          selected={answers.path === 'mindful'}
          onClick={() => setAnswer('path', 'mindful')}
        />
      </div>
      <div className="cta-zone">
        <Button onClick={next} disabled={!answers.path} style={{ opacity: answers.path ? 1 : 0.5 }}>
          Looks solid
        </Button>
      </div>
    </div>
  )
}

// ── 3 · Name ──────────────────────────────────────────────────────

export function NameScreen({ next, answers, setAnswer }) {
  return (
    <div className="screen">
      <h1 className="display">First things first.</h1>
      <p className="sub" style={{ marginTop: 14 }}>
        What should we call you?
      </p>
      <input
        className="name-input"
        value={answers.name}
        placeholder="Your name"
        autoCapitalize="words"
        onChange={(e) => setAnswer('name', e.target.value)}
      />
      <div className="cta-zone">
        <Button onClick={next} disabled={!answers.name.trim()} style={{ opacity: answers.name.trim() ? 1 : 0.5 }}>
          {answers.name.trim() ? `Nice to meet you, ${answers.name.trim()}` : 'Next'}
        </Button>
      </div>
    </div>
  )
}

// ── 4 · Goal quiz (multi-select) ──────────────────────────────────

const GOALS = [
  { id: 'streak', emoji: '🎯', label: 'Track my sobriety streak' },
  { id: 'urge', emoji: '🤘', label: 'Use urge button when needed*' },
  { id: 'learn', emoji: '🧠', label: 'Learn why I drink' },
  { id: 'wins', emoji: '🏆', label: 'Hit milestones & save money' },
]

export function GoalQuiz({ next, answers, setAnswer }) {
  const toggle = (id) => {
    const cur = answers.goals
    setAnswer('goals', cur.includes(id) ? cur.filter((g) => g !== id) : [...cur, id])
  }
  return (
    <div className="screen">
      <h1 className="display sm">What do you plan to use UnWined for?</h1>
      <p className="sub" style={{ marginTop: 12 }}>
        Pick everything that fits.
      </p>
      <div className="option-list" style={{ marginTop: 24 }}>
        {GOALS.map((g) => (
          <OptionRow key={g.id} emoji={g.emoji} label={g.label} selected={answers.goals.includes(g.id)} onClick={() => toggle(g.id)} />
        ))}
      </div>
      <p className="footnote" style={{ marginTop: 14 }}>
        *a panic button when alcohol cravings hit. It gives immediate support to help you get through it.
      </p>
      <div className="cta-zone">
        <Button onClick={next} disabled={answers.goals.length === 0} style={{ opacity: answers.goals.length ? 1 : 0.5 }}>
          Awesome!
        </Button>
      </div>
    </div>
  )
}

// ── 5 · Frequency quiz ────────────────────────────────────────────

const FREQS = [
  { id: 'daily', emoji: '🌙', label: 'Most days', perWeek: 6 },
  { id: 'few', emoji: '📆', label: 'A few times a week', perWeek: 3 },
  { id: 'weekends', emoji: '🎉', label: 'Weekends, mostly', perWeek: 2 },
  { id: 'social', emoji: '🥂', label: 'Only when it’s social', perWeek: 1 },
]

export function FrequencyQuiz({ next, answers, setAnswer }) {
  return (
    <div className="screen">
      <h1 className="display sm">How often does drinking show up for you?</h1>
      <p className="sub" style={{ marginTop: 12 }}>
        No judgement — this just tunes your plan.
      </p>
      <div className="option-list" style={{ marginTop: 24 }}>
        {FREQS.map((f) => (
          <OptionRow
            key={f.id}
            emoji={f.emoji}
            label={f.label}
            selected={answers.freq === f.id}
            onClick={() => setAnswer('freq', f.id)}
          />
        ))}
      </div>
      <div className="cta-zone">
        <Button onClick={next} disabled={!answers.freq} style={{ opacity: answers.freq ? 1 : 0.5 }}>
          Next
        </Button>
      </div>
    </div>
  )
}

// ── 6 · Spend quiz ────────────────────────────────────────────────

const SPENDS = [
  { id: 'low', emoji: '🪙', label: 'Under $20', perNight: 15 },
  { id: 'mid', emoji: '💵', label: '$20–40', perNight: 30 },
  { id: 'high', emoji: '💳', label: '$40–80', perNight: 60 },
  { id: 'big', emoji: '💸', label: 'More than $80', perNight: 100 },
]

export function SpendQuiz({ next, answers, setAnswer }) {
  return (
    <div className="screen">
      <h1 className="display sm">What does a typical night out cost you?</h1>
      <p className="sub" style={{ marginTop: 12 }}>
        Drinks, rides, the 2am snacks — all of it.
      </p>
      <div className="option-list" style={{ marginTop: 24 }}>
        {SPENDS.map((s) => (
          <OptionRow
            key={s.id}
            emoji={s.emoji}
            label={s.label}
            selected={answers.spend === s.id}
            onClick={() => setAnswer('spend', s.id)}
          />
        ))}
      </div>
      <div className="cta-zone">
        <Button onClick={next} disabled={!answers.spend} style={{ opacity: answers.spend ? 1 : 0.5 }}>
          Next
        </Button>
      </div>
    </div>
  )
}

// ── 7 · Reassurance beat (frame 22) ───────────────────────────────

export function Reassurance({ next }) {
  return (
    <div className="screen">
      <div style={{ marginTop: 28 }}>
        <p className="eyebrow" style={{ marginBottom: 14 }}>
          A quick gut-check
        </p>
        <h1 className="display">This isn’t an overreaction. It’s a power move.</h1>
        <p className="sub" style={{ marginTop: 16 }}>
          Choosing to take charge of your drinking puts you ahead of almost everyone who never stops to ask. Let’s turn that into a
          plan.
        </p>
      </div>
      <div className="cta-zone">
        <Button onClick={next}>Let’s go</Button>
      </div>
    </div>
  )
}

// ── 8 · Tour: welcome + social proof (frame 26) ───────────────────

export function TourWelcome({ next }) {
  return (
    <div className="screen">
      <h1 className="display sm" style={{ marginTop: 10 }}>
        Welcome to UnWined.
      </h1>
      <p className="sub" style={{ marginTop: 14 }}>
        Join 250,000+ people rewiring their relationship with alcohol — on their own terms.
      </p>
      <div style={{ margin: '36px auto 0', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="avatars">
          {['🧑‍🦱', '👩‍🦰', '🧔', '👩'].map((e, i) => (
            <span key={i}>{e}</span>
          ))}
        </div>
        <div className="stars">★★★★★</div>
        <span className="footnote" style={{ maxWidth: 250 }}>
          Rated 4.9 by people who’ve been right where you are.
        </span>
      </div>
      <div className="cta-zone">
        <Button onClick={next}>Next</Button>
      </div>
    </div>
  )
}

// ── 9 · Tour: streak (frame 27) ───────────────────────────────────

export function TourStreak({ next }) {
  return (
    <div className="screen">
      <h1 className="display sm" style={{ marginTop: 10 }}>
        Watch your streak grow.
      </h1>
      <p className="sub" style={{ marginTop: 12 }}>
        Every day on track stacks up — and you’ll see it build, right on your home screen.
      </p>
      <div className="ring-wrap">
        <StreakRing value="12" label="day streak" />
      </div>
      <WeekRow done={5} />
      <div className="cta-zone">
        <Button onClick={next}>Next</Button>
      </div>
    </div>
  )
}

// ── 10 · Tour: urge tools (frame 28) ──────────────────────────────

export function TourUrge({ next }) {
  return (
    <div className="screen">
      <h1 className="display sm" style={{ marginTop: 10 }}>
        Beat the urge in five minutes.
      </h1>
      <p className="sub" style={{ marginTop: 12 }}>
        When a craving hits, open UnWined. We’ll talk you through it until it passes — because it always does.
      </p>
      <div style={{ marginTop: 26 }}>
        <Button variant="urge">I’m having an urge</Button>
      </div>
      <div className="toollist" style={{ marginTop: 14 }}>
        <div className="tool">
          <span className="icon-well">⏱</span>5-minute urge timer
        </div>
        <div className="tool">
          <span className="icon-well">🫁</span>Guided breathing
        </div>
      </div>
      <div className="cta-zone">
        <Button onClick={next}>Next</Button>
      </div>
    </div>
  )
}

// ── 11 · Tour: lessons (frame 31) ─────────────────────────────────

export function TourLessons({ next }) {
  return (
    <div className="screen">
      <h1 className="display sm" style={{ marginTop: 10 }}>
        Learn why you drink — and how to change it.
      </h1>
      <p className="sub" style={{ marginTop: 12 }}>
        Bite-sized lessons retrain the habit underneath the habit. Five minutes a day. Day 1 starts now.
      </p>
      <div style={{ marginTop: 24 }}>
        <div className="lesson">
          <span className="n">1</span>
          <div className="tx">
            <b>The habit loop</b>
            <span>4 min · unlocked</span>
          </div>
        </div>
        <div className="lesson lock">
          <span className="n">2</span>
          <div className="tx">
            <b>Spotting your triggers</b>
            <span>Day 2</span>
          </div>
        </div>
        <div className="lesson lock">
          <span className="n">3</span>
          <div className="tx">
            <b>Rewiring the reward</b>
            <span>Day 3</span>
          </div>
        </div>
      </div>
      <div className="cta-zone">
        <Button onClick={next}>Start Day 1</Button>
      </div>
    </div>
  )
}

// ── 12 · Science connector (frame 32) ─────────────────────────────

export function Science({ next }) {
  return (
    <div className="screen center">
      <p className="eyebrow">The part that makes it stick</p>
      <h1 className="display" style={{ marginTop: 16 }}>
        This isn’t motivation. It’s science.
      </h1>
      <p className="sub" style={{ marginTop: 16, maxWidth: 270 }}>
        Everything you just saw works because it’s built on how habits actually break. Here’s the proof.
      </p>
      <div className="cta-zone" style={{ width: '100%' }}>
        <Button onClick={next}>Show me the proof</Button>
      </div>
    </div>
  )
}

// ── 13 · Credibility ──────────────────────────────────────────────

export function Credibility({ next }) {
  return (
    <div className="screen">
      <h1 className="display sm" style={{ marginTop: 10 }}>
        Our program is based on.
      </h1>
      <p className="sub" style={{ marginTop: 12 }}>
        Proven cognitive techniques for lasting change — researched at places like these.
      </p>
      <div style={{ marginTop: 24 }}>
        <div className="uni">
          <span className="icon-well round">🧠</span>
          <div>
            <div className="mark">Harvard</div>
            <div className="field">Habit formation &amp; reward research</div>
          </div>
        </div>
        <div className="uni">
          <span className="icon-well round">🔬</span>
          <div>
            <div className="mark">Stanford</div>
            <div className="field">Behavior design &amp; tiny habits</div>
          </div>
        </div>
        <div className="uni">
          <span className="icon-well round">🌲</span>
          <div>
            <div className="mark">University of Washington</div>
            <div className="field">Relapse prevention &amp; mindfulness</div>
          </div>
        </div>
      </div>
      <div className="cta-zone">
        <Button onClick={next}>Awesome!</Button>
      </div>
    </div>
  )
}

// ── 14 · Referral code (frame 35) ─────────────────────────────────

export function Referral({ next, answers, setAnswer }) {
  const code = answers.code
  const setChar = (i, v) => {
    const chars = [...code]
    chars[i] = v.slice(-1).toUpperCase()
    setAnswer('code', chars.map((c) => c || '').join(''))
    if (v && i < 3) {
      const next = document.getElementById(`code-${i + 1}`)
      if (next) next.focus()
    }
  }
  return (
    <div className="screen">
      <p className="eyebrow" style={{ marginBottom: 14 }}>
        Almost there
      </p>
      <h1 className="display sm">Got an invite code?</h1>
      <p className="sub" style={{ marginTop: 12 }}>
        Drop it in to unlock your friend’s referral perk. No code? Skip ahead — nothing’s locked behind it.
      </p>
      <div className="codeboxes">
        {[0, 1, 2, 3].map((i) => (
          <input key={i} id={`code-${i}`} maxLength={2} value={code[i] || ''} onChange={(e) => setChar(i, e.target.value)} />
        ))}
      </div>
      <p className="footnote" style={{ marginTop: 12 }}>
        Enter the 4-character code from your invite.
      </p>
      <div className="cta-zone">
        <Button onClick={next} disabled={code.length < 4} style={{ opacity: code.length === 4 ? 1 : 0.5 }}>
          Apply code
        </Button>
        <Button variant="ghost" onClick={next}>
          I don’t have one — skip
        </Button>
      </div>
    </div>
  )
}

// ── 15 · Insight setup ────────────────────────────────────────────

export function Insight({ next, answers }) {
  return (
    <div className="screen center">
      <Sparkle size={48} />
      <h1 className="display">Your answers tell a story.</h1>
      <p className="sub" style={{ marginTop: 16, maxWidth: 270 }}>
        {answers.name ? `${answers.name.trim()}, we’ve got you. ` : ''}
        You’re already on the right track — here’s where it leads.
      </p>
      <div className="cta-zone" style={{ width: '100%' }}>
        <Button onClick={next}>Show me</Button>
      </div>
    </div>
  )
}

// ── 16 · The fork: 2 paths chart ──────────────────────────────────

export function Fork({ next }) {
  return (
    <div className="screen">
      <h1 className="display" style={{ marginTop: 10 }}>
        Something changes today.
      </h1>
      <p className="sub" style={{ marginTop: 12 }}>
        Same starting point, two very different years. You just picked the blue one.
      </p>
      <TwoPathsChart />
      <div className="cta-zone">
        <Button onClick={next}>I’m ready</Button>
      </div>
    </div>
  )
}

// ── 17 · Benefits projection (frame 36) ───────────────────────────

export function Projection({ next, answers, projection }) {
  const name = answers.name.trim()
  return (
    <div className="screen">
      <p className="eyebrow" style={{ marginBottom: 12 }}>
        Your 90-day projection
      </p>
      <h1 className="display sm">{name ? `${name}, here’s your life — but better.` : 'Your life — but better.'}</h1>
      <p className="sub" style={{ marginTop: 10 }}>
        Based on your goal, here’s what 90 days from <b style={{ color: '#fff' }}>{projection.startDate}</b> could add up to.
      </p>
      <div style={{ marginTop: 18 }}>
        <div className="stat-row">
          <span className="lab">
            <span className="icon-well">🍔</span>Empty calories dodged
          </span>
          <span className="num">{projection.calories.toLocaleString()}</span>
        </div>
        <div className="stat-row">
          <span className="lab">
            <span className="icon-well">🛏️</span>Hangovers skipped
          </span>
          <span className="num">{projection.hangovers}</span>
        </div>
        <div className="stat-row">
          <span className="lab">
            <span className="icon-well">✨</span>Aura farmed
          </span>
          <span className="num" style={{ color: 'var(--gold)' }}>
            +999
          </span>
        </div>
        <div className="stat-row">
          <span className="lab">
            <span className="icon-well">💸</span>Kept in your pocket
          </span>
          <span className="num" style={{ color: 'var(--blue)' }}>
            ${projection.money.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="cta-zone">
        <Button onClick={next}>Build my plan</Button>
      </div>
    </div>
  )
}
