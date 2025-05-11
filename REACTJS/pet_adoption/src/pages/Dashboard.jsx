import { Container, Row, Col, Card, Table, Badge, ProgressBar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Mock user data if none provided
const defaultUser = {
  id: 1,
  name: 'Demo User',
  email: 'demo@example.com',
  points: 450,
  badges: 5,
  profileImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
}

// Mock badges data
const badgesData = [
  { id: 1, name: 'Profile Completer', icon: 'bi-person-check', color: 'primary', earned: true },
  { id: 2, name: 'Quiz Master', icon: 'bi-trophy', color: 'warning', earned: true },
  { id: 3, name: 'First Meet & Greet', icon: 'bi-camera-video', color: 'info', earned: true },
  { id: 4, name: 'Adoption Hero', icon: 'bi-heart-fill', color: 'danger', earned: true },
  { id: 5, name: 'Community Contributor', icon: 'bi-chat-dots', color: 'success', earned: true },
  { id: 6, name: 'Pet Care Expert', icon: 'bi-book', color: 'secondary', earned: false }
]

// Mock leaderboard data
const leaderboardData = [
  { rank: 1, name: 'Sarah Johnson', points: 780, badges: 8 },
  { rank: 2, name: 'Michael Chen', points: 650, badges: 7 },
  { rank: 3, name: 'Emma Williams', points: 590, badges: 6 },
  { rank: 4, name: 'Demo User', points: 450, badges: 5, isCurrentUser: true },
  { rank: 5, name: 'David Rodriguez', points: 420, badges: 4 }
]

// Mock adoption activity
const adoptionActivity = [
  { id: 1, type: 'Meet & Greet', pet: 'Luna', date: '2023-11-10', status: 'Completed' },
  { id: 2, type: 'Application', pet: 'Max', date: '2023-11-05', status: 'Approved' },
  { id: 3, type: 'Home Check', pet: 'Max', date: '2023-11-15', status: 'Scheduled' }
]

const Dashboard = ({ user = defaultUser }) => {
  // Calculate progress to next level
  const nextLevelPoints = 500
  const currentPoints = user.points
  const progressPercent = Math.min(Math.round((currentPoints / nextLevelPoints) * 100), 100)
  
  return (
    <div className="bg-light py-5">
      <Container>
        <h1 className="mb-4">Your Dashboard</h1>
        
        <Row>
          {/* User Profile Card */}
          <Col lg={4} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="text-center">
                <div className="mb-3">
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="rounded-circle img-thumbnail"
                    width="120"
                    height="120"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h3 className="mb-1">{user.name}</h3>
                <p className="text-muted mb-3">{user.email}</p>
                
                <div className="d-flex justify-content-center mb-3">
                  <div className="px-3 border-end">
                    <h4 className="mb-0">{user.points}</h4>
                    <small className="text-muted">Points</small>
                  </div>
                  <div className="px-3">
                    <h4 className="mb-0">{user.badges}</h4>
                    <small className="text-muted">Badges</small>
                  </div>
                </div>
                
                <Card className="bg-light border-0 mb-3">
                  <Card.Body className="py-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span>Progress to next level</span>
                      <span>{user.points}/{nextLevelPoints}</span>
                    </div>
                    <ProgressBar now={progressPercent} variant="primary" />
                  </Card.Body>
                </Card>
                
                <div className="d-grid gap-2">
                  <Link to="/profile" className="btn btn-outline-primary">
                    Edit Profile
                  </Link>
                  <Link to="/adoption-tracker" className="btn btn-outline-secondary">
                    View Adoption Tracker
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          {/* Recent Activity */}
          <Col lg={8} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white py-3">
                <h5 className="mb-0">Recent Adoption Activity</h5>
              </Card.Header>
              <Card.Body>
                {adoptionActivity.length > 0 ? (
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>Activity</th>
                        <th>Pet</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adoptionActivity.map(activity => (
                        <tr key={activity.id}>
                          <td>{activity.type}</td>
                          <td>{activity.pet}</td>
                          <td>{new Date(activity.date).toLocaleDateString()}</td>
                          <td>
                            <Badge bg={
                              activity.status === 'Completed' ? 'success' :
                              activity.status === 'Approved' ? 'info' :
                              activity.status === 'Scheduled' ? 'primary' :
                              'secondary'
                            }>
                              {activity.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <div className="text-center py-4">
                    <i className="bi bi-calendar-x display-1 text-secondary opacity-50"></i>
                    <p className="mt-3">No recent activity</p>
                    <Link to="/browse" className="btn btn-primary">
                      Browse Pets
                    </Link>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row>
          {/* Badges */}
          <Col lg={8} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white py-3">
                <h5 className="mb-0">Your Badges</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  {badgesData.map(badge => (
                    <Col xs={6} md={4} key={badge.id} className="mb-4">
                      <Card className={`border-0 badge-card text-center ${!badge.earned ? 'opacity-50' : ''}`}>
                        <Card.Body>
                          <div 
                            className={`icon-circle bg-${badge.color} text-white mx-auto mb-3 d-flex align-items-center justify-content-center`}
                            style={{ width: '70px', height: '70px', borderRadius: '50%' }}
                          >
                            <i className={`bi ${badge.icon} fs-2`}></i>
                          </div>
                          <h6 className="mb-0">{badge.name}</h6>
                          <small className="text-muted">
                            {badge.earned ? 'Earned' : 'Locked'}
                          </small>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
          
          {/* Leaderboard */}
          <Col lg={4} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white py-3">
                <h5 className="mb-0">Leaderboard</h5>
              </Card.Header>
              <Card.Body className="p-0">
                <Table responsive className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>Rank</th>
                      <th>User</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardData.map(user => (
                      <tr key={user.rank} className={user.isCurrentUser ? 'table-primary' : ''}>
                        <td>#{user.rank}</td>
                        <td>
                          {user.name} 
                          {user.isCurrentUser && <span className="badge bg-primary ms-2">You</span>}
                        </td>
                        <td>{user.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
              <Card.Footer className="bg-white text-center">
                <Link to="/leaderboard" className="text-decoration-none">
                  View Full Leaderboard
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Dashboard