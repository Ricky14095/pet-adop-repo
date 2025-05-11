import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Alert, Button, Form, Modal } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

// Mock data for a single pet
const petData = {
  id: 1,
  name: 'Luna',
  species: 'Dog',
  breed: 'Golden Retriever',
  age: '2 years',
  gender: 'Female',
  size: 'Large',
  location: 'San Francisco, CA',
  image: 'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  shelterName: 'Golden Gate Animal Shelter',
  description: 'Luna is a friendly and energetic Golden Retriever who loves to play fetch and go for walks. She gets along well with children and other pets, and is fully house-trained. Luna would thrive in an active household with a yard where she can play.'
}

// Mock available times
const availableTimes = [
  '9:00 AM', '10:00 AM', '11:00 AM', 
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
]

const MeetGreet = () => {
  const [searchParams] = useSearchParams()
  const petId = searchParams.get('petId')
  
  const [pet, setPet] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState('')
  const [meetingType, setMeetingType] = useState('video')
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  
  useEffect(() => {
    // In a real app, this would fetch the pet data based on petId
    // For now, we'll just use our mock data
    setTimeout(() => {
      setPet(petData)
      setLoading(false)
    }, 500)
  }, [petId])
  
  const handleDateChange = (date) => {
    setSelectedDate(date)
    setSelectedTime('')
  }
  
  const handleSchedule = () => {
    setShowConfirmModal(true)
  }
  
  const confirmSchedule = () => {
    setShowConfirmModal(false)
    setConfirmed(true)
    
    // In a real app, this would call an API to schedule the meeting
  }
  
  const resetForm = () => {
    setSelectedDate(new Date())
    setSelectedTime('')
    setMeetingType('video')
    setConfirmed(false)
  }
  
  // Disable past dates and Sundays in calendar
  const tileDisabled = ({ date }) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    return date < today || date.getDay() === 0
  }
  
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading meet & greet scheduler...</p>
      </Container>
    )
  }
  
  return (
    <div className="bg-light py-5">
      <Container>
        <h1 className="text-center mb-5">Schedule a Meet & Greet</h1>
        
        {confirmed ? (
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="border-0 shadow-sm text-center slide-up">
                <Card.Body className="p-5">
                  <div className="mb-4">
                    <div className="icon-circle bg-success text-white mx-auto d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px', borderRadius: '50%' }}>
                      <i className="bi bi-check-lg fs-1"></i>
                    </div>
                  </div>
                  
                  <h3 className="mb-3">Your Meet & Greet is Scheduled!</h3>
                  <p className="mb-4">
                    You're scheduled to meet {pet.name} on <strong>{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</strong> at <strong>{selectedTime}</strong> via {meetingType === 'video' ? 'video call' : 'in-person visit'}.
                  </p>
                  
                  <Alert variant="info" className="d-flex align-items-center mb-4">
                    <i className="bi bi-info-circle-fill fs-4 me-3"></i>
                    <div>
                      You'll receive a confirmation email with {meetingType === 'video' ? 'video call details' : 'the address and directions'} shortly.
                    </div>
                  </Alert>
                  
                  {meetingType === 'video' && (
                    <div className="mb-4">
                      <Button variant="primary" size="lg" disabled className="mb-2 w-100">
                        Join Video Call
                        <small className="d-block">(Available 5 minutes before your scheduled time)</small>
                      </Button>
                    </div>
                  )}
                  
                  <Button variant="outline-primary" onClick={resetForm}>
                    Schedule Another Meet & Greet
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <Row>
            {/* Pet Information */}
            <Col lg={4} className="mb-4">
              <Card className="border-0 shadow-sm h-100">
                <Card.Img variant="top" src={pet.image} alt={pet.name} />
                <Card.Body>
                  <Card.Title className="d-flex justify-content-between align-items-center mb-3">
                    <h3>{pet.name}</h3>
                    <span className="badge bg-primary rounded-pill">{pet.species}</span>
                  </Card.Title>
                  
                  <Card.Text as="div">
                    <p className="mb-1"><strong>Breed:</strong> {pet.breed}</p>
                    <p className="mb-1"><strong>Age:</strong> {pet.age}</p>
                    <p className="mb-1"><strong>Gender:</strong> {pet.gender}</p>
                    <p className="mb-1"><strong>Size:</strong> {pet.size}</p>
                    <p className="mb-3">
                      <i className="bi bi-geo-alt-fill me-1 text-secondary"></i>
                      {pet.location}
                    </p>
                    
                    <h5>About {pet.name}</h5>
                    <p>{pet.description}</p>
                    
                    <h5>Shelter Information</h5>
                    <p className="mb-0">{pet.shelterName}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            {/* Scheduler */}
            <Col lg={8}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <h4 className="mb-4">Choose Meet & Greet Details</h4>
                  
                  <Row>
                    <Col md={6} className="mb-4">
                      <Form.Group className="mb-3">
                        <Form.Label>Meeting Type</Form.Label>
                        <div>
                          <Form.Check
                            inline
                            type="radio"
                            id="video-call"
                            name="meetingType"
                            label="Video Call"
                            checked={meetingType === 'video'}
                            onChange={() => setMeetingType('video')}
                            className="me-3"
                          />
                          <Form.Check
                            inline
                            type="radio"
                            id="in-person"
                            name="meetingType"
                            label="In-Person Visit"
                            checked={meetingType === 'in-person'}
                            onChange={() => setMeetingType('in-person')}
                          />
                        </div>
                      </Form.Group>
                      
                      <div className="calendar-container mb-3">
                        <Form.Label>Select Date</Form.Label>
                        <Calendar 
                          onChange={handleDateChange} 
                          value={selectedDate}
                          tileDisabled={tileDisabled}
                          minDate={new Date()}
                        />
                      </div>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label>Select Time</Form.Label>
                        <div className="d-grid gap-2">
                          {availableTimes.map((time) => (
                            <Button
                              key={time}
                              variant={selectedTime === time ? 'primary' : 'outline-secondary'}
                              onClick={() => setSelectedTime(time)}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </Form.Group>
                      
                      {selectedTime && (
                        <Alert variant="info" className="d-flex align-items-start mb-4">
                          <i className="bi bi-info-circle-fill fs-5 me-2 mt-1"></i>
                          <div>
                            {meetingType === 'video' ? (
                              <>You'll receive a secure video call link via email after scheduling.</>
                            ) : (
                              <>The shelter address and directions will be sent to your email after scheduling.</>
                            )}
                          </div>
                        </Alert>
                      )}
                    </Col>
                  </Row>
                  
                  <div className="d-grid">
                    <Button 
                      variant="primary" 
                      size="lg"
                      onClick={handleSchedule}
                      disabled={!selectedTime}
                    >
                      Schedule Meet & Greet
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
        
        {/* Confirmation Modal */}
        <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Your Meet & Greet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You're about to schedule a {meetingType === 'video' ? 'video call' : 'in-person visit'} with {pet.name} on:</p>
            
            <div className="text-center my-3">
              <h5>{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</h5>
              <h5>{selectedTime}</h5>
            </div>
            
            <p>Is this correct?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShowConfirmModal(false)}>
              Go Back
            </Button>
            <Button variant="primary" onClick={confirmSchedule}>
              Confirm Appointment
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  )
}

export default MeetGreet