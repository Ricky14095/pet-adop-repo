import { Row, Col, Card } from 'react-bootstrap'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'Boston, MA',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    petImage: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    petName: 'Buddy',
    quote: 'The AI matching was spot on! Buddy fits perfectly with our family and it\'s like he\'s always been with us. The virtual meet and greet made the process so convenient.'
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    location: 'Austin, TX',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    petImage: 'https://images.pexels.com/photos/2361952/pexels-photo-2361952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    petName: 'Luna',
    quote: 'I never thought a cat could match my personality so well. Luna and I are both independent but affectionate. The compatibility score was 92% and I can see why!'
  },
  {
    id: 3,
    name: 'Emily Chen',
    location: 'Seattle, WA',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    petImage: 'https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    petName: 'Max',
    quote: 'The adoption process was seamless and the post-adoption support has been amazing. The vaccination tracker and AI chatbot have been so helpful for first-time pet parents like us.'
  }
]

const Testimonials = () => {
  return (
    <Row>
      {testimonials.map((testimonial) => (
        <Col md={4} key={testimonial.id} className="mb-4">
          <Card className="h-100 border-0 shadow-sm testimonial-card fade-in">
            <Card.Body className="d-flex flex-column">
              <div className="mb-3 d-flex align-items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="rounded-circle me-3"
                  width="60"
                  height="60"
                  style={{ objectFit: 'cover' }}
                />
                <div>
                  <h5 className="mb-0">{testimonial.name}</h5>
                  <p className="text-muted mb-0 small">
                    <i className="bi bi-geo-alt-fill me-1"></i>
                    {testimonial.location}
                  </p>
                </div>
              </div>
              <Card.Text className="mb-4 flex-grow-1">
                <i className="bi bi-quote fs-3 text-primary opacity-50 me-2"></i>
                {testimonial.quote}
              </Card.Text>
              <div className="d-flex align-items-center mt-auto pt-3 border-top">
                <img 
                  src={testimonial.petImage} 
                  alt={testimonial.petName}
                  className="rounded-circle me-3"
                  width="50"
                  height="50"
                  style={{ objectFit: 'cover' }}
                />
                <div>
                  <p className="mb-0 small text-muted">Adopted</p>
                  <h6 className="mb-0">{testimonial.petName}</h6>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default Testimonials