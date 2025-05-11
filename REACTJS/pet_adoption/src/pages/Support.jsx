import { useState } from 'react'
import { Container, Row, Col, Card, Tab, Nav, Form, Button, ProgressBar } from 'react-bootstrap'

// Mock vaccination data
const vaccinationData = [
  {
    id: 1,
    name: 'Rabies',
    date: '2023-10-15',
    nextDue: '2024-10-15',
    status: 'Completed'
  },
  {
    id: 2,
    name: 'DHPP',
    date: '2023-09-20',
    nextDue: '2024-09-20',
    status: 'Completed'
  },
  {
    id: 3,
    name: 'Bordetella',
    date: '2023-08-10',
    nextDue: '2024-02-10',
    status: 'Due Soon'
  },
  {
    id: 4,
    name: 'Lyme Disease',
    date: null,
    nextDue: '2023-12-15',
    status: 'Scheduled'
  }
]

// Mock forum topics
const forumTopics = [
  {
    id: 1,
    title: 'Tips for introducing a new pet to your home',
    author: 'Sarah J.',
    date: '2023-11-05',
    replies: 12,
    views: 45
  },
  {
    id: 2,
    title: 'Best food brands for Labrador puppies?',
    author: 'Michael R.',
    date: '2023-11-02',
    replies: 8,
    views: 32
  },
  {
    id: 3,
    title: 'How to crate train effectively',
    author: 'Emily C.',
    date: '2023-10-29',
    replies: 15,
    views: 51
  }
]

