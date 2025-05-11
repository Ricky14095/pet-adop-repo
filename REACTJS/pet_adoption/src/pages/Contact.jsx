import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'

const Contact = () => {
  return (
    <div className="bg-light py-5">
      <Container>
        <Row className="justify-content-center mb-5">
          <Col md={8} className="text-center">
            <h1 className="mb-3">Contact Us</h1>
            <p className="lead text-muted">
              Have questions about pet adoption or need assistance? We're here to help you find your perfect pet companion.
            </p>
          </Col>
        </Row>
        
        <Row>
          <Col lg={5} className="mb-4 mb-lg-0">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <h3 className="mb-4">Get in Touch</h3>
                
                <div className="mb-4">
                  <h5>Our Location</h5>
                  <p className="mb-0">
                    <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
                    123 Pet Street, San Francisco, CA 94107
                  </p>
                </div>
                
                <div className="mb-4">
                  <h5>Contact Information</h5>
                  <p className="mb-2">
                    <i className="bi bi-telephone-fill me-2 text-primary"></i>
                    (800) 555-PETS
                  </p>
                  <p className="mb-0">
                    <i className="bi bi-envelope-fill me-2 text-primary"></i>
                    info@pawmates.example.com
                  </p>
                </div>
                
                <div className="mb-4">
                  <h5>Hours of Operation</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2">Monday - Friday: 9:00 AM - 6:00 PM</li>
                    <li className="mb-2">Saturday: 10:00 AM - 4:00 PM</li>
                    <li>Sunday: Closed</li>
                  </ul>
                </div>
                
                <div>
                  <h5>Follow Us</h5>
                  <div className="social-icons">
                    <a href="#" className="me-3" aria-label="Facebook">
                      <i className="bi bi-facebook fs-4"></i>
                    </a>
                    <a href="#" className="me-3" aria-label="Twitter">
                      <i className="bi bi-twitter fs-4"></i>
                    </a>
                    <a href="#" className="me-3" aria-label="Instagram">
                      <i className="bi bi-instagram fs-4"></i>
                    </a>
                    <a href="#" aria-label="YouTube">
                      <i className="bi bi-youtube fs-4"></i>
                    </a>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={7}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h3 className="mb-4">Send Us a Message</h3>
                
                <Form>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Enter your first name"
                          required
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Enter your last name"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                          type="email" 
                          placeholder="Enter your email address"
                          required
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control 
                          type="tel" 
                          placeholder="Enter your phone number"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Select required>
                      <option value="">Select a subject</option>
                      <option value="adoption">Pet Adoption Inquiry</option>
                      <option value="fostering">Fostering Information</option>
                      <option value="volunteering">Volunteering Opportunities</option>
                      <option value="donation">Donations</option>
                      <option value="support">Post-Adoption Support</option>
                      <option value="other">Other</option>
                    </Form.Select>
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label>Message</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={5} 
                      placeholder="Type your message here..."
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Check 
                      type="checkbox"
                      id="consent"
                      label="I agree to receive communications from PawMates about pet adoption and related services."
                    />
                  </Form.Group>
                  
                  <div className="d-grid">
                    <Button variant="primary" type="submit" size="lg">
                      Send Message
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row className="mt-5">
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h3 className="mb-4 text-center">Frequently Asked Questions</h3>
                
                <Row>
                  <Col md={6} className="mb-4">
                    <h5>What is the adoption process?</h5>
                    <p>
                      Our adoption process involves filling out an application, completing a meet and greet with your potential pet, a home check, and finalizing paperwork. The entire process usually takes 1-2 weeks.
                    </p>
                  </Col>
                  
                  <Col md={6} className="mb-4">
                    <h5>What are the adoption fees?</h5>
                    <p>
                      Adoption fees vary depending on the animal but typically range from $50 to $300. This fee covers vaccinations, spay/neuter surgery, microchipping, and helps support our shelter.
                    </p>
                  </Col>
                  
                  <Col md={6} className="mb-4">
                    <h5>Can I foster a pet before adopting?</h5>
                    <p>
                      Yes! We offer foster-to-adopt programs that allow you to bring a pet home for a trial period before finalizing the adoption. This helps ensure the pet is a good fit for your family.
                    </p>
                  </Col>
                  
                  <Col md={6} className="mb-4">
                    <h5>What support do you provide after adoption?</h5>
                    <p>
                      We offer post-adoption support including training resources, health advice, and behavioral guidance. Our AI assistant is available 24/7, and you can always contact our support team.
                    </p>
                  </Col>
                </Row>
                
                <div className="text-center mt-3">
                  <Button variant="outline-primary" href="/faq">
                    View All FAQs
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Contact