import { useState } from 'react'

export function useIsVisible() {
  const [isVisible, setIsVisible] = useState(false)

  return ({ isVisible, setIsVisible })
}