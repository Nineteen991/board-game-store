import { useState, useEffect, memo } from 'react'

function Carousel ({ carouselArray, captions }) {
console.log(carouselArray)
  const [slideIndex, setSlideIndex] = useState(0)

  const renderSlides = carouselArray.map((slide, index) => (
    <div 
      className={ slideIndex === index ? 'slide visible' : 'slide' } 
      key={ index }
    >
      <div className='slide-container'>
        <img src={ slide } className='slide-img modal-img' alt="Store images" />
        {
          captions
            && <div className='slide-caption'>{ captions[index] }</div>
        }
      </div>
    </div>
  ))

  const renderDots = carouselArray.map((slide, index) => (
    <span
      className={ slideIndex === index ? 'dot dot-visible' : 'dot' }
      key={ index }
      onClick={ () => setSlideIndex(index) }
    ></span>
  ))

  useEffect(() => {
    const interval = setTimeout(() => {
      setSlideIndex(prev => (
        slideIndex === carouselArray.length - 1
          ? 0
          : prev + 1
      ))
    }, 5000)

    return () => clearTimeout(interval)
  }, [slideIndex])

  return (
    <div className='carousel'>
      { renderSlides }
      <div className='indicator-dots'>{ renderDots }</div>
    </div>
  )
}

export default memo(Carousel)