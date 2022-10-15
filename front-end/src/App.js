import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import HomePage from './routes/HomePage'
import EventsPage from './routes/EventsPage'
import ContactPage from './routes/ContactPage'
import Cart from './routes/Cart'
import './App.sass'

export default function App () {
  return (
    <div className='container'>
      <Navbar />
      <Routes>
        <Route path='/' element={ <HomePage /> } />
        <Route path='/events' element={ <EventsPage /> } />
        <Route path='/contact' element={ <ContactPage /> } />
        <Route path='/cart' element={ <Cart /> } />
      </Routes>
    </div>
  )
}