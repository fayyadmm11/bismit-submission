import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import TimelinePage from './pages/TimelinePage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        {/* Route Level 3+ akan ditambahkan nanti */}
        {/* <Route path="/login"    element={<LoginPage />} /> */}
        {/* <Route path="/register" element={<RegisterPage />} /> */}
      </Routes>
    </Router>
  )
}

export default App
