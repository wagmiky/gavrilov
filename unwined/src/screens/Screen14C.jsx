import Screen14Base from './Screen14Base.jsx'

// Figma 268:1382 "14-3" — after "No" on screen 13.
// ("joourney" kept exactly as written in the frame.)
export default function Screen14C(props) {
  return (
    <Screen14Base
      {...props}
      headline="Great news!"
      body="UnWined is the best place to start your sobriety joourney."
      lowerText="And you won’t be alone."
    />
  )
}
