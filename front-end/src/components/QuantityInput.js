export default function QuantityInput (props) {
  const { inventory, count, setCount, makeSureItsANumber } = props

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

  return (
    <div className="quantity">
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

    </div>
  )
}