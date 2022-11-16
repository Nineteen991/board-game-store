import { useState } from 'react'

export default function CustomerInfo (props) {
  const { customer, checkoutForm, setToggleStripe } = props
  const [storePickup, setStorePickup] = useState(true)

  function renderStripe(e) {
    e.preventDefault()
    setToggleStripe(prev => !prev)
  }

  return (
    <div className="totals-pickup">

      <div className="delivery-method">
        <button 
          className="place-order-btn" 
          onClick={ () => setStorePickup(prev => !prev)}
          disabled={storePickup}
          style={ storePickup ? {} : {opacity: .5}}
        >
          Store Pickup
        </button>
        <button 
          className="place-order-btn"
          onClick={ () => setStorePickup(prev => !prev)}
          disabled={!storePickup}
          style={ !storePickup ? {} : {opacity: .5}}
        >
          Ship to Address
        </button>
      </div>
      
      <form id='contact-form' 
        className='contact-form' 
        onSubmit={ renderStripe }
      >
        <input
          type='email'
          name='email'
          className='contact-info'
          placeholder='Email address for receipt'
          value={ customer.email }
          onChange={ checkoutForm }
          required
        />
        <input
          name='name'
          className='contact-info'
          placeholder='Full name'
          value={ customer.name }
          onChange={ checkoutForm }
          required
        />

        {
          storePickup
            ? (
                <div className="delivery-info">
                  <h3 className="delivery-pickup">
                    Pickup From: Santa Cruz Games
                  </h3>
                  <p className="delivery-pickup">123 Pacific Ave</p>
                  <p className="delivery-pickup">Santa Cruz, CA 95060</p>
                </div>
              )
            : (
                <>
                  <input
                    name='street'
                    className="contact-info"
                    value={ customer.street }
                    onChange={ checkoutForm }
                    placeholder='Street Address'
                    required
                  />
                  <div className="addr-div">
                    <input
                      name='city'
                      className="addr-info"
                      value={ customer.city }
                      onChange={ checkoutForm }
                      placeholder='City'
                      required
                    />
                    <input
                      name='state'
                      className="addr-info"
                      value={ customer.state }
                      onChange={ checkoutForm }
                      placeholder='State Abbr'
                      required
                    />
                    <input
                      name='zip'
                      className="addr-info"
                      value={ customer.zip }
                      onChange={ checkoutForm }
                      placeholder='Zip'
                      required
                    />
                  </div>
                </>
              )
        }
        <button className="place-order-btn">Continue Checkout</button>
      </form>
    </div>
  )
}