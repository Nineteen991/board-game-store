import { createContext, useState, useEffect } from "react"

const Context = createContext()

function ContextProvider ({ children }) {
    // Api Data
    const [apiData, setApiData] = useState([])
    const url = 'http://localhost:5000/api/v1/products'

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        fetch(url, { signal: signal })
            .then(res => res.json())
            .then(data => setApiData(data.products))
            .catch(err => console.log(err))

        return () => controller.abort()
    }, [])

    // Open Modal info
    const [openModal, setOpenModal] = useState(null)

    return (
        <Context.Provider value={{ apiData, openModal, setOpenModal }}>
            { children }
        </Context.Provider>
    )
}

export { Context, ContextProvider }