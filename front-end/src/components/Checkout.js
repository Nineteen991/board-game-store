import { useState, useEffect, useContext } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import StripeForm from "./StripeForm"
import { Context } from '../ContextData'

const stripePromise = loadStripe('pk_test_vt8ZyUqCunXogiPG4j8GHwgB00P0qTWPZN')

export default function Checkout ({ customer }) {
  const [clientSecret, setClientSecret] = useState("")
  const { cart } = useContext(Context)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    try {
      // Create PaymentIntent as soon as the page loads
      fetch("http://localhost:5000/api/v1/stripe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            { cart, customer }
          ),
          signal
      })
        .then(res => res.json())
        .then(data => setClientSecret(data.clientSecret))
        .catch(error => {
          console.log(`Fetch Error: ${error}`)
        })
      return () => controller.abort()
    }
    catch (error) {
      console.log(`Stripe API Error: ${error}`)
    }
  }, [cart, customer])

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    async function createOrder() {
      try {        
        await fetch("http://localhost:5000/api/v1/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart, customer, clientSecret }),
          signal
        })
          .catch(error => console.log(`2nd fetch error: ${error}`))
      }
      catch (error) {
        console.log(`2nd Stripe API Error: ${error}`)
      }
    }
    createOrder()

    return () => controller.abort()
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
            <StripeForm customer={ customer } />
          </Elements>
        )
        : null
      }
    </div>
  )
}




// npm install --save stripe @stripe/react-stripe-js @stripe/stripe-js