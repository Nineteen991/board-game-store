import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import { Fade } from 'react-awesome-reveal'

import Carousel from '../components/Carousel'
import { headerCarousel, captions } from '../util/heroData'
import Footer from '../components/Footer'
import storeFront from '../images/storefront.webp'

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(elements => {
      if (elements[0].isIntersecting) {
        setIsVisible(true)
        observer.unobserve(ref.current)
      }
    })

    observer.observe(ref.current)

    return () => observer.unobserve(ref.current)
  }, [])

  return (
    <div className='homepage'>

      <div className='carousel-div'>
        <Carousel carouselArray={ headerCarousel } captions={ captions } />

        <Link to='/shop' className='shop-link'>
          <button className='shop-btn'>Shop for Games</button>
        </Link>
      </div>

      <div className='about'>
      
        <div className='about-info-pic'>
            <div 
              className={`about-info ${ isVisible ? 'fade-left-1s' : '' }`} 
              ref={ ref }
            >
              <h1 className='about-title'>About Santa Cruz Games</h1>
              <p className='about-p'>
                Santa Cruz Games is a friendly local game store (FLGS) located 
                in Santa Cruz. We strive to provide the latest that the world of tabletop gaming has to offer by continually updating a vast 
                inventory of games to purchase and play, while also hosting a 
                weekly schedule of game nights for patrons to participate in.
              </p>
              <p className='about-p'>
                Discover titles created by local game designers, which are some 
                of the hidden gems offered in the store, or take home award-
                winning favorites to experience the phenomenon yourself. For an entirely different challenge, Santa Cruz Games stocks an 
                extensive selection of jigsaw and mechanical puzzles as well.
              </p>
            </div>
          
          <img 
            src={ storeFront } 
            className={`about-img ${ isVisible ? 'fade-left-1s active' : '' }`}
            ref={ ref }
            alt='Our Storefront' 
          />
        </div>

        <h1 
          className={`about-title reveal ${ isVisible ? 'fade-left-1-5s' : '' }`} 
          ref={ ref }
        >
          We look forward to seeing you!
        </h1>
        
      </div>

      <Footer />

    </div>
  )
}