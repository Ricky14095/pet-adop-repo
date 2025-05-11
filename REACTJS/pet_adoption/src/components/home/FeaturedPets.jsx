import { useState, useEffect } from 'react'
import { Row, Col, Card, Badge, Button } from 'react-bootstrap'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'

// Mock data for featured pets
const featuredPetsData = [
  {
    id: 1,
    name: 'Luna',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: '2 years',
    gender: 'Female',
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
    location: 'New York, NY',
    image: 'https://images.pexels.com/photos/4587998/pexels-photo-4587998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    compatibilityScore: 87
  }
]

const FeaturedPets = () => {
  const [pets, setPets] = useState([])
  
  useEffect(() => {
    // In a real app, this would be an API call
    setPets(featuredPetsData)
  }, [])
  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
  
  return (
    <div className="featured-pets">
      <Slider {...sliderSettings}>
        {pets.map((pet) => (
          <div key={pet.id} className="px-2">
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
          </div>
        ))}
      </Slider>
      <div className="text-center mt-4">
        <Button as={Link} to="/browse" variant="primary" className="px-4">
          See All Available Pets
        </Button>
      </div>
    </div>
  )
}

export default FeaturedPets