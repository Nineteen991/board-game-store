import { useRef, useEffect } from 'react'

import { useIsVisible } from '../hooks/useIsVisible'

export default function Footer () {
  const { isVisible, setIsVisible } = useIsVisible()
  const ref = useRef(null)

  useEffect(() => {
    const current = ref.current
    const observer = new IntersectionObserver(elements => {
      if(elements[0]) {
        setIsVisible(true)
        observer.unobserve(current)
      }
    })

    observer.observe(current)

    return () => observer.unobserve(current)
  }, [])

  return (
    <div className="footer">

      <div 
        className={`footer-divs ${isVisible ? 'fade-left-1s active' : ''}`}
        ref={ ref }
      >
        <h3 className="footer-titles">Hours</h3>
        <p className="footer-p">Sunday - Thursday 11am - 7pm</p>
        <p className="footer-p">Friday & Saturday 11am - 11pm</p>
      </div>

      <div 
        className={`footer-divs ${isVisible ? 'fade-left-1-5s active' : ''}`}
      >
        <h3 className="footer-titles">Address</h3>
        <p className="footer-p">123 Pacific Ave</p>
        <p className="footer-p">Santa Cruz, CA 95060</p>
      </div>

      <div className={`footer-divs ${isVisible ? 'fade-left-2s active' : ''}`}>
        <h3 className="footer-titles">Call or Email us</h3>
        <p className="footer-p">831-123-4567</p>
        <p className="footer-p">info@SantaCruzGames.com</p>
      </div>

    </div>
  )
}