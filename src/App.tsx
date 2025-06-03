import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';  // 경로 수정: ./components/auth → ./pages/auth
import Profile from './pages/Profile';

// Services
import Services from './pages/services/Services';

// Coffee Chat
import CoffeeChat from './pages/services/coffee-chat/CoffeeChat';
import CoffeeChatBooking from './pages/services/coffee-chat/CoffeeChatBooking';
import BookingSuccess from './pages/services/coffee-chat/BookingSuccess';
import BookingFailed from './pages/services/coffee-chat/BookingFailed';
import MentorRegistration from './pages/services/coffee-chat/MentorRegistration';

// Other Services
import CaseMaker from './pages/services/CaseMaker';
import QAuto from './pages/services/QAuto';
import Education from './pages/services/education/Education';
import BugBountyArena from './pages/services/bug-bounty/BugBountyArena';

// Insights
import Insights from './pages/insights/Insights';
import Notice from './pages/insights/Notice';
import Story from './pages/insights/Story';
import StudyNote from './pages/insights/StudyNote';
import Interview from './pages/insights/Interview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          
          {/* Services */}
          <Route path="services" element={<Services />} />
          <Route path="services/coffee-chat" element={<CoffeeChat />} />
          <Route path="services/coffee-chat/booking/:mentorId" element={<CoffeeChatBooking />} />
          <Route path="services/coffee-chat/booking-success" element={<BookingSuccess />} />
          <Route path="services/coffee-chat/booking-failed" element={<BookingFailed />} />
          <Route path="services/coffee-chat/mentor-registration" element={<MentorRegistration />} />
          
          <Route path="services/casemaker" element={<CaseMaker />} />
          <Route path="services/qauto" element={<QAuto />} />
          <Route path="services/education" element={<Education />} />
          <Route path="services/bug-bounty-arena" element={<BugBountyArena />} />
          
          {/* Insights */}
          <Route path="insights" element={<Insights />} />
          <Route path="insights/notice" element={<Notice />} />
          <Route path="insights/story" element={<Story />} />
          <Route path="insights/study-note" element={<StudyNote />} />
          <Route path="insights/interview" element={<Interview />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;