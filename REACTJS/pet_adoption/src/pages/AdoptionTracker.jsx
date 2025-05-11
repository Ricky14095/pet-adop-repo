import { Container, Row, Col, Card, ProgressBar, Button, Form } from 'react-bootstrap'
import { useState } from 'react'

// Mock adoption steps data
const adoptionSteps = [
  {
    id: 1,
    title: 'Application Submitted',
    description: 'Your application has been received and is being reviewed.',
    completed: true,
    date: '2023-11-05'
  },
  {
    id: 2,
    title: 'Application Approved',
    description: 'Your application has been approved. You can now schedule a Meet & Greet.',
    completed: true,
    date: '2023-11-07'
  },
  {
    id: 3,
    title: 'Meet & Greet Completed',
    description: 'You\'ve met with Max and confirmed you\'d like to proceed with adoption.',
    completed: true,
    date: '2023-11-10'
  },
  {
    id: 4,
    title: 'Home Check Scheduled',
    description: 'A representative will visit your home to ensure it\'s suitable for Max.',
    completed: false,
    date: '2023-11-15'
  },
  {
    id: 5,
    title: 'Home Check Passed',
    description: 'Your home has been approved for adoption.',
    completed: false,
    date: null
  },
  {
    id: 6,
    title: 'Adoption Fee Paid',
    description: 'The adoption fee has been processed.',
    completed: false,
    date: null
  },
  {
    id: 7,
    title: 'Adoption Finalized',
    description: 'Congratulations! Max is officially part of your family.',
    completed: false,
    date: null
  }
]

// Mock pet data
const petData = {
  id: 2,
  name: 'Max',
  species: 'Dog',
  breed: 'Labrador Mix',
  age: '1 year',
  gender: 'Male',
  image: 'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
}

// Mock documents data
const documentsData = [
  {
    id: 1,
    name: 'Adoption Application',
    status: 'Submitted',
    required: true,
    date: '2023-11-05'
  },
  {
    id: 2,
    name: 'ID Verification',
    status: 'Submitted',
    required: true,
    date: '2023-11-05'
  },
  {
    id: 3,
    name: 'Proof of Residence',
    status: 'Submitted',
    required: true,
    date: '2023-11-05'
  },
  {
    id: 4,
    name: 'Adoption Agreement',
    status: 'Pending',
    required: true,
    date: null
  },
  {
    id: 5,
    name: 'Pet Care Plan',
    status: 'Not Started',
    required: false,
    date: null
  }
]

const AdoptionTracker = () => {
  const [documents, setDocuments] = useState(documentsData)
  const [uploadingDoc, setUploadingDoc] = useState(null)
  
  // Calculate progress percentage
  const completedSteps = adoptionSteps.filter(step => step.completed).length
  const totalSteps = adoptionSteps.length
  const progressPercent = Math.round((completedSteps / totalSteps) * 100)
  
  const handleUploadDocument = (docId) => {
    // In a real app, this would trigger a file upload
    setUploadingDoc(docId)
    
    // Simulate upload completion after 2 seconds
    setTimeout(() => {
      setDocuments(prev => 
        prev.map(doc => 
          doc.id === docId 
            ? { ...doc, status: 'Submitted', date: new Date().toISOString().split('T')[0] } 
            : doc
        )
      )
      setUploadingDoc(null)
    }, 2000)
  }
  
  return (
    <div className="bg-light py-5">
      <Container>
        <h1 className="mb-5">Adoption Tracker</h1>
        
        <Row>
          {/* Progress Overview */}
          <Col lg={12} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <Row className="align-items-center">
                  <Col md={3} className="text-center mb-3 mb-md-0">
                    <img 
                      src={petData.image}
                      alt={petData.name}
                      className="img-fluid rounded-circle mb-3"
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />
                    <h4>{petData.name}</h4>
                    <p className="text-muted mb-0">{petData.breed}</p>
                  </Col>
                  
                  <Col md={9}>
                    <div className="d-flex justify-content-between mb-2">
                      <h5 className="mb-0">Adoption Progress</h5>
                      <span className="text-primary">{progressPercent}% Complete</span>
                    </div>
                    
                    <ProgressBar 
                      now={progressPercent} 
                      variant="primary" 
                      className="mb-4" 
                      style={{ height: '10px' }}
                    />
                    
                    <div className="d-md-flex justify-content-between">
                      <div className="mb-3 mb-md-0">
                        <p className="mb-1"><strong>Current Step:</strong></p>
                        <h5>
                          {adoptionSteps.find(step => !step.completed)?.title || 'Adoption Complete'}
                        </h5>
                      </div>
                      
                      <div className="d-flex gap-2">
                        <Button variant="outline-secondary">
                          <i className="bi bi-question-circle me-2"></i>
                          Get Help
                        </Button>
                        <Button variant="primary">
                          <i className="bi bi-chat-dots me-2"></i>
                          Contact Shelter
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row>
          {/* Step-by-Step Tracker */}
          <Col lg={8} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white py-3">
                <h5 className="mb-0">Adoption Steps</h5>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="step-timeline">
                  {adoptionSteps.map((step, index) => (
                    <div 
                      key={step.id} 
                      className={`step-item p-4 border-bottom ${step.completed ? 'completed' : ''}`}
                    >
                      <div className="d-flex">
                        <div 
                          className={`step-circle me-3 flex-shrink-0 d-flex align-items-center justify-content-center ${step.completed ? 'bg-primary' : 'bg-light border'}`}
                          style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                        >
                          {step.completed ? (
                            <i className="bi bi-check2 text-white"></i>
                          ) : (
                            <span className="text-muted">{step.id}</span>
                          )}
                        </div>
                        
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h5 className="mb-0">{step.title}</h5>
                            {step.date && (
                              <span className="text-muted small">
                                {step.completed ? 'Completed' : 'Scheduled'}: {new Date(step.date).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                          <p className="mb-0 text-muted">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          {/* Documents */}
          <Col lg={4} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white py-3">
                <h5 className="mb-0">Required Documents</h5>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="documents-list">
                  {documents.map((doc) => (
                    <div key={doc.id} className="p-3 border-bottom">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="mb-0">
                          {doc.name}
                          {doc.required && (
                            <span className="text-danger ms-2">*</span>
                          )}
                        </h6>
                        <div>
                          {doc.status === 'Submitted' ? (
                            <span className="badge bg-success">Submitted</span>
                          ) : doc.status === 'Pending' ? (
                            <span className="badge bg-warning text-dark">Pending</span>
                          ) : (
                            <span className="badge bg-secondary">Not Started</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center">
                        {doc.date ? (
                          <small className="text-muted">
                            Submitted on {new Date(doc.date).toLocaleDateString()}
                          </small>
                        ) : (
                          <small className="text-muted">
                            Not yet submitted
                          </small>
                        )}
                        
                        {doc.status !== 'Submitted' && (
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            onClick={() => handleUploadDocument(doc.id)}
                            disabled={uploadingDoc === doc.id}
                          >
                            {uploadingDoc === doc.id ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Uploading...
                              </>
                            ) : (
                              <>
                                <i className="bi bi-upload me-2"></i>
                                Upload
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
              <Card.Footer className="bg-white py-3">
                <small className="text-muted d-block mb-3">
                  <span className="text-danger">*</span> Required documents
                </small>
                <div className="d-grid">
                  <Button variant="primary">
                    <i className="bi bi-download me-2"></i>
                    Download All Documents
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AdoptionTracker