import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar () {
  const [toggleNavbar, setToggleNavbar] = useState(false)

  return (
    <nav className='nav'>
      {/* menu icon */}
      <div
        className={ `${ toggleNavbar ? "change" : "nav-burger" }` }
        onClick={ () => setToggleNavbar(prev => !prev) }
      >
        <div className='line1'></div>
        <div className='line2'></div>
        <div className='line3'></div>
      </div>

      {/* popout menu */}
      {
        toggleNavbar &&
          <div className='nav-menu-border'>
            <div 
              className='nav-menu'
              onClick={ () => setToggleNavbar(prev => !prev) }
            >
              <Link to='/' className='nav-links'>Home</Link>
              <Link to='/shop' className='nav-links'>Shop</Link>
              <Link to='/cart' className='nav-links'>Cart</Link>
            </div>
          </div>
      }
    </nav>
  )
}