import { createContext, useState, useEffect } from "react"

const Context = createContext()

function ContextProvider ({ children }) {
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

    return (
        <Context.Provider value={{ apiData }}>
            { children }
        </Context.Provider>
    )
}

export { Context, ContextProvider }