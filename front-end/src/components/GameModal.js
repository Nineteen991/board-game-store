import { useContext } from 'react'

import { Context } from '../ContextData'
import QuantityInput from './QuantityInput'
import Carousel from './Carousel'
import { useCount } from '../hooks/useCount'
import { useAddedToCart } from '../hooks/useAddedToCart'

export default function GameModal() {
  const { openModal, setOpenModal, setCart } = useContext(Context)
  const { count, setCount, makeSureItsANumber } = useCount()
  const { added, setAdded } = useAddedToCart()

  function renderPrimaryDetails() {
    const details = openModal.detailed_desc.details.map(
      (detail, index) => (
        <p className='modal-desc-bullets' key={index}>{detail}</p>
      )
    )
    return details
  }

  function renderSecondaryDetails() {
    const details = openModal.secondary_images.images.map((image, index) => {
      const fillDiv = image.text ? '' : 'fill-height'

      return (
        <div className={`modal-details-${image.css_property}`} key={index}>
          <img
            src={image.url}
            className={`modal-details-img ${ fillDiv }`}
            alt=''
          />
          {
            image.text
              ? <p className='modal-details-desc'>{ image.text }</p>
              : null
          }
        </div>
      )
    })
    return details
  }

  const order = { 
    ...openModal, 
    onOrder: count
  }

  function addToCart () {
    setAdded('Yay! In cart')
    setCart(prev => [...prev, order])
  }

  function nixModelResetCount() {
    setCount(0)
    setAdded('Add to cart')
    setOpenModal(null)
  }

  return (
    openModal
      ? (
        <div className='modal'>

          <div
            className='modal-shadow'
            onClick={ nixModelResetCount }>
          </div>

          <div className='modal-product'>

            <div className='modal-header'>
              {
                openModal.primary_images.images
                  ? <div className='modal-carousel'>
                      <Carousel 
                        carouselArray={openModal.primary_images.images} className="modal-img"
                      />
                    </div>
                  : null
              }
              <div className='modal-desc'>
                {renderPrimaryDetails()}

                <div className='inventory-cart'>
                  <p className="in-stock">
                    {
                      openModal.inventory
                        ? `${openModal.inventory} in Stock`
                        : 'Sold Out'
                    }
                  </p>
                  <QuantityInput
                    inventory={ openModal.inventory }
                    item={ openModal }
                    count={ count }
                    setCount={ setCount }
                    makeSureItsANumber={ makeSureItsANumber }
                  />
                  <p style={{color: '#f12711'}}>${openModal.price} each</p>
                  <button 
                    className='add-to-cart'
                    onClick={ addToCart }
                    disabled={ count === 0 }
                    style={ count === 0 ? { opacity: .5 } : {} }
                  >
                    { added }
                  </button>
                </div>

              </div>
            </div>

            <div className='modal-details'>
              { renderSecondaryDetails() }
            </div>

          </div>

        </div>
      )
      : null
  )
}