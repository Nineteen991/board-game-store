export default function CustomerInfo (props) {
  const { customer, checkoutForm, setToggleStripe } = props

  function renderStripe(e) {
    e.preventDefault()
    setToggleStripe(prev => !prev)
  }

  return (
    <div className="totals-pickup">
      <h3 className="totals-addr">Pickup From: Santa Cruz Games</h3>
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
        <button className="place-order-btn">Continue Checkout</button>
      </form>
    </div>
  )
}