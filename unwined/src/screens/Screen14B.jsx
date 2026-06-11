import Screen14Base from './Screen14Base.jsx'

// Figma 268:1268 "14-2" — after "Yes, successfully" on screen 13.
export default function Screen14B(props) {
  return (
    <Screen14Base
      {...props}
      headline="Great news!"
      body="You’re already on the right track!"
      lowerText="Only this time, you won’t be alone."
    />
  )
}
