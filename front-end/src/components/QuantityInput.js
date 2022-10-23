import { useContext } from 'react'

import { useCount } from '../hooks/useCount'
import { Context } from '../ContextData'

export default function QuantityInput ({ inventory, item }) {
  const { count, setCount, makeSureItsANumber } = useCount()
  const { setCart } = useContext(Context)

  function increaseQuantity () {
    // make sure you can't buy more than what's in stock
    if (count > inventory) {
      setCount(inventory)
    }
    else {
      setCount(prev => prev + 1)
    }
  }

  function decreaseQuantity () {
    if (count < 0) {
      setCount(0)
    }
    else if (count > 0) {
      setCount(prev => prev - 1)
    }
  }

  const order = { 
    ...item, 
    onOrder: count
  }

  function addToCart () {
    setCart(prev => [...prev, order])
  }

  return (
    <div className="quantity">
      <p className="quantity-p in-stock">{ inventory } in Stock</p>
      <p className="quantity-p">Quantity:</p>

      <button 
        className="quantity-btns"
        onClick={ decreaseQuantity }
        disabled={ count === 0 }
      >
        -
      </button>

      <input 
        className="quantity-input" 
        value={ count }
        onChange={ e => makeSureItsANumber(e, inventory) }
      />
      
      <button 
        className="quantity-btns"
        onClick={ increaseQuantity }
        disabled={ count === inventory }
      >
        +
      </button>

      <button className='add-to-cart' onClick={ addToCart }>Add to cart</button>

    </div>
  )
}