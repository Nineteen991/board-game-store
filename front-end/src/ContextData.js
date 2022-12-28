import { createContext, useState, useEffect } from "react"

const Context = createContext()

function ContextProvider ({ children }) {
    // Api Data
    const [apiData, setApiData] = useState([])
    const url = 'http://localhost:5000/api/v1/products'

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        try {
            const interval = setTimeout(() => {
                fetch(url, { signal: signal })
                    .then(res => res.json())
                    .then(data => setApiData(data.products))
                    .catch(err => console.log(err))
            }, 500)

            return (
                () => {
                    controller.abort()
                    clearTimeout(interval)
                }
            )
        }
        catch(error) {
            console.log(error)
        }
    }, [])

    // Open Modal info
    const [openModal, setOpenModal] = useState(null)

    // Cart
    const [cart, setCart] = useState([])

    function removeFromCart(index) {
        const newCart = [...cart]
        newCart.splice(index, 1)
        setCart(newCart)
    }

    return (
        <Context.Provider value={{ 
            apiData, 
            openModal, 
            setOpenModal,
            cart, 
            setCart,
            removeFromCart
        }}>
            { children }
        </Context.Provider>
    )
}

export { Context, ContextProvider }