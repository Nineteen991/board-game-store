import { useState, useEffect } from 'react'

import gameImage from '../images/BoardGame3.webp'
import tablesImage from '../images/dice-house-games-2.webp'
import playerImage from '../images/Ganymede.webp'
import vintageImage from '../images/vintage.webp'

export default function Carousel () {
  const headerCarousel = [
    {
      image: gameImage,
      caption: 'Your Gaming Headquarters'
    },
    {
      image: vintageImage,
      caption: 'Est 1950'
    },
    {
      image: playerImage,
      caption: 'Play a Game or Two'
    },
    {
      image: tablesImage,
      caption: 'Plenty of space for multiple games'
    }
  ]

  const [slideIndex, setSlideIndex] = useState(0)

  const renderSlides = headerCarousel.map((slide, index) => (
    <div 
      className={ slideIndex === index ? 'slide visible' : 'slide' } 
      key={ index }
    >
      <div className='slide-container'>
        <img src={ slide.image } className='slide-img' alt="Store images" />
        <div className='slide-caption'>{ slide.caption }</div>
      </div>
    </div>
  ))

  const renderDots = headerCarousel.map((slide, index) => (
    <span
      className={ slideIndex === index ? 'dot dot-visible' : 'dot' }
      key={ index }
      onClick={ () => setSlideIndex(index) }
    ></span>
  ))

  useEffect(() => {
    const interval = setTimeout(() => {
      setSlideIndex(prev => (
        slideIndex === headerCarousel.length - 1
          ? 0
          : prev + 1
      ))
    }, 3000)

    return () => clearTimeout(interval)
  }, [slideIndex])

  return (
    <div className='carousel'>
      { renderSlides }
      <div className='indicator-dots'>{ renderDots }</div>
    </div>
  )
}