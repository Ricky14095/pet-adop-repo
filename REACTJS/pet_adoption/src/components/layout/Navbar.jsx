import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Navbar, Container, Nav, Button, Dropdown } from 'react-bootstrap'

const MainNavbar = ({ user, onLogout }) => {
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate('/login')
    setExpanded(false)
  }

  const handleSignupClick = () => {
    navigate('/signup')
    setExpanded(false)
  }

  const handleLogoutClick = () => {
    onLogout()
    navigate('/')
    setExpanded(false)
  }

  const closeNavbar = () => setExpanded(false)

  return (
    <Navbar 
      bg="white" 
      expand="lg" 
      sticky="top" 
      className="shadow-sm py-3"
      expanded={expanded}
      onToggle={setExpanded}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <i className="bi bi-heart-fill me-2 text-danger"></i>
          <span className="fw-bold" style={{ color: 'var(--primary)' }}>PawMates</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="main-navbar" />
        
        <Navbar.Collapse id="main-navbar">
          <Nav className="mx-auto">
            <Nav.Link as={NavLink} to="/" onClick={closeNavbar} className="mx-2">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/browse" onClick={closeNavbar} className="mx-2">
              Browse Pets
            </Nav.Link>
            <Nav.Link as={NavLink} to="/match" onClick={closeNavbar} className="mx-2">
              AI Match
            </Nav.Link>
            <Nav.Link as={NavLink} to="/meet-greet" onClick={closeNavbar} className="mx-2">
              Meet & Greet
            </Nav.Link>
            {user && (
              <Nav.Link as={NavLink} to="/dashboard" onClick={closeNavbar} className="mx-2">
                Dashboard
              </Nav.Link>
            )}
            <Nav.Link as={NavLink} to="/contact" onClick={closeNavbar} className="mx-2">
              Contact
            </Nav.Link>
          </Nav>
          
          <div className="d-flex mt-3 mt-lg-0">
            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-primary" id="user-dropdown">
                  <i className="bi bi-person-circle me-2"></i>
                  {user.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/dashboard">Dashboard</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/adoption-tracker">Adoption Tracker</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/support">Support</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogoutClick}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Button variant="outline-primary" className="me-2" onClick={handleLoginClick}>
                  Login
                </Button>
                <Button variant="primary" onClick={handleSignupClick}>
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MainNavbar