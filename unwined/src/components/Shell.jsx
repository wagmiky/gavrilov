import { useEffect, useState } from 'react'

// Scales the 440×956 design space uniformly to the device viewport.
// On phones it fills the screen; on desktop it sits in a bezel.
export function Shell({ children }) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const fit = () => {
      const pad = window.innerWidth >= 600 ? 48 : 0
      setScale(Math.min((window.innerWidth - pad) / 440, (window.innerHeight - pad) / 956))
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  return (
    <div className="viewport">
      <div className="canvas" style={{ transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  )
}

export function StatusBar({ dark = false }) {
  return (
    <div className="fstatus" style={{ color: dark ? '#000' : '#fff' }}>
      <span>9:41</span>
      <span className="sigs">
        <svg width="20" height="13" viewBox="0 0 18 12" fill="none">
          <rect x="0" y="7" width="3" height="5" rx="1" fill="currentColor" />
          <rect x="4.7" y="4.5" width="3" height="7.5" rx="1" fill="currentColor" />
          <rect x="9.4" y="2" width="3" height="10" rx="1" fill="currentColor" />
          <rect x="14.1" y="0" width="3" height="12" rx="1" fill="currentColor" opacity=".35" />
        </svg>
        <svg width="19" height="13" viewBox="0 0 16 12" fill="none">
          <path d="M8 2.5c2.2 0 4.2.8 5.7 2.2l1.3-1.4A11 11 0 0 0 8 .5 11 11 0 0 0 1 3.3l1.3 1.4A8 8 0 0 1 8 2.5Z" fill="currentColor" />
          <path d="M8 6c1.1 0 2.1.4 2.9 1.2l1.3-1.4A8 8 0 0 0 8 4a8 8 0 0 0-4.2 1.8l1.3 1.4A4 4 0 0 1 8 6Z" fill="currentColor" />
          <circle cx="8" cy="9.8" r="1.6" fill="currentColor" />
        </svg>
        <svg width="29" height="14" viewBox="0 0 26 13" fill="none">
          <rect x="1" y="1.5" width="21" height="10" rx="3" stroke="currentColor" strokeOpacity=".5" strokeWidth="1.2" />
          <rect x="3" y="3.5" width="16" height="6" rx="1.5" fill="currentColor" />
          <rect x="23.4" y="4.5" width="1.6" height="4" rx="1" fill="currentColor" fillOpacity=".5" />
        </svg>
      </span>
    </div>
  )
}

// The frames carry a "лого" placeholder at top center — rendered as the
// UnWined wordmark.
export function Logo({ top = 78, dark = false }) {
  return (
    <p
      className="abs serif"
      style={{
        top,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 32,
        color: dark ? '#000' : '#fff',
      }}
    >
      UnWined
    </p>
  )
}

export function Pill({ x, y, w = 182, label, onClick, disabled, glass, style }) {
  return (
    <button
      className={`pill ${disabled ? 'disabled' : ''} ${glass ? 'glass' : ''}`}
      style={{ left: x, top: y, width: w, ...style }}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export function SkipLink({ y = 864, onClick, label = 'skip' }) {
  return (
    <button className="skiplink" style={{ top: y + 6, left: 0, right: 0, justifyContent: 'center' }} onClick={onClick}>
      {label}
      <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
        <path d="M1 8h17m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

// Recurring quiz header: back arrow, progress track, EN language chip.
// Geometry from frame 3 (251:901); progress = 0..1 fill of the 272px track.
export function QuizChrome({ back, progress = 0 }) {
  return (
    <>
      <button className="abs" style={{ left: 31, top: 77, width: 20, height: 16 }} onClick={back} aria-label="back">
        <svg width="20" height="15" viewBox="0 0 20 15" fill="none" style={{ display: 'block' }}>
          <path d="M19 7.5H1m0 0L7.5 1M1 7.5 7.5 14" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="abs" style={{ left: 67, top: 83, width: 272, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.2)' }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: Math.max(6, Math.round(272 * progress)),
            height: 6,
            borderRadius: 3,
            background: '#fff',
            transition: 'width 240ms cubic-bezier(0.22,1,0.36,1)',
          }}
        />
      </div>
      <div
        className="abs"
        style={{ left: 355, top: 75, width: 55, height: 22, borderRadius: 20, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.25)' }}
      />
      <p className="abs" style={{ left: 363, top: 77, fontSize: 14, color: '#fff' }}>
        🇺🇸 EN
      </p>
    </>
  )
}
