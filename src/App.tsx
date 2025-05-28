// src/App.tsx

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Contact from "./pages/Contact";
import Insights from "./pages/insights/Insights";
import CoffeeChat from "./pages/services/CoffeeChat";
import CaseMaker from "./pages/services/CaseMaker";
import Education from "./pages/services/Education";
import BugBounty from "./pages/services/BugBounty";
import ImwebCallback from "./pages/auth/ImwebCallback";
import ScrollToTop from "./components/ScrollToTop";
import QAMentorChatbot from './components/QAMentorChatbot'
// QAMentorSection은 필요한 페이지에서만 import

function App() {
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
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="auth/imweb-callback" element={<ImwebCallback />} />
          <Route path="/auth/callback/imweb" element={<ImwebCallback />} />
          {/* QA 멘토 관련 라우트 제거 - 플로팅 챗봇으로만 사용 */}
        </Route>
      </Routes>
      
      {/* QA 멘토 챗봇 - 모든 페이지에서 플로팅으로 표시 */}
      <QAMentorChatbot />
    </BrowserRouter>
  );
}

export default App;