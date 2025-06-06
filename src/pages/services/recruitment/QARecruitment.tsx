// src/pages/services/recruitment/QARecruitment.tsx

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowDown, ChevronRight, MapPin, Calendar, Users, Zap, Code, Briefcase } from 'lucide-react';
import type { JobPosting } from '../../../types/recruitment';
import { sampleJobs } from '../../../data/recriutment/sampleJobs';
import { getTheme } from '../../../config/companyThemes';
import { useLocationStore, calculateDistance, formatDistance } from '../../../utils/recruitmentHelpers';
import JobDetailModal from './components/JobDetailModal';

const QARecruitment = () => {
  const navigate = useNavigate();
  const { userLocation } = useLocationStore();
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  // 프리미엄 회사만 필터링
  const premiumJobs = sampleJobs.filter(job => job.packageType === 'premium');

  // 섹션 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    sectionsRef.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="space-y-4">
          {['프리미엄 채용', ...premiumJobs.map(job => job.companyName), '전체 보기'].map((name, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(index)}
              className={`group relative flex items-center justify-end transition-all duration-300 ${
                currentSection === index ? 'scale-125' : ''
              }`}
            >
              <span className={`absolute right-8 whitespace-nowrap text-sm font-medium transition-all duration-300 ${
                currentSection === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
              } group-hover:opacity-100 group-hover:translate-x-0`}>
                {name}
              </span>
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSection === index 
                  ? 'bg-white scale-100' 
                  : 'bg-white/30 scale-75 hover:bg-white/60'
              }`} />
            </button>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section
        ref={(el) => {
          if (el) sectionsRef.current[0] = el as HTMLDivElement;
        }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        </div>

        {/* Particle Effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 20}s`,
              }}
            >
              <div className="w-1 h-1 bg-white/30 rounded-full" />
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <div className="mb-8 inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium">프리미엄 QA 채용 쇼케이스</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tighter">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              PREMIUM
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent text-5xl md:text-7xl">
              QA CAREERS
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            엄선된 프리미엄 기업들의 특별한 QA 포지션을 소개합니다
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-2xl">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {premiumJobs.length}+
              </div>
              <div className="text-sm text-gray-400">프리미엄 포지션</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-2xl">
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
                98%
              </div>
              <div className="text-sm text-gray-400">채용 성공률</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-2xl">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ₩5.8M
              </div>
              <div className="text-sm text-gray-400">평균 연봉</div>
            </div>
          </div>

          <button
            onClick={() => scrollToSection(1)}
            className="animate-bounce bg-white/10 backdrop-blur-sm p-4 rounded-full hover:bg-white/20 transition-all duration-300"
          >
            <ArrowDown className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Job Sections */}
      {premiumJobs.map((job, index) => {
        const theme = getTheme(job.companyName);
        let distance: number | null = null;
        
        if (userLocation?.coordinates && job.coordinates) {
          distance = calculateDistance(
            userLocation.coordinates.lat,
            userLocation.coordinates.lng,
            job.coordinates.lat,
            job.coordinates.lng
          );
        }

        return (
          <section
            key={job.id}
            ref={(el) => {
              if (el) sectionsRef.current[index + 1] = el as HTMLDivElement;
            }}
            className="relative min-h-screen flex items-center overflow-hidden"
            style={{ background: theme.bgPattern }}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.bgGradient}`} />
            
            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className={`absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-br ${theme.gradient} rounded-full blur-3xl opacity-20 animate-pulse`} />
              <div className={`absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-br ${theme.gradient} rounded-full blur-3xl opacity-20 animate-pulse animation-delay-2000`} />
            </div>

            {/* Content Grid */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Company Story */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 text-5xl">
                  <span>{theme.icon}</span>
                  <h2 className="font-black tracking-tight">{job.companyName}</h2>
                </div>

                <div className="space-y-6">
                  <h3 className={`text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                    {job.position}
                  </h3>
                  
                  <p className="text-xl text-gray-300 leading-relaxed">
                    {job.summary}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                      <div className="flex items-center gap-3 mb-2">
                        <Briefcase className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-400">연봉</span>
                      </div>
                      <div className="text-2xl font-bold">
                        ₩{job.salaryRange.min / 1000}-{job.salaryRange.max / 1000}k
                      </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-400">위치</span>
                      </div>
                      <div className="text-lg font-semibold">
                        {job.location.split(' ').slice(0, 2).join(' ')}
                        {distance && (
                          <span className="block text-sm text-green-400 mt-1">
                            {formatDistance(distance)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                      <div className="flex items-center gap-3 mb-2">
                        <Users className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-400">팀 구성</span>
                      </div>
                      <div className="text-lg font-semibold">
                        {job.teamStructure.split(' / ')[0]}
                      </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-400">근무형태</span>
                      </div>
                      <div className="text-lg font-semibold capitalize">
                        {job.workType}
                      </div>
                    </div>
                  </div>

                  {/* James Note */}
                  {job.jamesNote && (
                    <div className={`relative bg-gradient-to-r ${theme.gradient} p-[1px] rounded-2xl mt-8`}>
                      <div className="bg-black rounded-2xl p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <Zap className="w-6 h-6 text-white" />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">제임스의 인사이트</h4>
                            <p className="text-gray-300 leading-relaxed">
                              {job.jamesNote}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CTA Button */}
                  <button
                    onClick={() => setSelectedJob(job)}
                    className={`group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${theme.gradient} rounded-2xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105`}
                  >
                    <span className="relative z-10">자세히 보기</span>
                    <ChevronRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </button>
                </div>
              </div>

              {/* Right Column - Visual Elements */}
              <div className="relative">
                {/* Tech Stack Orbit */}
                <div className="relative w-full h-[500px]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-32 h-32 bg-gradient-to-br ${theme.gradient} rounded-full flex items-center justify-center text-4xl font-black`}>
                      <Code className="w-16 h-16" />
                    </div>
                  </div>
                  
                  {/* Orbiting Tools */}
                  {job.tools.slice(0, 6).map((tool, toolIndex) => {
                    const angle = (toolIndex * 360) / Math.min(job.tools.length, 6);
                    const radius = 150;
                    const x = Math.cos((angle * Math.PI) / 180) * radius;
                    const y = Math.sin((angle * Math.PI) / 180) * radius;
                    
                    return (
                      <div
                        key={toolIndex}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        style={{
                          transform: `translate(${x}px, ${y}px)`,
                        }}
                      >
                        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 whitespace-nowrap animate-float"
                          style={{ animationDelay: `${toolIndex * 0.5}s` }}
                        >
                          {tool}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Benefits Tags */}
                <div className="absolute -bottom-8 left-0 right-0 flex flex-wrap gap-3 justify-center">
                  {job.benefits.slice(0, 4).map((benefit, benefitIndex) => (
                    <div
                      key={benefitIndex}
                      className="bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 text-sm animate-fade-in"
                      style={{ animationDelay: `${benefitIndex * 0.1}s` }}
                    >
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA Section - 전체 채용공고 보기 */}
      <section 
        ref={(el) => {
          if (el) sectionsRef.current[premiumJobs.length + 1] = el as HTMLDivElement;
        }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-purple-900/20 to-transparent" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-full text-blue-300 border border-blue-500/30">
              <Sparkles className="w-5 h-5" />
              더 많은 기회가 기다리고 있습니다
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              모든 채용공고 보기
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            지금까지 본 것은 프리미엄 채용공고입니다.
            <br />
            더 다양한 QA 포지션을 지도와 리스트로 확인해보세요.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl mb-3">🗺️</div>
              <h3 className="font-semibold mb-2">지도로 보기</h3>
              <p className="text-sm text-gray-400">내 주변 채용공고를 한눈에</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl mb-3">📋</div>
              <h3 className="font-semibold mb-2">리스트로 보기</h3>
              <p className="text-sm text-gray-400">상세 정보를 빠르게 비교</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="font-semibold mb-2">필터 & 검색</h3>
              <p className="text-sm text-gray-400">원하는 조건으로 찾기</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/services/recruitment/jobs')}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 shadow-xl shadow-purple-500/25"
            >
              <span className="relative z-10 flex items-center gap-3">
                전체 채용공고 보기
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            
            <button
              onClick={() => navigate('/services/recruitment/post')}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              채용공고 등록하기
            </button>
          </div>

          <div className="mt-16 flex justify-center gap-3">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full" />
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full" />
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent rounded-full" />
          </div>
        </div>
      </section>

      {/* Job Detail Modal */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default QARecruitment;