import Screen14Base from './Screen14Base.jsx'

// Figma 268:1544 "14-1" — after "Yes, unsucessfully" on screen 13.
export default function Screen14A(props) {
  return (
    <Screen14Base
      {...props}
      headline="That’s a good start!"
      body="You’re already on the right track!"
      lowerText="Only this time, you won’t be alone."
    />
  )
}
