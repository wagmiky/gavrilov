import { useRef, useState } from 'react'
import { StatusBar, QuizChrome, Pill } from '../components/Shell.jsx'

// Figma 115:1680 "17" + 113:505 "18" — weekly alcohol spend, chosen by
// rotating a wheel. Frame 18 is the selected state of the same screen
// (annual total + "≈ a gym membership" + white Next), merged here.
// The wheel is an 806px circle centered below the screen (220, 963); ticks
// every $5 (7.2°), labels every $10. Drag horizontally to rotate.
const DEG_PER_5 = 7.2
const MAX = 200

// Only the 20$ → gym membership pairing is specified in the frames; the
// other tiers follow the same spirit.
const COMPARISONS = [
  [15, 'A streaming bundle', '📺'],
  [35, 'A gym membership', '🏋️‍♂️'],
  [70, 'A dinner for two', '🍝'],
  [120, 'A weekend road trip', '🚗'],
  [Infinity, 'A flight ticket', '✈️'],
]

export default function Screen17({ next, back, answers, setAnswer }) {
  const [value, setValue] = useState(0)
  const [rot, setRot] = useState(0)
  const drag = useRef(null)

  const commit = (deg, snap) => {
    let v = Math.max(0, Math.min(MAX, (-deg / DEG_PER_5) * 5))
    if (snap) v = Math.round(v / 5) * 5
    const d = (-v / 5) * DEG_PER_5
    setRot(snap ? d : Math.max((-MAX / 5) * DEG_PER_5, Math.min(0, deg)))
    setValue(Math.round(v / 5) * 5)
    setAnswer('q17', Math.round(v / 5) * 5)
  }

  const onDown = (e) => {
    drag.current = { x: e.clientX, rot }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onMove = (e) => {
    if (!drag.current) return
    const scale = e.currentTarget.closest('.canvas')?.getBoundingClientRect().width / 440 || 1
    commit(drag.current.rot + ((e.clientX - drag.current.x) / scale) * 0.25, false)
  }
  const onUp = () => {
    if (!drag.current) return
    drag.current = null
    commit(rot, true)
  }

  const ticks = []
  for (let v = 0; v <= MAX; v += 5) {
    const a = ((v / 5) * DEG_PER_5 * Math.PI) / 180
    const major = v % 10 === 0
    const r = 403
    const cx = 403 + (r - 10) * Math.sin(a)
    const cy = 403 - (r - 10) * Math.cos(a)
    ticks.push(
      <span
        key={v}
        style={{
          position: 'absolute',
          left: cx - (major ? 3 : 2),
          top: cy - (major ? 3 : 2),
          width: major ? 6 : 4,
          height: major ? 6 : 4,
          borderRadius: '50%',
          background: major ? '#fff' : 'rgba(255,255,255,0.5)',
        }}
      />,
    )
    if (major) {
      ticks.push(
        <span
          key={`l${v}`}
          style={{
            position: 'absolute',
            left: 403 + (r - 38) * Math.sin(a) - 30,
            top: 403 - (r - 38) * Math.cos(a) - 12,
            width: 60,
            textAlign: 'center',
            fontSize: 18,
            color: '#fff',
            transform: `rotate(${(v / 5) * DEG_PER_5}deg)`,
          }}
        >
          {v}$
        </span>,
      )
    }
  }

  return (
    <div className="fig quiz">
      <StatusBar />
      <QuizChrome back={back} progress={0.65} />
      <p className="abs serif" style={{ left: 0, right: 0, top: 121, textAlign: 'center', fontSize: 46, color: '#fff' }}>
        Question 13
      </p>
      <p className="abs" style={{ left: 31, top: 195, fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>
        {(answers.name || 'Name').trim()}, spill some tea.
      </p>
      <p className="abs" style={{ left: 31, top: 216, width: 325, fontSize: 28, lineHeight: '31px', color: '#fff' }}>
        How much money do you spend on alcohol weekly?
      </p>
      <p className="abs serif" style={{ left: 0, right: 0, top: 391, textAlign: 'center', fontSize: 80, color: '#fff' }}>
        {value}$
      </p>
      {value > 0 && (
        <p className="abs" style={{ left: 0, right: 0, top: 480, textAlign: 'center', fontSize: 22, color: 'rgba(255,255,255,0.5)' }}>
          or {value * 52}$ a year.
        </p>
      )}

      {/* the wheel */}
      <div
        className="abs"
        style={{ left: 0, top: 540, width: 440, height: 416, touchAction: 'none', cursor: 'grab', overflow: 'hidden' }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <div
          style={{
            position: 'absolute',
            left: -184,
            top: 20,
            width: 806,
            height: 806,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.2)',
            transform: `rotate(${rot}deg)`,
          }}
        >
          {ticks}
        </div>
        {/* fixed indicator at the top of the wheel */}
        <span
          style={{
            position: 'absolute',
            left: 212,
            top: 27,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.35)',
            boxShadow: '0 0 12px rgba(255,255,255,0.8)',
          }}
        />
        <span style={{ position: 'absolute', left: 217, top: 32, width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
      </div>

      {value > 0 ? (
        <>
          <p className="abs med" style={{ left: 108, top: 716, width: 224, fontSize: 22, textAlign: 'center', color: '#fff', pointerEvents: 'none' }}>
            <span style={{ fontWeight: 300 }}>≈</span> {COMPARISONS.find(([max]) => value <= max)[1]}
          </p>
          <p className="abs" style={{ left: 0, right: 0, top: 744, textAlign: 'center', fontSize: 50, pointerEvents: 'none' }}>
            {COMPARISONS.find(([max]) => value <= max)[2]}
          </p>
          <Pill x={129} y={839} label="Next" onClick={next} />
        </>
      ) : (
        <>
          <p className="abs med" style={{ left: 98, top: 715, width: 243, fontSize: 22, lineHeight: '24px', textAlign: 'center', color: '#fff', pointerEvents: 'none' }}>
            Rotate the wheel to choose your spending.
          </p>
          <Pill x={129} y={839} label="Next" glass onClick={next} style={{ fontWeight: 400 }} />
        </>
      )}
    </div>
  )
}
