import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FeaturedPets from '../components/home/FeaturedPets'
import HowItWorks from '../components/home/HowItWorks'
import Testimonials from "../components/home/Testimonomials.jsx";


const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section text-center">
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col lg={8} className="slide-up">
              <h1 className="display-4 fw-bold mb-4">Find Your Perfect Pet Companion</h1>
              <p className="lead mb-5">
                Discover your ideal furry friend with our AI-powered matching system.
                We connect loving families with pets who need forever homes.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <Button as={Link} to="/browse" size="lg" variant="light" className="fw-bold px-4">
                  Browse Pets
                </Button>
                <Button as={Link} to="/match" size="lg" variant="accent" className="fw-bold px-4">
                  Find My Match
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Featured Pets Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">Featured Pets Looking for Homes</h2>
          <FeaturedPets />
        </Container>
      </section>
      
      {/* How It Works Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5">How PawMates Works</h2>
          <HowItWorks />
        </Container>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">Happy Tails from Our Community</h2>
          <Testimonials />
        </Container>
      </section>
      
      {/* Call to Action */}
      <section className="py-5 bg-primary text-white text-center">
        <Container>
          <h2 className="mb-4">Ready to Meet Your New Best Friend?</h2>
          <p className="lead mb-4">
            Start your journey to pet parenthood today with our personalized matching system.
          </p>
          <Button as={Link} to="/match" size="lg" variant="accent" className="fw-bold px-4">
            Find My Perfect Match
          </Button>
        </Container>
      </section>
    </>
  )
}

export default Home