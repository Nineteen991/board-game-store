import { useState, useEffect } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import StripeForm from "./StripeForm"

const stripePromise = loadStripe('pk_test_vt8ZyUqCunXogiPG4j8GHwgB00P0qTWPZN')

export default function Checkout ({ cart, customer }) {
  const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    try {
      // Create PaymentIntent as soon as the component loads
      fetch("http://localhost:5000/api/v1/stripe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            { cart, customer }
          ),
          signal
      })
        .then(async res => {
          const { clientSecret } = await res.json()
          setClientSecret(clientSecret)
        })
        .catch(error => {
          console.log(`Fetch Error: ${error}`)
        })
    }
    catch (error) {
      console.log(`Stripe API Error: ${error}`)
    }

    return () => controller.abort()
  }, [cart, customer])

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