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

// Service Pages
import CoffeeChat from "./pages/services/coffeechat/CoffeeChat"
import CoffeeChatBooking from "./pages/services/coffeechat/CoffeeChatBooking"
import BookingSuccess from "./pages/services/coffeechat/BookingSuccess"
import BookingFailed from "./pages/services/coffeechat/BookingFailed"
import MentorRegistration from "./pages/services/coffeechat/MentorRegistration"

// Other Services
import CaseMaker from "./pages/services/casemaker/CaseMaker"
import Education from "./pages/services/education/Education"
import BugBounty from "./pages/services/bugbounty/BugBounty"

// Auth
import ImwebCallback from "./pages/auth/ImwebCallback"
import OAuthCallback from "./components/auth/OAuthCallback"

// Dashboard
import Dashboard from "./pages/Dashboard"
import MentorDashboard from "./pages/mentor/MentorDashboard"
import RevenueDashboard from "./pages/mentor/RevenueDashboard"

// My Page
import MyBookings from "./pages/mypage/MyBookings"

// Admin
import MentorApprovalPage from "./pages/admin/MentorApprovalPage"

// Components
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
          
          {/* Coffee Chat Service Routes */}
          <Route path="services/coffee-chat" element={<CoffeeChat />} />
          <Route path="services/coffee-chat/booking/:mentorId" element={
            <ProtectedRoute>
              <CoffeeChatBooking />
            </ProtectedRoute>
          } />
          <Route path="services/coffee-chat/booking-success" element={
            <ProtectedRoute>
              <BookingSuccess />
            </ProtectedRoute>
          } />
          <Route path="services/coffee-chat/booking-failed" element={
            <ProtectedRoute>
              <BookingFailed />
            </ProtectedRoute>
          } />
          <Route path="services/coffee-chat/mentor-registration" element={
            <ProtectedRoute>
              <MentorRegistration />
            </ProtectedRoute>
          } />
          
          {/* Other Services */}
          <Route path="services/casemaker" element={<CaseMaker />} />
          <Route path="services/education" element={<Education />} />
          <Route path="services/bug-bounty" element={<BugBounty />} />
          
          {/* Insights */}
          <Route path="insights" element={<Insights />} />
          
          {/* Auth Routes */}
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
          
          {/* Mentor Dashboard Routes */}
          <Route 
            path="mentor/dashboard" 
            element={
              <ProtectedRoute requiredRole="mentor">
                <MentorDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="mentor/revenue" 
            element={
              <ProtectedRoute requiredRole="mentor">
                <RevenueDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin Routes */}
          <Route 
            path="admin/mentor-approval" 
            element={
              <ProtectedRoute requiredRole="admin">
                <MentorApprovalPage />
              </ProtectedRoute>
            } 
          />
          
          {/* My Page Routes */}
          <Route 
            path="my-page/bookings" 
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            } 
          />
          
          {/* Contact */}
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