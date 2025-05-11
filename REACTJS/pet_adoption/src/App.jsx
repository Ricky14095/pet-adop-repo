import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

// Layout components
import Layout from './components/layout/Layout'

// Pages
import Home from './pages/Home'
import BrowsePets from './pages/BrowsePets'
import AIPetMatch from './pages/AIPetMatch'
import MeetGreet from './pages/MeetGreet'
import AdoptionTracker from './pages/AdoptionTracker'
import Support from './pages/Support'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function App() {
  const [user, setUser] = useState(null)

  // Mock login function
  const handleLogin = (userData) => {
    setUser(userData)
  }

  // Mock logout function
  const handleLogout = () => {
    setUser(null)
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<BrowsePets />} />
        <Route path="/match" element={<AIPetMatch />} />
        <Route path="/meet-greet" element={<MeetGreet />} />
        <Route path="/adoption-tracker" element={<AdoptionTracker />} />
        <Route path="/support" element={<Support />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App