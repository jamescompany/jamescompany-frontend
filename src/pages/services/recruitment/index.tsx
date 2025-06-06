// src/pages/services/recruitment/index.tsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RecruitmentHero from './components/RecruitmentHero';
import ViewIntro from './components/ViewIntro';
import ViewCulture from './components/ViewCulture';
import ViewMission from './components/ViewMission';
import ViewRewards from './components/ViewRewards';
import ViewAction from './components/ViewAction';

const RecruitmentMainPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    { id: 'hero', component: RecruitmentHero },
    { id: 'intro', component: ViewIntro },
    { id: 'culture', component: ViewCulture },
    { id: 'mission', component: ViewMission },
    { id: 'rewards', component: ViewRewards },
    { id: 'action', component: ViewAction }
  ];

  const handleViewJobListings = () => {
    navigate('/services/recruitment/jobs');
  };

  const handlePostJob = () => {
    navigate('/services/recruitment/post');
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="space-y-4">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(index);
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === index
                  ? 'bg-white scale-125'
                  : 'bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to ${section.id} section`}
            />
          ))}
        </div>
      </div>

      {/* Sections */}
      {sections.map((section) => {
        const Component = section.component;
        return (
          <section
            key={section.id}
            id={section.id}
            className="relative min-h-screen flex items-center justify-center"
          >
            <Component
              onViewJobs={handleViewJobListings}
              onPostJob={handlePostJob}
            />
          </section>
        );
      })}

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 left-8 z-50 flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleViewJobListings}
          className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg"
        >
          <Briefcase className="w-5 h-5" />
          채용공고 보기
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
};

export default RecruitmentMainPage;