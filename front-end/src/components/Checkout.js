import { useState, useEffect, useContext } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import StripeForm from "./StripeForm"
import { Context } from '../ContextData'

const stripePromise = loadStripe('pk_test_vt8ZyUqCunXogiPG4j8GHwgB00P0qTWPZN')

export default function Checkout ({ customer }) {
  const [clientSecret, setClientSecret] = useState("")

  const { cart } = useContext(Context)

console.log(cart)
console.log(customer)
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/api/v1/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        { cart, customer }
      ),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        return setClientSecret(data.clientSecret)
      })
  }, [])

  const appearance = {
    theme: 'stripe',
  }

  const options = {
    clientSecret,
    appearance,
  }

  return (
    <div className='checkout'>
      {
        clientSecret ? (
          <Elements options={options} stripe={stripePromise}>
            <StripeForm />
          </Elements>
        )
        : null
      }
    </div>
  )
}




// npm install --save stripe @stripe/react-stripe-js @stripe/stripe-js