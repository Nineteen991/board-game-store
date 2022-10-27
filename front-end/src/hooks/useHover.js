import { useState, useEffect, useRef } from 'react'

export default function useHover () {
  const [hover, setHover] = useState(false)
  const ref = useRef(null)

  function toggleHover () {
    setHover(prev => !prev)
  }

  useEffect(() => {
    const refCurrent = ref.current

    refCurrent.addEventListener('mouseenter', toggleHover)
    refCurrent.addEventListener('mouseleave', toggleHover)

    return () => {
      refCurrent.removeEventListener('mouseenter', toggleHover)
      refCurrent.removeEventListener('mouseleave', toggleHover)
    }
  }, [])

  return [hover, ref]
}