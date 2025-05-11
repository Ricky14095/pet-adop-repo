import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Container } from 'react-bootstrap'

const Layout = ({ children, user, onLogout }) => {
  // Update page title on mount
  useEffect(() => {
    document.title = 'PawMates | Find Your Perfect Pet Companion'
  }, [])

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar user={user} onLogout={onLogout} />
      <main className="flex-grow-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout