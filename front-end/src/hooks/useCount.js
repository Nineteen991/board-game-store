import { useState } from 'react'

export function useCount () {
  const [count, setCount] = useState(0)

  function makeSureItsANumber (e, inventory) {
    // make sure user can't input non numbers or negative numbers
    if (!(+e.target.value >= 0)) {
      setCount(0)
      return
    }
    // make sure user can't buy more than what's in stock
    else if (+e.target.value > inventory) {
      setCount(inventory)
      return
    }
    setCount(+e.target.value)
  }

  return { count, setCount, makeSureItsANumber }
}