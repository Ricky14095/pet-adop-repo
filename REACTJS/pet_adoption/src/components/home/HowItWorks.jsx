import { Row, Col, Card } from 'react-bootstrap'

const HowItWorks = () => {
  const steps = [
    {
      icon: 'bi-clipboard-check',
      title: 'Take the AI Match Quiz',
      description: 'Answer questions about your lifestyle, preferences, and living situation to find compatible pets.',
      color: 'primary'
    },
    {
      icon: 'bi-heart',
      title: 'Meet Your Matches',
      description: 'We\'ll show you pets that match your profile with compatibility scores to help you find the perfect pet.',
      color: 'secondary'
    },
    {
      icon: 'bi-camera-video',
      title: 'Schedule a Meet & Greet',
      description: 'Connect virtually or in-person with pets you\'re interested in adopting.',
      color: 'accent'
    },
    {
      icon: 'bi-house-heart',
      title: 'Welcome Your New Family Member',
      description: 'Complete the adoption process and bring your new companion home.',
      color: 'success'
    }
  ]
  
  return (
    <Row>
      {steps.map((step, index) => (
        <Col md={6} lg={3} key={index} className="mb-4">
          <Card className="text-center h-100 border-0 shadow-sm slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <Card.Body className="d-flex flex-column">
              <div 
                className={`icon-circle bg-${step.color} text-white mx-auto mb-4 d-flex align-items-center justify-content-center`}
                style={{ width: '80px', height: '80px', borderRadius: '50%' }}
              >
                <i className={`bi ${step.icon} fs-2`}></i>
              </div>
              <Card.Title as="h5" className="mb-3">{step.title}</Card.Title>
              <Card.Text className="text-muted">{step.description}</Card.Text>
              <div className="mt-auto pt-3">
                <span className="badge bg-light text-dark rounded-pill">Step {index + 1}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default HowItWorks