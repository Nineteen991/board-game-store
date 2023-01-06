import { useContext } from 'react'

import { Context } from '../ContextData'

export default function Products() {
  const { apiData, setOpenModal } = useContext(Context)

  const productCards = apiData.map(product => (
    <div 
      className='product-card' 
      key={ product._id }
      onClick={ () => setOpenModal(product) }
    >
      <img 
        src={ product.primary_images.images[0] } 
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
  return productCards
}