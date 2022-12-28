import { useContext } from "react";

import useHover from '../hooks/useHover'
import { Context } from '../ContextData'
import { formatPrice } from '../util/formatPrice'

export default function CartItem ({ item, index }) {
  const [hover, ref] = useHover()
  const { removeFromCart } = useContext(Context)

  const iconClassName = hover ? 'fill' : 'line'
  const total = item.price * item.onOrder

  return (
    <div className="cart-item">
      <i 
        className={`ri-delete-bin-${ iconClassName }`}
        onClick={ () => removeFromCart(index) }
        ref={ ref }
      ></i>
      <img 
        src={ item.primary_images.images[0] } 
        className='cart-img' 
        alt={ item.name } 
      />
      <p className="cart-item-price">{ formatPrice(item.price) }</p>
      <p className="cart-item-price">{ item.onOrder }</p>
      <p className="cart-item-price">{ formatPrice(total) }</p>
    </div>
  )
}