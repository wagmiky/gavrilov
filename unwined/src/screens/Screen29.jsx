import { StatusBar, Logo, Pill } from '../components/Shell.jsx'
import bottleGreen from '../assets/s29-bottle-green.png'
import bottleBlue from '../assets/s29-bottle-blue.png'

// Figma 217:943 "29" — friends & accountability: four friend pills crossing
// like an asterisk behind a glowing bottle, plus the "You & Bradley" duo pill.
function FriendPill({ rotate, name, days }) {
  return (
    <div
      className="abs"
      style={{
        left: 20,
        top: 384,
        width: 400,
        height: 58,
        borderRadius: 50,
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.25)',
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <span style={{ position: 'absolute', left: 36, top: 16, fontSize: 22, fontWeight: 600, color: '#fff' }}>{name}</span>
      <span style={{ position: 'absolute', right: 90, top: 4, fontSize: 40, color: '#fff' }}>{days}</span>
      <img
        src={bottleGreen}
        alt=""
        style={{ position: 'absolute', right: 52, top: 10, width: 25, height: 37, objectFit: 'cover', filter: 'drop-shadow(0 0 12px #d8ff96)' }}
      />
    </div>
  )
}

export default function Screen29({ next }) {
  return (
    <div className="fig side">
      <StatusBar />
      <Logo />
      <p className="abs" style={{ left: 30, top: 149, width: 380, fontSize: 32, lineHeight: 'normal', color: '#fff' }}>
        Add friends for accountability without the awkward conversations.
      </p>

      <FriendPill rotate={30} name="Anton" days={72} />
      <FriendPill rotate={-30} name="Mike" days={94} />
      <FriendPill rotate={-10} name="Xenia" days={27} />
      <FriendPill rotate={10} name="Arthur" days={14} />
      <img
        src={bottleGreen}
        alt=""
        className="abs"
        style={{ left: 153, top: 314, width: 133, height: 196, objectFit: 'cover', filter: 'drop-shadow(0 0 70px rgba(216,255,150,0.5))' }}
      />

      <p className="abs serif" style={{ left: 30, top: 516, width: 380, fontSize: 32, lineHeight: '35px', textAlign: 'center', color: '#fff' }}>
        Compete with all your friends.
      </p>
      <p className="abs" style={{ left: 30, top: 603, width: 380, fontSize: 32, lineHeight: 'normal', color: '#fff' }}>
        When someone drinks, you both lose the streak.
      </p>

      {/* you & a friend */}
      <div
        className="abs"
        style={{ left: 30, top: 716, width: 380, height: 58, borderRadius: 50, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.25)' }}
      />
      <p className="abs" style={{ left: 61, top: 734, fontSize: 22, fontWeight: 600, color: '#fff' }}>
        You &amp; Bradley
      </p>
      <p className="abs" style={{ left: 213, top: 721, width: 91, fontSize: 40, textAlign: 'right', color: '#fff' }}>
        0
      </p>
      <img
        src={bottleBlue}
        alt=""
        className="abs"
        style={{ left: 314, top: 695, width: 70, height: 101, objectFit: 'cover', filter: 'drop-shadow(0 4px 23px #35aae8)' }}
      />

      <p className="abs" style={{ left: 73, top: 806, width: 293, fontSize: 18, lineHeight: '24px', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
        No personal info is needed.
      </p>

      <Pill x={129} y={839} label="Next" onClick={next} />
    </div>
  )
}
