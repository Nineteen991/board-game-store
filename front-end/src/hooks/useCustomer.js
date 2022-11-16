import { useState } from 'react'

export default function useCustomer() {
    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zip: ""
    })

    function checkoutForm (e) {
        const { name, value } = e.target
        setCustomer(prev => (
            {
            ...prev,
            [name] : value
            }
        ))
    }

    return { customer, checkoutForm }
}