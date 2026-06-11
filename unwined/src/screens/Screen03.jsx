import { StatusBar, Pill } from '../components/Shell.jsx'

// Figma 251:901 "3" — "To begin with," name + age inputs.
function Chrome({ back }) {
  return (
    <>
      <button className="abs" style={{ left: 31, top: 77, width: 20, height: 16 }} onClick={back} aria-label="back">
        <svg width="20" height="15" viewBox="0 0 20 15" fill="none" style={{ display: 'block' }}>
          <path d="M19 7.5H1m0 0L7.5 1M1 7.5 7.5 14" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="abs" style={{ left: 67, top: 83, width: 272, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.2)' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: 6, height: 6, borderRadius: 3, background: '#fff' }} />
      </div>
      <div className="abs" style={{ left: 355, top: 75, width: 55, height: 22, borderRadius: 20, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.25)' }} />
      <p className="abs" style={{ left: 370.5, top: 77, fontSize: 18, color: '#fff', transform: 'translateX(-50%)' }}>🇺🇸</p>
      <p className="abs" style={{ left: 392, top: 78, width: 36, fontSize: 14, color: '#fff', textAlign: 'center', transform: 'translateX(-50%)' }}>EN</p>
    </>
  )
}

const inputStyle = {
  left: 31,
  width: 379,
  height: 58,
  borderRadius: 50,
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.25)',
  padding: '0 26px',
  fontSize: 22,
  color: '#fff',
  outline: 'none',
}

export default function Screen03({ next, back, answers, setAnswer }) {
  return (
    <div className="fig">
      <style>{'.s03-input::placeholder{color:rgba(255,255,255,0.25)}'}</style>
      <StatusBar />
      <Chrome back={back} />
      <p className="abs serif" style={{ left: 116, top: 121, fontSize: 46, color: '#fff', whiteSpace: 'nowrap' }}>
        To begin with,
      </p>
      <p className="abs" style={{ left: 31, top: 216, width: 325, fontSize: 32, lineHeight: '35px', color: '#fff' }}>
        Tell us a little bit more about you.
      </p>
      <input
        className="abs s03-input"
        style={{ ...inputStyle, top: 318 }}
        placeholder="Your name"
        value={answers?.name ?? ''}
        onChange={(e) => setAnswer('name', e.target.value)}
      />
      <input
        className="abs s03-input"
        style={{ ...inputStyle, top: 396 }}
        placeholder="Age"
        inputMode="numeric"
        value={answers?.age ?? ''}
        onChange={(e) => setAnswer('age', e.target.value.replace(/[^0-9]/g, ''))}
      />
      <div className="abs" style={{ left: 31, top: 658, width: 379, height: 156, borderRadius: 25, border: '1px solid rgba(255,255,255,0.25)' }} />
      <div className="abs" style={{ left: 57, top: 673, width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.5)' }} />
      <p className="abs" style={{ left: 66.5, top: 674, fontSize: 14, color: '#2d2650', textAlign: 'center', transform: 'translateX(-50%)', fontFamily: '"IBM Plex Mono", monospace' }}>
        i
      </p>
      <p className="abs" style={{ left: 84, top: 672, width: 310, fontSize: 18, lineHeight: 'normal', color: 'rgba(255,255,255,0.5)' }}>
        People of different ages have different motives for drinking alcohol, experiences of consuming it and, thus, require different treatment strategies. Knowing your age helps us determine the best possible plan for you.
      </p>
      <Pill glass x={129} y={839} label="Next" onClick={next} />
    </div>
  )
}
