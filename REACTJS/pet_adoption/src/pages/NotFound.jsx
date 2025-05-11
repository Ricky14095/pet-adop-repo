import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="bg-light py-5 flex-grow-1 d-flex align-items-center">
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={8} lg={6}>
            <div className="mb-4">
              <i className="bi bi-emoji-frown display-1 text-primary"></i>
            </div>
            <h1 className="mb-4">Page Not Found</h1>
            <p className="lead mb-5">
              Oops! The page you're looking for doesn't exist or has been moved.
              Let's help you find your way back.
            </p>
            <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
              <Button as={Link} to="/" variant="primary" size="lg">
                Return Home
              </Button>
              <Button as={Link} to="/browse" variant="outline-primary" size="lg">
                Browse Pets
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default NotFound