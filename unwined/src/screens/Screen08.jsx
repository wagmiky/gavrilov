import { useState } from 'react'
import { StatusBar, Pill } from '../components/Shell.jsx'

// Figma 112:1306 "8" — Question S: when do you typically drink (multi-select).
const OPTIONS = [
  { slug: 'in-the-evenings', label: 'In the evenings', top: 338, cb: 51, lx: 85 },
  { slug: 'during-social-events', label: 'During social events', top: 416, cb: 51, lx: 85 },
  { slug: 'late-at-night-to-help-fall-asleep', label: 'Late at night to help fall asleep', top: 494, cb: 51, lx: 84 },
  { slug: 'with-meals', label: 'With meals', top: 572, cb: 50, lx: 84 },
  { slug: 'to-get-rid-of-sadness', label: 'To get rid of sadness', top: 650, cb: 50, lx: 84 },
  { slug: 'other-no-specific-time', label: 'Other / no specific time', top: 728, cb: 50, lx: 84 },
]

function Header({ back }) {
  return (
    <>
      <button className="abs" onClick={back} aria-label="back" style={{ left: 31, top: 77.64, width: 21, height: 15 }}>
        <svg width="21" height="14.73" viewBox="0 0 21 14.7279" fill="none" style={{ display: 'block', transform: 'rotate(180deg)' }}>
          <path d="M20.7071 8.07107C21.0976 7.68054 21.0976 7.04738 20.7071 6.65685L14.3431 0.292893C13.9526 -0.097631 13.3195 -0.097631 12.9289 0.292893C12.5384 0.683418 12.5384 1.31658 12.9289 1.70711L18.5858 7.36396L12.9289 13.0208C12.5384 13.4113 12.5384 14.0445 12.9289 14.435C13.3195 14.8256 13.9526 14.8256 14.3431 14.435L20.7071 8.07107ZM0 7.36396V8.36396H20V7.36396V6.36396H0V7.36396Z" fill="#fff" />
        </svg>
      </button>
      {/* iOS progress bar, value 0% (instance 51,63 / 304×44; track inset 16) */}
      <div className="abs" style={{ left: 67, top: 83, width: 272, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.2)' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: 6, height: 6, borderRadius: 3, background: '#fff' }} />
      </div>
      {/* language pill */}
      <div className="abs" style={{ left: 355, top: 75, width: 55, height: 22, borderRadius: 20, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.25)' }} />
      <p className="abs" style={{ left: 362, top: 77, width: 17, fontSize: 18, textAlign: 'center', color: '#fff' }}>🇺🇸</p>
      <p className="abs" style={{ left: 374, top: 78, width: 36, fontSize: 14, textAlign: 'center', color: '#fff' }}>EN</p>
    </>
  )
}

function Option({ o, on, onClick }) {
  return (
    <button
      className="abs"
      onClick={onClick}
      style={{
        left: 30,
        top: o.top,
        width: 380,
        height: 58,
        borderRadius: 50,
        background: on ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.08)',
        border: `1px solid rgba(255,255,255,${on ? 0.6 : 0.25})`,
        transition: 'background 160ms, border-color 160ms',
      }}
    >
      <span
        style={{
          position: 'absolute',
          left: o.cb - 30,
          top: 19,
          width: 20,
          height: 20,
          borderRadius: 7,
          background: on ? '#fff' : 'rgba(255,255,255,0.2)',
          border: '1px solid rgba(255,255,255,0.25)',
          transition: 'background 160ms',
        }}
      >
        {on && (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" style={{ position: 'absolute', left: 3, top: 4 }}>
            <path d="M1 5.2 4.4 8.5 11 1.5" stroke="#232323" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span
        style={{
          position: 'absolute',
          left: o.lx - 30,
          top: 29,
          transform: 'translateY(-50%)',
          fontSize: 22,
          color: '#fff',
          whiteSpace: 'nowrap',
        }}
      >
        {o.label}
      </span>
    </button>
  )
}

export default function Screen08({ next, back, setAnswer }) {
  const [picked, setPicked] = useState([])

  const toggle = (slug) => {
    const arr = picked.includes(slug) ? picked.filter((s) => s !== slug) : [...picked, slug]
    setPicked(arr)
    setAnswer('q08', arr)
  }

  return (
    <div className="fig">
      <StatusBar />
      <Header back={back} />
      <p className="abs serif" style={{ left: 135, top: 121, fontSize: 46, color: '#fff', whiteSpace: 'nowrap' }}>
        Question S
      </p>
      <p className="abs" style={{ left: 31, top: 216, width: 325, fontSize: 28, lineHeight: '31px', color: '#fff' }}>
        When do you typically drink alcohol?
      </p>
      <p className="abs" style={{ left: 31, top: 278, width: 325, fontSize: 18, lineHeight: '35px', color: 'rgba(255,255,255,0.5)' }}>
        Select all that apply.
      </p>
      {OPTIONS.map((o) => (
        <Option key={o.slug} o={o} on={picked.includes(o.slug)} onClick={() => toggle(o.slug)} />
      ))}
      <Pill glass x={129} y={839} label="Next" onClick={next} />
    </div>
  )
}
