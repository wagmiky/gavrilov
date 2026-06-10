// Device chrome: phone frame (desktop preview), status bar, top bar.

export function PhoneFrame({ children }) {
  return (
    <div className="stage">
      <div className="phone-frame">
        <div className="phone-screen">
          <div className="island" />
          {children}
        </div>
      </div>
    </div>
  )
}

export function StatusBar() {
  return (
    <div className="statusbar">
      <span>9:41</span>
      <span className="sigs">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0" y="7" width="3" height="5" rx="1" fill="currentColor" />
          <rect x="4.7" y="4.5" width="3" height="7.5" rx="1" fill="currentColor" />
          <rect x="9.4" y="2" width="3" height="10" rx="1" fill="currentColor" />
          <rect x="14.1" y="0" width="3" height="12" rx="1" fill="currentColor" opacity=".35" />
        </svg>
        <svg width="17" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 2.5c2.2 0 4.2.8 5.7 2.2l1.3-1.4A11 11 0 0 0 8 .5 11 11 0 0 0 1 3.3l1.3 1.4A8 8 0 0 1 8 2.5Z" fill="currentColor" />
          <path d="M8 6c1.1 0 2.1.4 2.9 1.2l1.3-1.4A8 8 0 0 0 8 4a8 8 0 0 0-4.2 1.8l1.3 1.4A4 4 0 0 1 8 6Z" fill="currentColor" />
          <circle cx="8" cy="9.8" r="1.6" fill="currentColor" />
        </svg>
        <svg width="27" height="13" viewBox="0 0 26 13" fill="none">
          <rect x="1" y="1.5" width="21" height="10" rx="3" stroke="currentColor" strokeOpacity=".5" strokeWidth="1.2" />
          <rect x="3" y="3.5" width="16" height="6" rx="1.5" fill="currentColor" />
          <rect x="23.4" y="4.5" width="1.6" height="4" rx="1" fill="currentColor" fillOpacity=".5" />
        </svg>
      </span>
    </div>
  )
}

export function BackArrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M11.5 3.5 6 9l5.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function TopBar({ onBack, step, total }) {
  return (
    <div className="topbar">
      {onBack && (
        <button className="back-btn" onClick={onBack} aria-label="Back">
          <BackArrow />
        </button>
      )}
      {total > 0 && (
        <div className="progress" role="progressbar" aria-valuenow={step} aria-valuemax={total}>
          {Array.from({ length: total }).map((_, i) => (
            <i key={i} className={i < step ? 'on' : ''} />
          ))}
        </div>
      )}
    </div>
  )
}