const Support = () => {
  const [message, setMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([
    { 
      id: 1, 
      type: 'system', 
      content: 'Hello! I\'m PawBot, your pet care assistant. How can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  
  const handleSendMessage = (e) => {
    e.preventDefault()
    
    if (!message.trim()) return
    
    // Add user message
    const userMessage = {
      id: chatMessages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    setChatMessages(prev => [...prev, userMessage])
    setMessage('')
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = {
        id: chatMessages.length + 2,
        type: 'system',
        content: getAIResponse(message),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      
      setChatMessages(prev => [...prev, aiResponse])
    }, 1000)
  }
  
  // Simple response generator based on keywords
  const getAIResponse = (userMessage) => {
    const lowerCaseMsg = userMessage.toLowerCase()
    
    if (lowerCaseMsg.includes('food') || lowerCaseMsg.includes('feeding')) {
      return 'Proper nutrition is crucial for your pet\'s health. For a Labrador mix like Max, I recommend a high-quality dog food appropriate for his age and activity level. Typically, adult dogs should be fed twice daily with portion sizes based on their weight and activity level. Would you like specific brand recommendations?'
    } else if (lowerCaseMsg.includes('training') || lowerCaseMsg.includes('behavior')) {
      return 'Consistent training is key to a well-behaved pet. For Labradors, positive reinforcement methods work best. Start with basic commands like sit, stay, and come. Short, daily training sessions of 10-15 minutes are more effective than longer, infrequent ones. Would you like some specific training resources?'
    } else if (lowerCaseMsg.includes('vet') || lowerCaseMsg.includes('doctor') || lowerCaseMsg.includes('medical')) {
      return 'Regular veterinary check-ups are essential. For Max, annual wellness exams are recommended, along with keeping vaccinations up-to-date. Based on your records, Max has a vaccination due soon. Would you like me to help you schedule a vet appointment?'
    } else {
      return 'Thank you for your question. If you have concerns about your pet\'s health, behavior, or care, I\'m here to help. For more specific guidance, please provide details about what you\'re experiencing with Max. Would you like information about nutrition, training, health care, or something else?'
    }
  }
  
  // Calculate days until next vaccination
  const calculateDaysUntil = (dateString) => {
    const today = new Date()
    const dueDate = new Date(dateString)
    const diffTime = dueDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    return diffDays
  }
  
  return (
    <div className="bg-light py-5">
      <Container>
        <h1 className="mb-5">Post-Adoption Support</h1>
        
        <Tab.Container id="support-tabs" defaultActiveKey="assistant">
          <Row>
            <Col lg={3} className="mb-4">
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-0">
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="assistant" className="rounded-0 px-4 py-3">
                        <i className="bi bi-robot me-2"></i>
                        AI Pet Assistant
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="vaccinations" className="rounded-0 px-4 py-3">
                        <i className="bi bi-clipboard2-pulse me-2"></i>
                        Vaccination Tracker
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="forum" className="rounded-0 px-4 py-3">
                        <i className="bi bi-chat-square-text me-2"></i>
                        Community Forum
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="resources" className="rounded-0 px-4 py-3">
                        <i className="bi bi-book me-2"></i>
                        Care Resources
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="contact" className="rounded-0 px-4 py-3">
                        <i className="bi bi-telephone me-2"></i>
                        Contact Support
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={9}>
              <Tab.Content>
                {/* AI Assistant */}
                <Tab.Pane eventKey="assistant">
                  <Card className="border-0 shadow-sm">
                    <Card.Header className="bg-white py-3">
                      <h5 className="mb-0">AI Pet Care Assistant</h5>
                    </Card.Header>
                    <Card.Body className="p-0">
                      <div 
                        className="chat-messages p-3"
                        style={{ height: '400px', overflowY: 'auto' }}
                      >
                        {chatMessages.map(msg => (
                          <div 
                            key={msg.id}
                            className={`chat-message mb-3 ${msg.type === 'user' ? 'text-end' : ''}`}
                          >
                            <div 
                              className={`d-inline-block p-3 rounded-3 ${
                                msg.type === 'user' 
                                  ? 'bg-primary text-white' 
                                  : 'bg-light border'
                              }`}
                              style={{ 
                                maxWidth: '80%', 
                                textAlign: 'left'
                              }}
                            >
                              {msg.content}
                            </div>
                            <div className="text-muted small mt-1">
                              {msg.timestamp}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="chat-input border-top p-3">
                        <Form onSubmit={handleSendMessage}>
                          <div className="input-group">
                            <Form.Control
                              type="text"
                              placeholder="Ask a question about pet care..."
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                            />
                            <Button type="submit" variant="primary">
                              <i className="bi bi-send-fill"></i>
                            </Button>
                          </div>
                          <Form.Text className="text-muted">
                            Try asking about feeding, training, health care, or behavior.
                          </Form.Text>
                        </Form>
                      </div>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
                
                {/* Vaccination Tracker */}
                <Tab.Pane eventKey="vaccinations">
                  <Card className="border-0 shadow-sm">
                    <Card.Header className="bg-white py-3">
                      <h5 className="mb-0">Max's Vaccination Tracker</h5>
                    </Card.Header>
                    <Card.Body>
                      {vaccinationData.map(vaccine => {
                        const daysUntil = vaccine.nextDue ? calculateDaysUntil(vaccine.nextDue) : 0
                        const isOverdue = daysUntil < 0
                        
                        return (
                          <Card key={vaccine.id} className="mb-3 border-0 shadow-sm">
                            <Card.Body>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <h5 className="mb-0">{vaccine.name}</h5>
                                <span className={`badge ${
                                  vaccine.status === 'Completed' ? 'bg-success' :
                                  vaccine.status === 'Due Soon' ? 'bg-warning text-dark' :
                                  vaccine.status === 'Scheduled' ? 'bg-info' :
                                  isOverdue ? 'bg-danger' : 'bg-secondary'
                                }`}>
                                  {isOverdue ? 'Overdue' : vaccine.status}
                                </span>
                              </div>
                              
                              <Row className="mb-2">
                                <Col xs={6}>
                                  <small className="text-muted d-block">Last Vaccination:</small>
                                  <span>{vaccine.date ? new Date(vaccine.date).toLocaleDateString() : 'Not yet administered'}</span>
                                </Col>
                                <Col xs={6}>
                                  <small className="text-muted d-block">Next Due:</small>
                                  <span>{vaccine.nextDue ? new Date(vaccine.nextDue).toLocaleDateString() : 'N/A'}</span>
                                </Col>
                              </Row>
                              
                              {vaccine.nextDue && vaccine.status !== 'Completed' && (
                                <div className="mt-3">
                                  <div className="d-flex justify-content-between mb-1">
                                    <small>Time until due:</small>
                                    <small>
                                      {isOverdue 
                                        ? `${Math.abs(daysUntil)} days overdue` 
                                        : `${daysUntil} days remaining`}
                                    </small>
                                  </div>
                                  <ProgressBar 
                                    now={isOverdue ? 100 : (100 - (daysUntil / 180) * 100)} 
                                    variant={
                                      isOverdue ? 'danger' :
                                      daysUntil < 14 ? 'warning' :
                                      'info'
                                    }
                                  />
                                </div>
                              )}
                            </Card.Body>
                          </Card>
                        )
                      })}
                    </Card.Body>
                    <Card.Footer className="bg-white">
                      <div className="d-flex justify-content-end">
                        <Button variant="primary">
                          <i className="bi bi-plus-circle me-2"></i>
                          Add Vaccination Record
                        </Button>
                      </div>
                    </Card.Footer>
                  </Card>
                </Tab.Pane>
                
                {/* Forum */}
                <Tab.Pane eventKey="forum">
                  <Card className="border-0 shadow-sm">
                    <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Community Forum</h5>
                      <Button variant="primary" size="sm">
                        <i className="bi bi-plus-circle me-2"></i>
                        New Topic
                      </Button>
                    </Card.Header>
                    <Card.Body className="p-0">
                      <table className="table table-hover mb-0">
                        <thead className="table-light">
                          <tr>
                            <th scope="col">Topic</th>
                            <th scope="col">Author</th>
                            <th scope="col">Posted</th>
                            <th scope="col">Replies</th>
                          </tr>
                        </thead>
                        <tbody>
                          {forumTopics.map(topic => (
                            <tr key={topic.id} style={{ cursor: 'pointer' }}>
                              <td>
                                <a href="#" className="text-decoration-none">{topic.title}</a>
                              </td>
                              <td>{topic.author}</td>
                              <td>{new Date(topic.date).toLocaleDateString()}</td>
                              <td>{topic.replies}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Card.Body>
                    <Card.Footer className="bg-white">
                      <nav>
                        <ul className="pagination justify-content-center mb-0">
                          <li className="page-item disabled">
                            <a className="page-link" href="#" tabIndex="-1">Previous</a>
                          </li>
                          <li className="page-item active">
                            <a className="page-link" href="#">1</a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">2</a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">3</a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">Next</a>
                          </li>
                        </ul>
                      </nav>
                    </Card.Footer>
                  </Card>
                </Tab.Pane>
                
                {/* Resources */}
                <Tab.Pane eventKey="resources">
                  <Card className="border-0 shadow-sm">
                    <Card.Header className="bg-white py-3">
                      <h5 className="mb-0">Pet Care Resources</h5>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col md={6} className="mb-4">
                          <Card className="h-100 border-0 shadow-sm">
                            <Card.Body>
                              <div className="d-flex align-items-center mb-3">
                                <div 
                                  className="me-3 rounded-circle bg-primary d-flex align-items-center justify-content-center"
                                  style={{ width: '50px', height: '50px' }}
                                >
                                  <i className="bi bi-journal-text text-white fs-4"></i>
                                </div>
                                <h5 className="mb-0">Training Guides</h5>
                              </div>
                              <p>Access detailed training resources for your Labrador Mix, including basic commands, leash training, and behavior management.</p>
                              <Button variant="outline-primary" className="mt-2">
                                View Guides
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                        
                        <Col md={6} className="mb-4">
                          <Card className="h-100 border-0 shadow-sm">
                            <Card.Body>
                              <div className="d-flex align-items-center mb-3">
                                <div 
                                  className="me-3 rounded-circle bg-secondary d-flex align-items-center justify-content-center"
                                  style={{ width: '50px', height: '50px' }}
                                >
                                  <i className="bi bi-cup-hot text-white fs-4"></i>
                                </div>
                                <h5 className="mb-0">Nutrition & Diet</h5>
                              </div>
                              <p>Learn about proper nutrition for your pet, including recommended food types, feeding schedules, and dietary requirements.</p>
                              <Button variant="outline-secondary" className="mt-2">
                                Nutrition Guide
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                        
                        <Col md={6} className="mb-4">
                          <Card className="h-100 border-0 shadow-sm">
                            <Card.Body>
                              <div className="d-flex align-items-center mb-3">
                                <div 
                                  className="me-3 rounded-circle bg-success d-flex align-items-center justify-content-center"
                                  style={{ width: '50px', height: '50px' }}
                                >
                                  <i className="bi bi-heart-pulse text-white fs-4"></i>
                                </div>
                                <h5 className="mb-0">Health & Wellness</h5>
                              </div>
                              <p>Essential information on preventative care, common health issues for your breed, and when to contact your veterinarian.</p>
                              <Button variant="outline-success" className="mt-2">
                                Health Guide
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                        
                        <Col md={6} className="mb-4">
                          <Card className="h-100 border-0 shadow-sm">
                            <Card.Body>
                              <div className="d-flex align-items-center mb-3">
                                <div 
                                  className="me-3 rounded-circle bg-info d-flex align-items-center justify-content-center"
                                  style={{ width: '50px', height: '50px' }}
                                >
                                  <i className="bi bi-camera-video text-white fs-4"></i>
                                </div>
                                <h5 className="mb-0">Video Library</h5>
                              </div>
                              <p>Watch expert-led videos on training techniques, grooming tutorials, and other essential pet care demonstrations.</p>
                              <Button variant="outline-info" className="mt-2">
                                View Videos
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
                
                {/* Contact Support */}
                <Tab.Pane eventKey="contact">
                  <Card className="border-0 shadow-sm">
                    <Card.Header className="bg-white py-3">
                      <h5 className="mb-0">Contact Support</h5>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col md={6} className="mb-4 mb-md-0">
                          <h5 className="mb-3">Get in Touch</h5>
                          <p>
                            Need assistance with your adoption process or pet care questions? Our support team is here to help you and your furry friend.
                          </p>
                          
                          <div className="mb-4">
                            <h6>Contact Information</h6>
                            <ul className="list-unstyled">
                              <li className="mb-2">
                                <i className="bi bi-telephone me-2 text-primary"></i>
                                (800) 555-PETS
                              </li>
                              <li className="mb-2">
                                <i className="bi bi-envelope me-2 text-primary"></i>
                                support@pawmates.example.com
                              </li>
                              <li className="mb-2">
                                <i className="bi bi-geo-alt me-2 text-primary"></i>
                                123 Pet Street, San Francisco, CA
                              </li>
                            </ul>
                          </div>
                          
                          <div>
                            <h6>Hours of Operation</h6>
                            <p className="mb-0">Monday - Friday: 9:00 AM - 6:00 PM</p>
                            <p className="mb-0">Saturday: 10:00 AM - 4:00 PM</p>
                            <p>Sunday: Closed</p>
                          </div>
                        </Col>
                        
                        <Col md={6}>
                          <h5 className="mb-3">Send a Message</h5>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label>Name</Form.Label>
                              <Form.Control type="text" placeholder="Your name" />
                            </Form.Group>
                            
                            <Form.Group className="mb-3">
                              <Form.Label>Email</Form.Label>
                              <Form.Control type="email" placeholder="Your email address" />
                            </Form.Group>
                            
                            <Form.Group className="mb-3">
                              <Form.Label>Subject</Form.Label>
                              <Form.Select>
                                <option>Select a subject</option>
                                <option>Adoption Process</option>
                                <option>Pet Care Question</option>
                                <option>Technical Support</option>
                                <option>Other</option>
                              </Form.Select>
                            </Form.Group>
                            
                            <Form.Group className="mb-3">
                              <Form.Label>Message</Form.Label>
                              <Form.Control as="textarea" rows={4} placeholder="How can we help you?" />
                            </Form.Group>
                            
                            <div className="d-grid">
                              <Button variant="primary" type="submit">
                                Send Message
                              </Button>
                            </div>
                          </Form>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  )
}

export default Support