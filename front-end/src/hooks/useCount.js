import { useState } from 'react'

export function useCount () {
  const [count, setCount] = useState(0)

  function makeSureItsANumber (e) {
    if (!(+e.target.value >= 0)) {
      setCount(0)
      return
    }
    setCount(+e.target.value)
  }

  return { count, setCount, makeSureItsANumber }
}