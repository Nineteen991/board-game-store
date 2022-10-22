import { useContext, useState } from 'react'

import { Context } from '../ContextApiData'
import GameModal from '../components/GameModal'

export default function Store () {
  const { apiData, setOpenModal } = useContext(Context)

  const productCards = apiData.map(product => (
    <div 
      className='product-card' 
      key={ product._id }
      // onClick send product info to the modal
      onClick={ () => setOpenModal(product) }
    >
      <img 
        src={ product.image } 
        className='product-img' 
        alt={ product.name }
        loading='lazy'
      />
      <div className='product-info'>
        <div className='product-header'>
          <h3 className='product-name'>{ product.name }</h3>
          <p className='product-price'>
            { product.price.toLocaleString(
              "en-US", {style: "currency", currency: "USD"}
            ) }
          </p>
        </div>
        <p className='product-desc'>{ product.description }</p>
      </div>
    </div>
  ))

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
        <div className='products'>
          { productCards }
        </div>
      </div>
    </>
  )
}