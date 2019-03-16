import { useState } from 'react'

const useToggle = (state = false) => {
  const [toggleState, setToggleState] = useState(state)
  const flipToggle = () => setToggleState(!toggleState)
  return [toggleState, flipToggle]
}

export default useToggle
