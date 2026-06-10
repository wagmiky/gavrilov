import { useEffect } from 'react'
import { StatusBar } from '../components/Shell.jsx'

// Figma 24:3 "1" — splash. White screen; the note specifies the app logo
// with a short animation, then straight into the welcome screen.
export default function Screen01({ next }) {
  useEffect(() => {
    const t = setTimeout(next, 1600)
    return () => clearTimeout(t)
  }, [next])

  return (
    <div className="fig white">
      <StatusBar dark />
      <p
        className="abs serif"
        style={{
          top: 430,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 52,
          color: '#000',
          animation: 'fig-in 900ms cubic-bezier(0.22,1,0.36,1) both',
        }}
      >
        UnWined
      </p>
    </div>
  )
}
