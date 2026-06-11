import { StatusBar, QuizChrome } from '../components/Shell.jsx'

// Shared layout for Figma frames 14-1 / 14-2 / 14-3 (268:1544 / 268:1268 /
// 268:1382): serif headline, hub diagram (🏆 "You" + four satellites), and
// three feature cards, with a full-width "Awesome!" CTA.

function Satellite({ cx, cy, emoji, label, labelY }) {
  return (
    <>
      <div
        className="abs"
        style={{
          left: cx - 35,
          top: cy - 35,
          width: 70,
          height: 70,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.25)',
        }}
      />
      <p className="abs" style={{ left: cx - 24, top: cy - 16, width: 48, fontSize: 28, textAlign: 'center', lineHeight: '32px' }}>
        {emoji}
      </p>
      <p className="abs" style={{ left: cx - 60, top: labelY, width: 120, fontSize: 18, textAlign: 'center', color: '#fff' }}>
        {label}
      </p>
    </>
  )
}

function FeatureCard({ y, emoji, title, sub }) {
  return (
    <>
      <div
        className="abs"
        style={{
          left: 30,
          top: y,
          width: 379,
          height: 68,
          borderRadius: 20,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.25)',
        }}
      />
      <div className="abs" style={{ left: 46, top: y + 14, width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.25)' }} />
      <p className="abs" style={{ left: 52, top: y + 17, fontSize: 26, lineHeight: '34px' }}>
        {emoji}
      </p>
      <p className="abs" style={{ left: 106, top: y + 10, fontSize: 22, color: '#fff' }}>
        {title}
      </p>
      <p className="abs" style={{ left: 106, top: y + 37, fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>
        {sub}
      </p>
      <span
        className="abs"
        style={{
          left: 373,
          top: y + 21,
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.6)',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <svg width="11" height="9" viewBox="0 0 12 10" fill="none">
          <path d="M1 5.2 4.4 8.5 11 1.5" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </>
  )
}

export default function Screen14Base({ next, back, answers, headline, headlineSize = 46, body, lowerText }) {
  return (
    <div className="fig quiz">
      <StatusBar />
      <QuizChrome back={back} progress={0.5} />
      <p className="abs serif" style={{ left: 0, right: 0, top: 121, textAlign: 'center', fontSize: headlineSize, color: '#fff' }}>
        {headline}
      </p>
      <p className="abs" style={{ left: 31, top: 195, fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>
        {(answers.name || 'Name').trim()},
      </p>
      <p className="abs" style={{ left: 31, top: 216, width: 379, fontSize: 28, lineHeight: '31px', color: '#fff' }}>
        {body}
      </p>

      {/* hub diagram */}
      <svg className="abs" style={{ left: 0, top: 0 }} width="440" height="956" fill="none">
        <line x1="127" y1="337" x2="183" y2="312" stroke="rgba(255,255,255,0.6)" />
        <line x1="257" y1="312" x2="313" y2="337" stroke="rgba(255,255,255,0.6)" />
        <line x1="127" y1="378" x2="183" y2="403" stroke="rgba(255,255,255,0.6)" />
        <line x1="257" y1="403" x2="313" y2="378" stroke="rgba(255,255,255,0.6)" />
      </svg>
      <div
        className="abs"
        style={{ left: 175, top: 312, width: 90, height: 90, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.5)' }}
      />
      <div
        className="abs"
        style={{
          left: 185,
          top: 322,
          width: 70,
          height: 70,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.25)',
        }}
      />
      <p className="abs" style={{ left: 196, top: 341, width: 48, fontSize: 32, textAlign: 'center', lineHeight: '34px' }}>
        🏆
      </p>
      <p className="abs" style={{ left: 160, top: 406, width: 120, fontSize: 18, textAlign: 'center', color: '#fff' }}>
        You
      </p>
      <Satellite cx={95} cy={297} emoji="🎯" label="Progress" labelY={336} />
      <Satellite cx={345} cy={297} emoji="✨" label="Insights" labelY={336} />
      <Satellite cx={95} cy={418} emoji="📈" label="Goals" labelY={455} />
      <Satellite cx={345} cy={418} emoji="🙌" label="Friends" labelY={457} />

      <p className="abs" style={{ left: 31, top: 503, width: 302, fontSize: 28, lineHeight: '31px', color: '#fff' }}>
        {lowerText}
      </p>

      <FeatureCard y={576} emoji="🎯" title="Personalized tracking" sub="See what works best for you." />
      <FeatureCard y={660} emoji="🙌" title="Social accountability" sub="Progress together with your friends." />
      <FeatureCard y={744} emoji="📈" title="Clear progress view" sub="See and feel your growth" />

      <button
        className="pill"
        style={{ left: 31, top: 839, width: 378 }}
        onClick={next}
      >
        Awesome!
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
          <path d="M1 8h17m0 0-6-6m6 6-6 6" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}
