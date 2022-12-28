import { useContext, useState } from "react"
import { Link } from 'react-router-dom'

import { Context } from '../ContextData'
import CartItem from "../components/CartItem"
import { formatPrice } from "../util/formatPrice"
import CustomerInfo from "../components/CustomerInfo"
import Checkout from '../components/Checkout'
import useCustomer from '../hooks/useCustomer'

export default function Cart () {
  const [toggleStripe, setToggleStripe] = useState(false)
  const [storePickup, setStorePickup] = useState(true)
  const { cart } = useContext(Context)
  const { customer, checkoutForm } = useCustomer()
  const totals = []

  const cartItemElements = cart.map((item, index) => {
    const total = item.price * item.onOrder
    totals.push(total)

    return <CartItem key={ index } item={ item } index={ index } />
  })

  const shipping = !storePickup ? 10 : 0

  const subtotal = totals.reduce((x, y) => x + y, 0)
  const tax = subtotal * .0925 + shipping
  const total = subtotal + tax

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
                {
                  !storePickup 
                    ? <div className="totals-div">
                        <p className="totals">Flat Shipping:</p>
                        <p className="totals">{ formatPrice(10) }</p>
                      </div>
                    : null
                }
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
        storePickup={storePickup}
        setStorePickup={setStorePickup}
      />

      {
        toggleStripe && cart.length > 0
          ? <Checkout customer={customer}/>
          : null
      }

    </div>
  )
}