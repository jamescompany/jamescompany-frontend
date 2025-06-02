// src/App.tsx
import { useEffect } from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { useAuthStore } from './stores/authStore'
import Layout from "./components/layout/Layout"

// Pages
import Home from "./pages/Home"
import About from "./pages/About"
import Services from "./pages/Services"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import Contact from "./pages/Contact"
import Insights from "./pages/insights/Insights"
import CoffeeChat from "./pages/services/CoffeeChat"
import CaseMaker from "./pages/services/CaseMaker"
import Education from "./pages/services/Education"
import BugBounty from "./pages/services/BugBounty"
import ImwebCallback from "./pages/auth/ImwebCallback"
import OAuthCallback from "./components/auth/OAuthCallback"
import Dashboard from "./pages/Dashboard"
import ScrollToTop from "./components/ScrollToTop"
import QAMentorChatbot from './components/QAMentorChatbot'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  const checkAuth = useAuthStore(state => state.checkAuth)
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  useEffect(() => {
    // 토큰이 있지만 인증되지 않은 상태에서만 체크
    const token = localStorage.getItem('access_token')
    if (token && !isAuthenticated) {
      checkAuth()
    }
  }, []) // 의존성 배열을 빈 배열로 변경

  return (
    <BrowserRouter>
      <ScrollToTop />
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
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          
          {/* OAuth Callbacks */}
          <Route path="auth/imweb-callback" element={<ImwebCallback />} />
          <Route path="auth/callback/imweb" element={<ImwebCallback />} />
          <Route path="auth/success" element={<OAuthCallback />} />
          <Route path="auth/error" element={<OAuthCallback />} />
          
          {/* Protected Routes */}
          <Route 
            path="dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Contact 페이지도 인증이 필요한 경우 */}
          <Route 
            path="contact" 
            element={
                <Contact />
            } 
          />
        </Route>
      </Routes>
      
      {/* QA 멘토 챗봇 - 모든 페이지에서 플로팅으로 표시 */}
      <QAMentorChatbot />
    </BrowserRouter>
  )
}

export default App