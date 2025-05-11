import { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Card, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Mock data for pets
const petsData = [
  {
    id: 1,
    name: 'Luna',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: '2 years',
    gender: 'Female',
    size: 'Large',
    location: 'San Francisco, CA',
    image: 'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    compatibilityScore: 92
  },
  {
    id: 2,
    name: 'Oliver',
    species: 'Cat',
    breed: 'Maine Coon',
    age: '3 years',
    gender: 'Male',
    size: 'Medium',
    location: 'Los Angeles, CA',
    image: 'https://images.pexels.com/photos/2558605/pexels-photo-2558605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    compatibilityScore: 88
  },
  {
    id: 3,
    name: 'Max',
    species: 'Dog',
    breed: 'Labrador Mix',
    age: '1 year',
    gender: 'Male',
    size: 'Large',
    location: 'Seattle, WA',
    image: 'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    compatibilityScore: 85
  },
  {
    id: 4,
    name: 'Bella',
    species: 'Cat',
    breed: 'Siamese',
    age: '4 years',
    gender: 'Female',
    size: 'Small',
    location: 'Portland, OR',
    image: 'https://images.pexels.com/photos/1416792/pexels-photo-1416792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    compatibilityScore: 90
  },
  {
    id: 5,
    name: 'Charlie',
    species: 'Dog',
    breed: 'French Bulldog',
    age: '2 years',
    gender: 'Male',
    size: 'Small',
    location: 'New York, NY',
    image: 'https://images.pexels.com/photos/4587998/pexels-photo-4587998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    compatibilityScore: 87
  },
  {
    id: 6,
    name: 'Daisy',
    species: 'Dog',
    breed: 'Border Collie',
    age: '3 years',
    gender: 'Female',
    size: 'Medium',
    location: 'Denver, CO',
    image: 'https://images.pexels.com/photos/2737393/pexels-photo-2737393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    compatibilityScore: 89
  },
  {
    id: 7,
    name: 'Milo',
    species: 'Cat',
    breed: 'Domestic Shorthair',
    age: '1 year',
    gender: 'Male',
    size: 'Small',
    location: 'Chicago, IL',
    image: 'https://images.pexels.com/photos/177809/pexels-photo-177809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    compatibilityScore: 86
  },
  {
    id: 8,
    name: 'Cooper',
    species: 'Dog',
    breed: 'Australian Shepherd',
    age: '2 years',
    gender: 'Male',
    size: 'Medium',
    location: 'Austin, TX',
    image: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    compatibilityScore: 91
  }
]

const BrowsePets = () => {
  const [pets, setPets] = useState([])
  const [filteredPets, setFilteredPets] = useState([])
  const [filters, setFilters] = useState({
    species: '',
    size: '',
    age: '',
    location: ''
  })
  
  useEffect(() => {
    // In a real app, this would be an API call
    setPets(petsData)
    setFilteredPets(petsData)
  }, [])
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }))
  }
  
  const applyFilters = () => {
    let results = [...pets]
    
    if (filters.species) {
      results = results.filter(pet => pet.species === filters.species)
    }
    
    if (filters.size) {
      results = results.filter(pet => pet.size === filters.size)
    }
    
    if (filters.age) {
      // This is simplified - in a real app, we would have proper age filtering
      if (filters.age === 'Under 1 year') {
        results = results.filter(pet => pet.age.includes('month') || pet.age === '1 year')
      } else if (filters.age === '1-3 years') {
        results = results.filter(pet => 
          pet.age === '1 year' || 
          pet.age === '2 years' || 
          pet.age === '3 years'
        )
      } else if (filters.age === '4+ years') {
        results = results.filter(pet => {
          const ageNumber = parseInt(pet.age.split(' ')[0])
          return ageNumber >= 4
        })
      }
    }
    
    if (filters.location) {
      results = results.filter(pet => pet.location.includes(filters.location))
    }
    
    setFilteredPets(results)
  }
  
  const resetFilters = () => {
    setFilters({
      species: '',
      size: '',
      age: '',
      location: ''
    })
    setFilteredPets(pets)
  }
  
  return (
    <div className="bg-light py-5">
      <Container>
        <h1 className="text-center mb-5">Find Your Perfect Pet</h1>
        
        <Row>
          {/* Filters Sidebar */}
          <Col lg={3} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <h5 className="mb-3">Filter Pets</h5>
                
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Pet Type</Form.Label>
                    <Form.Select 
                      name="species"
                      value={filters.species}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Types</option>
                      <option value="Dog">Dogs</option>
                      <option value="Cat">Cats</option>
                    </Form.Select>
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Size</Form.Label>
                    <Form.Select 
                      name="size"
                      value={filters.size}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Sizes</option>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                    </Form.Select>
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Select 
                      name="age"
                      value={filters.age}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Ages</option>
                      <option value="Under 1 year">Under 1 year</option>
                      <option value="1-3 years">1-3 years</option>
                      <option value="4+ years">4+ years</option>
                    </Form.Select>
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label>Location</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="City or ZIP code"
                      name="location"
                      value={filters.location}
                      onChange={handleFilterChange}
                    />
                  </Form.Group>
                  
                  <div className="d-grid gap-2">
                    <Button variant="primary" onClick={applyFilters}>
                      Apply Filters
                    </Button>
                    <Button variant="outline-secondary" onClick={resetFilters}>
                      Reset Filters
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          
          {/* Pets Grid */}
          <Col lg={9}>
            <Row>
              {filteredPets.length > 0 ? (
                filteredPets.map(pet => (
                  <Col md={6} lg={4} key={pet.id} className="mb-4">
                    <Card className="pet-card h-100 fade-in">
                      <div className="position-relative">
                        <Card.Img variant="top" src={pet.image} alt={`${pet.name} - ${pet.breed}`} />
                        <Badge 
                          bg="primary" 
                          className="position-absolute top-0 end-0 m-3 px-2 py-2 rounded-pill"
                        >
                          <i className="bi bi-heart-fill me-1"></i>
                          {pet.compatibilityScore}% Match
                        </Badge>
                      </div>
                      <Card.Body>
                        <Card.Title className="d-flex justify-content-between align-items-center mb-3">
                          <span>{pet.name}</span>
                          <Badge bg={pet.species === 'Dog' ? 'primary' : 'secondary'} className="rounded-pill">
                            {pet.species}
                          </Badge>
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
                        </Card.Text>
                        <div className="d-grid">
                          <Button 
                            as={Link} 
                            to={`/meet-greet?petId=${pet.id}`} 
                            variant="outline-primary"
                          >
                            Schedule Meet & Greet
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col xs={12} className="text-center py-5">
                  <i className="bi bi-emoji-frown display-1 text-secondary opacity-50"></i>
                  <h3 className="mt-3">No pets found</h3>
                  <p className="text-muted">Try adjusting your filters to see more results.</p>
                  <Button variant="primary" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default BrowsePets