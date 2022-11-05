import { useState } from 'react'

export default function useCustomer() {
    const [customer, setCustomer] = useState({
        name: "",
        email: ""
    })

    function checkoutForm (e) {
        const { name, value } = e.target
        console.log(value)
        setCustomer(prev => (
            {
            ...prev,
            [name] : value
            }
        ))
    }

    return { customer, checkoutForm }
}