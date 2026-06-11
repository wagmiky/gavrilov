import { useRef, useState } from 'react'
import { StatusBar, Logo } from '../components/Shell.jsx'

// Figma 114:1173 "39" — "Slide to commit". Dragging the knob to the end
// commits and advances.
const KNOB_MIN = 17
const KNOB_MAX = 364 - 85 - 17

export default function Screen39({ next }) {
  const [x, setX] = useState(KNOB_MIN)
  const drag = useRef(null)

  const onDown = (e) => {
    drag.current = { start: e.clientX, x }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onMove = (e) => {
    if (!drag.current) return
    const scale = e.currentTarget.closest('.canvas')?.getBoundingClientRect().width / 440 || 1
    setX(Math.max(KNOB_MIN, Math.min(KNOB_MAX, drag.current.x + (e.clientX - drag.current.start) / scale)))
  }
  const onUp = () => {
    if (!drag.current) return
    drag.current = null
    if (x >= KNOB_MAX - 4) next()
    else setX(KNOB_MIN)
  }

  return (
    <div className="fig quiz">
      <StatusBar />
      <Logo top={84} />
      <p className="abs serif" style={{ left: 30, top: 329, width: 331, fontSize: 46, lineHeight: 'normal', color: '#fff' }}>
        Let’s commit to changing your life for the better.
      </p>
      <div
        className="abs"
        style={{ left: 30, top: 578, width: 364, height: 118, borderRadius: 100, background: 'rgba(255,255,255,0.08)', border: '1px solid #fff', touchAction: 'none' }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <p
          className="med"
          style={{ position: 'absolute', left: 97, top: 42, width: 263, fontSize: 28, textAlign: 'center', color: '#fff', pointerEvents: 'none' }}
        >
          Slide to commit
        </p>
        <div
          style={{
            position: 'absolute',
            left: x,
            top: 16,
            width: 85,
            height: 85,
            borderRadius: 100,
            background: '#fff',
            cursor: 'grab',
            transition: drag.current ? 'none' : 'left 240ms cubic-bezier(0.22,1,0.36,1)',
          }}
        />
      </div>
    </div>
  )
}
