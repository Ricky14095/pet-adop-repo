import { useState } from 'react'
import { Container, Row, Col, Card, Form, Button, ProgressBar, Accordion } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Quiz questions for the AI matcher
const quizQuestions = [
  {
    id: 1,
    question: 'What type of living space do you have?',
    options: ['Apartment', 'Small house', 'Large house with yard', 'Rural property'],
    multiSelect: false
  },
  {
    id: 2,
    question: 'How active is your lifestyle?',
    options: ['Very sedentary', 'Moderately active', 'Active', 'Very active'],
    multiSelect: false
  },
  {
    id: 3,
    question: 'How many hours per day will your pet be home alone?',
    options: ['Less than 2 hours', '2-4 hours', '4-8 hours', 'More than 8 hours'],
    multiSelect: false
  },
  {
    id: 4,
    question: 'Do you have any children in your household?',
    options: ['No children', 'Children over 12', 'Children 5-12', 'Children under 5'],
    multiSelect: false
  },
  {
    id: 5,
    question: 'What qualities are you looking for in a pet? (Select all that apply)',
    options: ['Playful', 'Independent', 'Low-maintenance', 'Affectionate', 'Quiet', 'Guard/protection'],
    multiSelect: true
  }
]

const AIPetMatch = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [compatibilityScore, setCompatibilityScore] = useState(0)
  
  const totalSteps = quizQuestions.length
  const progress = (currentStep / (totalSteps + 1)) * 100
  
  const handleSingleSelectAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }
  
  const handleMultiSelectAnswer = (questionId, option) => {
    setAnswers(prev => {
      const currentAnswers = prev[questionId] || []
      
      if (currentAnswers.includes(option)) {
        // Remove option if already selected
        return {
          ...prev,
          [questionId]: currentAnswers.filter(item => item !== option)
        }
      } else {
        // Add option if not selected
        return {
          ...prev,
          [questionId]: [...currentAnswers, option]
        }
      }
    })
  }
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    } else {
      calculateResults()
    }
  }
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }
  
  const isCurrentQuestionAnswered = () => {
    const currentQuestion = quizQuestions[currentStep - 1]
    
    if (currentQuestion.multiSelect) {
      return answers[currentQuestion.id] && answers[currentQuestion.id].length > 0
    } else {
      return !!answers[currentQuestion.id]
    }
  }
  
  const calculateResults = () => {
    // In a real app, this would use a more sophisticated algorithm
    // This is just a simplified example
    let score = Math.floor(Math.random() * 21) + 80 // Random score between 80-100
    setCompatibilityScore(score)
    setShowResults(true)
  }
  
  const resetQuiz = () => {
    setCurrentStep(1)
    setAnswers({})
    setShowResults(false)
    setCompatibilityScore(0)
  }
  
  const currentQuestion = quizQuestions[currentStep - 1]
  
  return (
    <div className="bg-light py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <h1 className="text-center mb-4">Find Your Perfect Pet Match</h1>
            <p className="text-center text-muted mb-5">
              Answer a few questions about your lifestyle and preferences to find pets that are compatible with you.
            </p>
            
            {!showResults ? (
              <Card className="quiz-card border-0 shadow-sm">
                <Card.Header className="bg-white border-bottom-0 pt-4">
                  <ProgressBar 
                    now={progress} 
                    variant="primary" 
                    className="quiz-progress mb-3" 
                  />
                  <div className="d-flex justify-content-between text-muted small mb-2">
                    <span>Question {currentStep} of {totalSteps}</span>
                    <span>{Math.round(progress)}% Complete</span>
                  </div>
                </Card.Header>
                
                <Card.Body className="pt-2 pb-4 px-4">
                  <h4 className="mb-4">{currentQuestion.question}</h4>
                  
                  <Form>
                    {currentQuestion.multiSelect ? (
                      // Multi-select options (checkboxes)
                      currentQuestion.options.map((option, index) => (
                        <Form.Check
                          key={index}
                          type="checkbox"
                          id={`question-${currentQuestion.id}-option-${index}`}
                          label={option}
                          className="mb-3"
                          checked={(answers[currentQuestion.id] || []).includes(option)}
                          onChange={() => handleMultiSelectAnswer(currentQuestion.id, option)}
                        />
                      ))
                    ) : (
                      // Single select options (radio buttons)
                      currentQuestion.options.map((option, index) => (
                        <Form.Check
                          key={index}
                          type="radio"
                          id={`question-${currentQuestion.id}-option-${index}`}
                          name={`question-${currentQuestion.id}`}
                          label={option}
                          className="mb-3"
                          checked={answers[currentQuestion.id] === option}
                          onChange={() => handleSingleSelectAnswer(currentQuestion.id, option)}
                        />
                      ))
                    )}
                  </Form>
                </Card.Body>
                
                <Card.Footer className="bg-white border-top-0 d-flex justify-content-between pt-2 pb-4 px-4">
                  <Button 
                    variant="outline-secondary" 
                    onClick={handleBack}
                    disabled={currentStep === 1}
                  >
                    Back
                  </Button>
                  
                  <Button 
                    variant="primary" 
                    onClick={handleNext}
                    disabled={!isCurrentQuestionAnswered()}
                  >
                    {currentStep < totalSteps ? 'Next' : 'See Results'}
                  </Button>
                </Card.Footer>
              </Card>
            ) : (
              <div className="slide-up">
                <Card className="border-0 shadow-sm mb-4">
                  <Card.Body className="text-center py-5">
                    <div className="mb-4">
                      <div 
                        className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                        style={{ 
                          width: '120px', 
                          height: '120px', 
                          borderRadius: '50%',
                          background: `conic-gradient(var(--primary) ${compatibilityScore}%, var(--gray-200) 0)`,
                          position: 'relative' 
                        }}
                      >
                        <div 
                          className="d-flex align-items-center justify-content-center bg-white" 
                          style={{ width: '100px', height: '100px', borderRadius: '50%', zIndex: 1 }}
                        >
                          <span className="display-6 fw-bold text-primary">{compatibilityScore}%</span>
                        </div>
                      </div>
                      <h3 className="mb-2">Your Pet Compatibility Score</h3>
                      <p className="text-muted mb-4">
                        Based on your answers, we've found some great matches for you!
                      </p>
                    </div>
                    
                    <div className="d-grid gap-3">
                      <Button as={Link} to="/browse" variant="primary" size="lg">
                        Browse Matched Pets
                      </Button>
                      <Button variant="outline-secondary" onClick={resetQuiz}>
                        Retake Quiz
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
                
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <h4 className="mb-4">Your Pet Compatibility Analysis</h4>
                    
                    <Accordion>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <span className="fw-bold">Living Space Compatibility</span>
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>Based on your living space, you would be most compatible with pets that require {answers[1] === 'Apartment' || answers[1] === 'Small house' ? 'less space' : 'more space'} to roam and play.</p>
                          <p className="mb-0">{answers[1] === 'Apartment' ? 'Consider smaller breeds or cats that do well in apartments.' : answers[1] === 'Large house with yard' || answers[1] === 'Rural property' ? 'You have plenty of space for active, larger breeds.' : 'Medium-sized pets would fit well in your home.'}</p>
                        </Accordion.Body>
                      </Accordion.Item>
                      
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>
                          <span className="fw-bold">Activity Level Match</span>
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>Your {answers[2] || 'selected'} activity level indicates you'd be happiest with a pet that has {answers[2] === 'Very active' || answers[2] === 'Active' ? 'higher energy needs' : 'lower energy needs'}.</p>
                          <p className="mb-0">{answers[2] === 'Very active' ? 'Consider high-energy breeds that enjoy long walks and playtime.' : answers[2] === 'Very sedentary' ? 'Look for pets that require minimal exercise.' : 'Medium-energy pets would be a good fit for your lifestyle.'}</p>
                        </Accordion.Body>
                      </Accordion.Item>
                      
                      <Accordion.Item eventKey="2">
                        <Accordion.Header>
                          <span className="fw-bold">Time Commitment</span>
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>With your pet being alone for {answers[3] || 'the selected amount of time'} each day, you should consider pets that are {answers[3] === 'More than 8 hours' ? 'more independent' : 'more social'}.</p>
                          <p className="mb-0">{answers[3] === 'Less than 2 hours' ? 'You have plenty of time for pets that need more attention and training.' : answers[3] === 'More than 8 hours' ? 'Look for pets that are comfortable being alone for longer periods.' : 'Consider pets with moderate independence.'}</p>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Card.Body>
                </Card>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AIPetMatch