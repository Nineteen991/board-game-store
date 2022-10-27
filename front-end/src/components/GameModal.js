import { useContext } from 'react'

import { Context } from '../ContextData'
import QuantityInput from './QuantityInput'
import Carousel from './Carousel'

export default function GameModal() {
  const { openModal, setOpenModal } = useContext(Context)

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
              && <p className='modal-details-desc'>{ image.text }</p>
          }
        </div>
      )
    })
    return details
  }

  return (
    openModal
      ? (
        <div className='modal'>

          <div
            className='modal-shadow'
            onClick={() => setOpenModal(null)}>
          </div>

          <div className='modal-product'>

            <div className='modal-header'>
              {
                openModal.primary_images.images
                && <Carousel carouselArray={openModal.primary_images.images} />
              }
              <div className='modal-desc'>
                {renderPrimaryDetails()}
                <QuantityInput
                  inventory={openModal.inventory}
                  item={openModal}
                />
              </div>
            </div>

            <div className='modal-details'>
              {renderSecondaryDetails()}
            </div>

          </div>

        </div>
      )
      : null
  )
}