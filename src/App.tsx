// src/App.tsx

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./shared/component/layout/Layout";
import ServiceTransitionModal from "./features/external-services/components/ServiceTransitionModal";
import ScrollToTop from "./shared/component/ScrollToTop";

// Import pages
import Home from "./pages/Home";
import Login from "./features/auth/pages/Login";
import Signup from "./features/auth/pages/Signup";
import Profile from "./features/profile/pages/Profile";

// Dashboard
import Dashboard from "./pages/Dashboard";

// About
import About from "./pages/About";

// Services
import Services from "./features/main/pages/ServiceHub";
import ServiceHub from "./features/main/pages/ServiceHub";

// Coffee Chat
import CoffeeChat from "./features/coffee-chat/pages/CoffeeChat";
import CoffeeChatBooking from "./features/coffee-chat/pages/CoffeeChatBooking";
import CalendarCallback from "./features/coffee-chat/pages/CalendarCallback";
import MentorRegistration from "./features/coffee-chat/pages/MentorRegistration";

import BookingSuccess from './features/coffee-chat/pages/BookingSuccess';
import BookingFailed from './features/coffee-chat/pages/BookingFailed';

import PaymentSuccess from "./features/recruitment/pages/PaymentSuccess";
import PaymentFail from "./features/recruitment/pages/PaymentFail";

import MyBookings from "./features/profile/pages/MyBookings";
import MyApplications from "./features/profile/pages/MyApplications";
import MentorDashboard from "./features/mentor/pages/MentorDashboard";

// Recruitment
import QARecruitment from './features/recruitment/pages/QARecruitment';
import QARecruitmentWithMap from './features/recruitment/pages/QARecruitmentWithMap';
import RecruitmentPost from './features/recruitment/pages/RecruitmentPost';
import RecruitmentPostComplete from './features/recruitment/pages/RecruitmentPostComplete';

// Company
import CompanyRecruitmentDashboard from "./features/company/pages/CompanyRecruitmentDashboard";

// Application


// Other Services
import CaseMaker from "./features/external-services/pages/CaseMakerIntro";
import QAuto from "./features/external-services/pages/QAuto";
import Education from "./features/education/pages/Education";
import BugBountyArena from "./features/bug-bounty/pages/BugBountyArena";

// Insights
import Insights from "./features/insights/pages/Insights";
import Notice from "./features/insights/pages/Notice";
import Story from "./features/insights/pages/Story";
import StudyNote from "./features/insights/pages/StudyNote";
import Interview from "./features/insights/pages/Interview";

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
      {/* ScrollToTop 컴포넌트 추가 */}
      <ScrollToTop />
      
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
          <Route path="services-hub" element={<ServiceHub />} />
          <Route path="services/coffee-chat" element={<CoffeeChat />} />
          <Route path="services/coffee-chat/mentor-registration" element={<MentorRegistration />} />
          <Route path="services/coffee-chat/booking/:mentorId" element={<CoffeeChatBooking />} />
          <Route path="services/coffee-chat/calendar-callback" element={<CalendarCallback />} />
          
          <Route path="services/coffee-chat/booking-success" element={<BookingSuccess />} />
          <Route path="services/coffee-chat/booking-failed" element={<BookingFailed />} />
          
          <Route path="services/recruitment/payment/success" element={<PaymentSuccess />} />
          <Route path="services/recruitment/payment/fail" element={<PaymentFail />} />
          
          {/* Recruitment */}
          <Route path="services/recruitment" element={<QARecruitment />} />
          <Route path="services/recruitment/with-map" element={<QARecruitmentWithMap />} />
          <Route path="/services/recruitment/jobs" element={<QARecruitmentWithMap />} />
          <Route path="/services/recruitment/post" element={<RecruitmentPost />} />
          <Route path="/services/recruitment/post/complete" element={<RecruitmentPostComplete />} />  
          
          {/* Company */}
          <Route path="/company/dashboard/:token" element={<CompanyRecruitmentDashboard />} />

          {/* MyPage */}  
          <Route path="mypage/bookings" element={<MyBookings />} />
          <Route path="mypage/applications" element={<MyApplications />} />

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