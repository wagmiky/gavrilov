import { StatusBar, Logo } from '../components/Shell.jsx'

// Figma 264:949 "32" is a designer placeholder ("какой-то соединяющий
// экран" — "some connecting screen"). Copy taken from the approved
// onboarding copy flow (frame 32: the science connector), set in the
// system's visual language.
export default function Screen32({ next }) {
  return (
    <div className="fig side">
      <StatusBar />
      <Logo />
      <p
        className="abs"
        style={{ left: 55, top: 330, width: 330, fontSize: 18, letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}
      >
        The part that makes it stick
      </p>
      <p className="abs serif" style={{ left: 40, top: 366, width: 360, fontSize: 46, lineHeight: '51px', textAlign: 'center', color: '#fff' }}>
        This isn’t motivation. It’s science.
      </p>
      <p className="abs" style={{ left: 70, top: 490, width: 300, fontSize: 22, lineHeight: '26px', textAlign: 'center', color: 'rgba(255,255,255,0.72)' }}>
        Everything you just saw works because it’s built on how habits actually break. Here’s the proof.
      </p>
      <button className="pill" style={{ left: 95, top: 839, width: 250 }} onClick={next}>
        Show me the proof
      </button>
    </div>
  )
}
