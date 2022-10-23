import { useContext } from 'react'

import { Context } from '../ContextData'
import QuantityInput from './QuantityInput'

export default function GameModal () {
  const { openModal, setOpenModal } = useContext(Context)

  function renderSecondaryDetails () {
    const details = openModal.secondary_images.images.map((image, index) => (
      <div className={`modal-details-${ image.css_property }`} key={ index }>
        <img 
          src={ image.url } 
          className='modal-details-img' 
          alt='' 
        />
        <p className='modal-details-desc'>{ image.text }</p>
      </div>
    ))
    return details
  }

  function renderPrimaryDetails () {
    const details = openModal.detailed_desc.details.map(
      (detail, index) => (
        <p className='modal-desc-bullets' key={ index }>{ detail }</p>
      )
    )
    return details
  }

  return (
    openModal
      ? (
          <div className='modal'>
            
            <div 
              className='modal-shadow' 
              onClick={ () => setOpenModal(null) }>
            </div>

            <div className='modal-product'>
              <div className='modal-header'>
                <img 
                  className='modal-img'
                  src={ openModal.primary_images.images[0] } 
                  alt={ openModal.name } 
                />
                <div className='modal-desc'>
                  { renderPrimaryDetails() }
                  <QuantityInput 
                    inventory={ openModal.inventory } 
                    item={ openModal }
                  />
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