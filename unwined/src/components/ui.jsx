// Core UI primitives from the UnWined kit: Button, OptionRow, Sparkle,
// StreakRing, WeekRow, TwoPathsChart.

export function Button({ variant = 'primary', children, arrow, ...rest }) {
  return (
    <button className={`btn ${variant}`} {...rest}>
      {children}
      {arrow && (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10h12m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}

export function OptionRow({ emoji, label, sub, selected, onClick }) {
  return (
    <button className={`option-row ${selected ? 'selected' : ''}`} onClick={onClick}>
      {emoji && <span className="icon-well">{emoji}</span>}
      <span>
        {label}
        {sub && <span className="opt-sub">{sub}</span>}
      </span>
    </button>
  )
}

// The brand's signature gold 5-point sparkle — a vector, not a raster asset.
export function Sparkle({ size = 72 }) {
  return (
    <svg className="welcome-sparkle" width={size} height={size} viewBox="0 0 72 72" fill="none">
      <path
        d="M36 2c2.4 14.7 4.9 23.8 10 28.9C51.1 36 60.2 38.6 70 41c-9.8 2.4-18.9 5-24 10.1C40.9 56.2 38.4 65.3 36 70c-2.4-4.7-4.9-13.8-10-18.9C20.9 46 11.8 43.4 2 41c9.8-2.4 18.9-5 24-10.1C31.1 25.8 33.6 16.7 36 2Z"
        fill="#FFDD19"
      />
    </svg>
  )
}

export function StreakRing({ value, label, size = 180, fraction = 0.68 }) {
  const stroke = 12
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.18)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="#fff"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${c * fraction} ${c}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.55))' }}
        />
      </svg>
      <div className="val">
        <b>{value}</b>
        <small>{label}</small>
      </div>
    </div>
  )
}

export function WeekRow({ done = 5 }) {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  return (
    <div className="week">
      {days.map((d, i) => (
        <i key={i} className={i < done ? 'done' : ''}>
          {d}
        </i>
      ))}
    </div>
  )
}

// Signature motif: the "2 paths" divergence chart. A glowing blue rising
// curve and a red declining curve split from a glowing white node.
export function TwoPathsChart() {
  return (
    <div className="paths-wrap">
      <svg viewBox="0 0 340 220" fill="none">
        <defs>
          <filter id="glowB" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glowR" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* shared past */}
        <path d="M14 120 C 60 118, 90 116, 122 112" stroke="rgba(255,255,255,0.7)" strokeWidth="3" strokeLinecap="round" />
        {/* clarity with UnWined */}
        <path d="M122 112 C 190 100, 250 70, 326 28" stroke="#0088FF" strokeWidth="3.5" strokeLinecap="round" filter="url(#glowB)" />
        {/* same old habits */}
        <path d="M122 112 C 190 126, 250 158, 326 196" stroke="#E23250" strokeWidth="3.5" strokeLinecap="round" filter="url(#glowR)" />
        {/* divergence node */}
        <circle cx="122" cy="112" r="7" fill="#fff" style={{ filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.95))' }} />
        <circle cx="326" cy="28" r="5" fill="#0088FF" style={{ filter: 'drop-shadow(0 0 10px rgba(0,136,255,0.9))' }} />
        <circle cx="326" cy="196" r="5" fill="#E23250" style={{ filter: 'drop-shadow(0 0 10px rgba(226,50,80,0.9))' }} />
      </svg>
      <div className="paths-labels">
        <span className="tag red">
          <span className="dot" />
          Same old habits
        </span>
        <span className="tag blue">
          <span className="dot" />
          Clarity with UnWined
        </span>
      </div>
    </div>
  )
}
