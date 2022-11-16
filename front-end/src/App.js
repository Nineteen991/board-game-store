import { useContext } from 'react'
import { Link, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import HomePage from './routes/HomePage'
import EventsPage from './routes/EventsPage'
import ContactPage from './routes/ContactPage'
import Cart from './routes/Cart'
import Store from './routes/Store'
import Complete from './routes/Complete'
import { Context } from './ContextData'
import './App.sass'

export default function App () {
  const { cart } = useContext(Context)
  const emptyCart = cart.length > 0 ? 'fill' : 'line'

  return (
    <div className='container'>

      <Navbar />

      <Link to='/cart' className='cart-icon'>
        <i className={`ri-shopping-cart-2-${ emptyCart }`}>
          {
            cart.length > 0
              && <span className='num-cart-items'>{ cart.length }</span>
          }
        </i>
      </Link>

      <Routes>
        <Route path='/' element={ <HomePage /> } />
        <Route path='/events' element={ <EventsPage /> } />
        <Route path='/contact' element={ <ContactPage /> } />
        <Route path='/cart' element={ <Cart /> } />
        <Route path='/shop' element={ <Store /> } />
        <Route path='/complete' element={ <Complete /> } />
      </Routes>

    </div>
  )
}