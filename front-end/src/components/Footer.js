import { useRef, useEffect } from 'react'

export default function Footer () {
  const ref = useRef(null)

  useEffect(() => {
    const current = ref.current
    const observer = new IntersectionObserver(elements => {
      
    })
  }, [])

  return (
    <div className="footer">

      <div className="footer-divs">
        <h3 className="footer-titles">Hours</h3>
        <p className="footer-p">Sunday - Thursday 11am - 7pm</p>
        <p className="footer-p">Friday & Saturday 11am - 11pm</p>
      </div>

      <div className="footer-divs">
        <h3 className="footer-titles">Address</h3>
        <p className="footer-p">123 Pacific Ave</p>
        <p className="footer-p">Santa Cruz, CA 95060</p>
      </div>

      <div className="footer-divs">
        <h3 className="footer-titles">Call or Email us</h3>
        <p className="footer-p">831-123-4567</p>
        <p className="footer-p">info@SantaCruzGames.com</p>
      </div>

    </div>
  )
}