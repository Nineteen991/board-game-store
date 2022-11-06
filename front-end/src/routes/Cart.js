import { useContext, useState } from "react"
import { Link } from 'react-router-dom'

import { Context } from '../ContextData'
import CartItem from "../components/CartItem"
import { formatPrice } from "../util/formatPrice"
import CustomerInfo from "../components/CustomerInfo"
import Checkout from '../components/Checkout'

export default function Cart ({ customer, checkoutForm }) {
  const [toggleStripe, setToggleStripe] = useState(false)
  const { cart } = useContext(Context)
  const totals = []

  const cartItemElements = cart.map(item => {
    const total = item.price * item.onOrder
    totals.push(total)

    return <CartItem key={ item._id } item={ item } />
  })

  const subtotal = totals.reduce((x, y) => x + y, 0)
  const tax = subtotal * .0925
  const total = subtotal + tax
console.log(cart)
  return (
    <div className="cart">
      <h1 className="cart-title">Place an Order</h1>
      {
        cart.length > 0
          ? (
            <div className="cart-contents">
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
                
            </div>
          )
        : <Link to='/shop' className="buy-stuff">
            <button 
              className="buy-stuff-btn"
            >
              Buy some Stuff
            </button>
          </Link>
      }

      <CustomerInfo 
        customer={customer} 
        checkoutForm={checkoutForm}
        setToggleStripe={setToggleStripe}
      />

      {
        toggleStripe && cart.length > 0
          ? <Checkout customer={customer}/>
          : null
      }

    </div>
  )
}