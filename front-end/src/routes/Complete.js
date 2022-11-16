import { Link } from 'react-router-dom'

export default function Complete () {

  return (
    <div className="complete">
      <h1 className='complete-msg'>Payment Complete! Tell your friends.</h1>
      <Link to='/shop' className="buy-stuff">
        <button 
          className="buy-stuff-btn"
        >
          Buy more stuff!
        </button>
      </Link>
    </div>
  )
}