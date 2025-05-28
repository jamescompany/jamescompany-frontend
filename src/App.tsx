import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/auth/ProtectedRoute'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'
import Insights from './pages/insights/Insights'
import CoffeeChat from './pages/services/CoffeeChat'
import CaseMaker from './pages/services/CaseMaker'
import Education from './pages/services/Education'
import BugBounty from './pages/services/BugBounty'
import ImwebCallback from './pages/auth/ImwebCallback'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="services/coffee-chat" element={<CoffeeChat />} />
        <Route path="services/casemaker" element={<CaseMaker />} />
        <Route path="services/education" element={<Education />} />
        <Route path="services/bug-bounty" element={<BugBounty />} />
        <Route path="insights" element={<Insights />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="auth/imweb-callback" element={<ImwebCallback />} />
        <Route path="/auth/callback/imweb" element={<ImwebCallback />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default App