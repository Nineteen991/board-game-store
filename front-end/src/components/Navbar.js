import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar () {
  const [toggleNavbar, setToggleNavbar] = useState(false)

  return (
    <nav>
      {/* menu icon */}
      <div
        className={ `${ toggleNavbar ? "change" : "nav-burger" }` }
        onClick={ x => setToggleNavbar(prev => !prev) }
      >
        <div className='line1'></div>
        <div className='line2'></div>
        <div className='line3'></div>
      </div>

      {/* popout menu */}
      {
        toggleNavbar &&
          <div 
            className='nav-menu'
            onClick={ x => setToggleNavbar(prev => !prev) }
          >
            <Link to='/' className='nav-links'>Home</Link>
            <Link to='/shop' className='nav-links'>Shop</Link>
            <Link to='/events' className='nav-links'>Events</Link>
            <Link to='/contact' className='nav-links'>Contact</Link>
            <Link to='/cart' className='nav-links'>Cart</Link>
          </div>
      }
    </nav>
  )
}