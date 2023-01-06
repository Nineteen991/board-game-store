import { useRef, useEffect } from 'react'

import Products from '../components/Products'
import GameModal from '../components/GameModal'
import Footer from '../components/Footer'
import { useIsVisible } from '../hooks/useIsVisible'

export default function Store () {
  
  const { isVisible, setIsVisible } = useIsVisible()
  const ref = useRef(null)

  useEffect(() => {
    const current = ref.current
    const observer = new IntersectionObserver(elements => {
      if(elements[0].isIntersecting) {
        setIsVisible(true)
        observer.unobserve(current)
      }
    })
    observer.observe(current)

    return () => observer.unobserve(current)
  }, [])

  return (
    <>
      {/* if there is product info in the modal, open the modal */}
      <GameModal />
    
      {/* else just view the store */}
      <div className='store'>
        <h1 className='store-tagline'>Browse our Game selection</h1>
        <h2 className='store-tagline-2'>
          Don't see the game you want, we'll get it for you
        </h2>
        <div 
          className={`products ${isVisible ? 'fade-left-1s active' : ''}`} 
          ref={ ref }
        >
          <Products />
        </div>
        <Footer />
      </div>
    </>
  )
}