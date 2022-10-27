import { useContext } from "react"

import { Context } from '../ContextData'
import CartItem from "../components/CartItem"
import { formatPrice } from "../util/formatPrice"

export default function Cart () {
  const { cart, setCart } = useContext(Context)
  const totals = []

  const cartItemElements = cart.map(item => {
    const total = item.price * item.onOrder
    totals.push(total)

    return <CartItem key={ item._id } item={ item } />
  })

  const subtotal = totals.reduce((x, y) => x + y, 0)
  const tax = subtotal * .0925
  const total = subtotal + tax

  return (
    <div className="cart">
      <h1 className="cart-title">Place an Order</h1>
      {
        cart.length > 0
          && (
            <>
              { cartItemElements }
              <div className="totals-container">
                <div className="totals-div">
                  <p className="totals">Subtotal:</p>
                  <p className="totals">{ formatPrice(subtotal) }</p>
                </div>
                <div className="totals-div">
                  <p className="totals">Tax:</p>
                  <p className="totals">{ formatPrice(tax) }</p>
                </div>
                <div className="totals-div">
                  <p className="totals">Total:</p>
                  <p className="totals">{ formatPrice(total) }</p>
                </div>
              </div>

              <button 
                className="place-order-btn"
              >
                Place Order
              </button>
            </>
          )
      }
    </div>
  )
}