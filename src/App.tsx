// src/App.tsx

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ServiceTransitionModal from "./components/ServiceTransitionModal";

// Import pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Profile from "./pages/Profile";

// Dashboard
import Dashboard from "./pages/Dashboard";

// About
import About from "./pages/About";

// Services
import Services from "./pages/services/Services";

// Coffee Chat
import CoffeeChat from "./pages/services/coffee-chat/CoffeeChat";
import CoffeeChatBooking from "./pages/services/coffee-chat/CoffeeChatBooking";
import CalendarCallback from "./pages/services/coffee-chat/CalendarCallback";
import MentorRegistration from "./pages/services/coffee-chat/MentorRegistration";
import BookingSuccess from "./pages/services/coffee-chat/BookingSuccess";
import BookingFailed from "./pages/services/coffee-chat/BookingFailed";
import MyBookings from "./pages/mypage/MyBookings";
import MentorDashboard from "./pages/mentor/MentorDashboard";

// Other Services
import CaseMaker from "./pages/services/CaseMaker";
import QAuto from "./pages/services/QAuto";
import Education from "./pages/services/education/Education";
import BugBountyArena from "./pages/services/bug-bounty/BugBountyArena";

// Insights
import Insights from "./pages/insights/Insights";
import Notice from "./pages/insights/Notice";
import Story from "./pages/insights/Story";
import StudyNote from "./pages/insights/StudyNote";
import Interview from "./pages/insights/Interview";

// Contact
import Contact from "./pages/Contact";

function App() {
  const [showTransitionModal, setShowTransitionModal] = useState(false);
  const [hasSeenModal, setHasSeenModal] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 모달을 보여줄지 결정
    // Note: localStorage를 사용할 수 없으므로 세션 동안만 유지됨
    if (!hasSeenModal) {
      setShowTransitionModal(true);
    }
  }, [hasSeenModal]);

  const handleCloseModal = () => {
    setShowTransitionModal(false);
    setHasSeenModal(true);
  };

  return (
    <Router>
      {/* Service Transition Modal */}
      <ServiceTransitionModal 
        isOpen={showTransitionModal} 
        onClose={handleCloseModal} 
      />
      
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="auth/signup" element={<Signup />} />
          <Route path="profile" element={<Profile />} />

          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* About */}
          <Route path="about" element={<About />} />

          {/* Services */}
          <Route path="services" element={<Services />} />
          <Route path="services/coffee-chat" element={<CoffeeChat />} />
          <Route path="services/coffee-chat/mentor-registration" element={<MentorRegistration />} />
          <Route path="services/coffee-chat/booking/:mentorId" element={<CoffeeChatBooking />} />
          <Route path="services/coffee-chat/calendar-callback" element={<CalendarCallback />} />
          <Route path="services/coffee-chat/booking-success" element={<BookingSuccess />} />
          <Route path="services/coffee-chat/booking-failed" element={<BookingFailed />} />
          
          {/* MyPage */}  
          <Route path="mypage/bookings" element={<MyBookings />} />

          {/* Mentor */}
          <Route path="mentor/dashboard" element={<MentorDashboard />} />

          <Route path="services/casemaker" element={<CaseMaker />} />
          <Route path="services/qauto" element={<QAuto />} />
          <Route path="services/education" element={<Education />} />
          <Route path="services/bug-bounty" element={<BugBountyArena />} />

          {/* Insights */}
          <Route path="insights" element={<Insights />} />
          <Route path="insights/notice" element={<Notice />} />
          <Route path="insights/story" element={<Story />} />
          <Route path="insights/study-note" element={<StudyNote />} />
          <Route path="insights/interview" element={<Interview />} />

          {/* Contact */}
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;