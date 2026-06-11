import { StatusBar, QuizChrome } from '../components/Shell.jsx'

// Figma 195:848 "22" — "Clarity is closer than it feels." Blue light rising
// from the right edge over the dark dawn base.
const BG = [
  'radial-gradient(440px 676px at 440px 478px, rgb(115,143,230) 0%, rgb(72,104,203) 20.7%, rgb(50,84,189) 31%, rgb(29,65,175) 41.3%, rgba(29,51,120,0.9) 70.7%, rgba(28,44,93,0.6) 85.3%, rgba(28,37,65,0) 100%)',
  'radial-gradient(956px at 220px 0px, rgb(74,37,69) 8.12%, rgb(49,38,78) 37.64%, rgb(24,39,88) 67.17%, rgb(37,55,111) 75.37%, rgb(50,71,135) 83.58%, rgb(77,103,183) 100%)',
].join(', ')

export default function Screen22({ next, back }) {
  return (
    <div className="fig" style={{ background: BG }}>
      <StatusBar />
      <QuizChrome back={back} progress={0.82} />
      <p className="abs serif" style={{ left: 78, top: 121, width: 283, fontSize: 46, lineHeight: '51px', textAlign: 'center', color: '#fff' }}>
        Clarity is closer than it feels.
      </p>
      <p className="abs" style={{ left: 94, top: 233, width: 251, fontSize: 22, lineHeight: '24px', textAlign: 'center', color: '#fff' }}>
        You just took the first real step toward it.
      </p>
      <p className="abs" style={{ left: 94, top: 750, width: 251, fontSize: 22, lineHeight: '24px', textAlign: 'center', color: '#fff' }}>
        You’re not overreacting. <b style={{ fontWeight: 800 }}>You’re being smart.</b>
      </p>
      <button className="pill" style={{ left: 129, top: 839, width: 182 }} onClick={next}>
        Let’s go!
      </button>
    </div>
  )
}
