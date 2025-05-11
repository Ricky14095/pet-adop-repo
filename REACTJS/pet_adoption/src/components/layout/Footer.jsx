import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg={4} md={6} className="mb-4 mb-md-0">
            <h5 className="mb-3">
              <i className="bi bi-heart-fill me-2 text-danger"></i>
              PawMates
            </h5>
            <p>
              Finding forever homes for pets in need. Our mission is to connect loving families with their perfect pet companions through innovative technology and compassionate care.
            </p>
            <div className="social-icons mb-3">
              <a href="#" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
              <a href="#" aria-label="Twitter"><i className="bi bi-twitter"></i></a>
              <a href="#" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
              <a href="#" aria-label="YouTube"><i className="bi bi-youtube"></i></a>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/">Home</Link></li>
              <li className="mb-2"><Link to="/browse">Browse Pets</Link></li>
              <li className="mb-2"><Link to="/match">AI Match</Link></li>
              <li className="mb-2"><Link to="/meet-greet">Meet & Greet</Link></li>
            </ul>
          </Col>
          
          <Col lg={2} md={6} className="mb-4 mb-md-0">
            <h5>Resources</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/about">About Us</Link></li>
              <li className="mb-2"><Link to="/faq">FAQ</Link></li>
              <li className="mb-2"><Link to="/blog">Pet Care Blog</Link></li>
              <li className="mb-2"><Link to="/contact">Contact Us</Link></li>
            </ul>
          </Col>
          
          <Col lg={4} md={6}>
            <h5>Stay Updated</h5>
            <p>Subscribe to our newsletter for the latest pet adoption news and tips.</p>
            <div className="input-group mb-3">
              <input 
                type="email" 
                className="form-control" 
                placeholder="Your email" 
                aria-label="Subscribe to newsletter" 
              />
              <button className="btn btn-primary" type="button">Subscribe</button>
            </div>
          </Col>
        </Row>
        
        <hr className="my-4" />
        
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0">&copy; {currentYear} PawMates. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <ul className="list-inline mb-0">
              <li className="list-inline-item"><Link to="/privacy">Privacy Policy</Link></li>
              <li className="list-inline-item mx-3">|</li>
              <li className="list-inline-item"><Link to="/terms">Terms of Use</Link></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer