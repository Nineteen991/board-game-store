import Carousel from '../components/Carousel'
import Footer from '../components/Footer'

export default function homePage() {

  return (
    <div className='homepage'>

      <Carousel />

      <div className='about'>
        <div className='about-info'>
          <h1 className='about-title'>About Santa Cruz Games</h1>
          <p className='about-p'>
            Santa Cruz Games is a friendly local game store (FLGS) located 
            in Santa Cruz. We strive to provide the latest that the world of tabletop gaming has to offer by continually updating a vast 
            inventory of games to purchase and play, while also hosting a 
            weekly schedule of game nights for patrons to participate in.
          </p>
          <p className='about-p'>
            Discover titles created by local game designers, which are some 
            of the hidden gems offered in the store, or take home award-
            winning favorites to experience the phenomenon yourself. For an entirely different challenge, Santa Cruz Games stocks an 
            extensive selection of jigsaw and mechanical puzzles as well.
          </p>
          <h1 className='about-title'>
            We look forward to seeing you!
          </h1>
        </div>
      </div>

      <Footer />

    </div>
  )
}