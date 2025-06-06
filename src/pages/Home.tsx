// src/pages/Home.tsx

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Coffee, 
  FileText, 
  Zap, 
  GraduationCap, 
  Bug, 
  ArrowRight,
  Users,
  Star,
  Shield,
  Sparkles,
  Briefcase,
  ChevronDown,
  ExternalLink
} from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);

  const services = [
    {
      title: 'QA Career Hub',
      subtitle: '당신의 QA 커리어를 한 단계 업그레이드',
      description: '엄선된 QA 채용 공고와 전문가의 인사이트로 더 나은 커리어를 만들어가세요',
      icon: Briefcase,
      link: '/services/recruitment',
      bgColor: 'bg-gradient-to-br from-purple-50 to-blue-50',
      iconColor: 'text-purple-600',
      features: [
        '큐레이션된 QA 포지션만 엄선',
        '제임스의 한마디로 JD 해석 지원',
        'QA 인증 기업 뱃지 제공'
      ],
      isNew: true
    },
    {
      title: '커피챗',
      subtitle: '경험 많은 멘토와의 1:1 만남',
      description: '구글 캘린더와 연동하여 멘토링 일정을 효율적으로 관리하고, QA 전문가의 노하우를 배워보세요',
      icon: Coffee,
      link: '/services/coffee-chat',
      bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50',
      iconColor: 'text-amber-600',
      features: [
        '실시간 일정 확인 및 예약',
        '구글 캘린더 자동 연동',
        '멘토 프로필 및 후기 확인'
      ]
    },
    {
      title: 'CaseMaker',
      subtitle: 'AI가 도와주는 테스트 케이스 작성',
      description: '전문적인 테스트 케이스를 빠르고 체계적으로 작성하세요. 팀과 함께 협업하며 품질을 높여보세요',
      icon: FileText,
      link: '/services/casemaker',
      isExternal: true,
      externalUrl: 'https://casemaker.jamescompany.kr',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      iconColor: 'text-blue-600',
      features: [
        'AI 기반 테스트 케이스 생성',
        '다양한 템플릿 제공',
        '실시간 팀 협업 지원'
      ]
    },
    {
      title: 'QAuto',
      subtitle: '코딩 없이 만드는 자동화 테스트',
      description: '복잡한 코드 없이도 강력한 자동화 테스트를 구현하세요. 노코드로 시작하는 테스트 자동화',
      icon: Zap,
      link: '/services/qauto',
      isExternal: true,
      externalUrl: 'https://qauto.jamescompany.kr',
      bgColor: 'bg-gradient-to-br from-indigo-50 to-purple-50',
      iconColor: 'text-indigo-600',
      features: [
        '드래그 앤 드롭 자동화',
        '크로스 브라우저 테스트',
        'CI/CD 파이프라인 연동'
      ]
    },
    {
      title: '교육 서비스',
      subtitle: 'QA 전문가로 성장하는 체계적인 커리큘럼',
      description: '입문부터 전문가까지, 단계별 교육 프로그램으로 QA 역량을 키워보세요',
      icon: GraduationCap,
      link: '/services/education',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
      iconColor: 'text-green-600',
      features: [
        '실무 중심 커리큘럼',
        '레벨별 맞춤 학습',
        '수료증 발급'
      ]
    },
    {
      title: 'Bug Bounty Arena',
      subtitle: '품질 높은 베타 테스트의 시작',
      description: '출시 전 제품의 버그를 찾아주는 베타 테스터를 모집하고, 체계적인 피드백을 받아보세요',
      icon: Bug,
      link: '/services/bug-bounty',
      bgColor: 'bg-gradient-to-br from-red-50 to-pink-50',
      iconColor: 'text-red-600',
      features: [
        '리워드 기반 테스팅',
        '실시간 버그 리포트',
        '상세한 통계 분석'
      ]
    }
  ];

  const stats = [
    { label: '활성 사용자', value: '1,200+', icon: Users },
    { label: '누적 테스트 케이스', value: '50K+', icon: FileText },
    { label: '평균 만족도', value: '4.8/5', icon: Star },
    { label: '보안 인증', value: 'ISO 27001', icon: Shield }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const section = Math.round(scrollPosition / windowHeight);
      setCurrentSection(section);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleServiceClick = (service: any) => {
    if (service.isExternal) {
      window.open(service.externalUrl, '_blank');
    } else {
      navigate(service.link);
    }
  };

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
      {/* Hero Section */}
      <section className="snap-start h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white relative">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 text-center">
          <div className="space-y-4">
            <div className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              새롭게 시작하는 JamesCompany
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              QA 엔지니어를 위한<br />
              <span className="text-blue-600">
                올인원 플랫폼
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              테스트 케이스 작성부터 자동화, 교육, 멘토링까지<br className="hidden sm:inline" />
              QA 업무의 모든 것을 한 곳에서 해결하세요
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-3">
              <Link
                to="/auth/register"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                무료로 시작하기
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-300 transition-colors duration-200"
              >
                서비스 둘러보기
              </Link>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll indicator */}
        <button 
          onClick={scrollToNext}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </button>
      </section>

      {/* Service Sections */}
      {services.map((service, index) => (
        <section 
          key={index} 
          className={`snap-start h-screen flex items-center ${service.bgColor}`}
        >
          <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 w-full">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* 텍스트 콘텐츠 */}
              <div className={`space-y-4 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                {service.isNew && (
                  <span className="inline-flex items-center px-3 py-1 bg-red-500 text-white rounded-full text-sm font-bold">
                    NEW
                  </span>
                )}
                
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {service.title}
                </h2>
                
                <p className="text-lg text-gray-700 font-medium">
                  {service.subtitle}
                </p>
                
                <p className="text-base text-gray-600">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${
                          service.iconColor === 'text-purple-600' ? 'from-purple-500 to-blue-500' :
                          service.iconColor === 'text-amber-600' ? 'from-amber-500 to-orange-500' :
                          service.iconColor === 'text-blue-600' ? 'from-blue-500 to-cyan-500' :
                          service.iconColor === 'text-indigo-600' ? 'from-indigo-500 to-purple-500' :
                          service.iconColor === 'text-green-600' ? 'from-green-500 to-emerald-500' :
                          'from-red-500 to-pink-500'
                        }`} />
                      </div>
                      <span className="ml-2.5 text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handleServiceClick(service)}
                  className="inline-flex items-center px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-all duration-200 group"
                >
                  {service.isExternal ? '서비스 바로가기' : '자세히 알아보기'}
                  {service.isExternal ? (
                    <ExternalLink className="ml-2 w-4 h-4" />
                  ) : (
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  )}
                </button>
              </div>
              
              {/* 아이콘/비주얼 */}
              <div className={`flex items-center justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="relative">
                  <div className="w-48 h-48 md:w-64 md:h-64 bg-white rounded-3xl shadow-xl flex items-center justify-center">
                    <service.icon className={`w-24 h-24 md:w-32 md:h-32 ${service.iconColor}`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="snap-start h-screen flex items-center bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-2xl mx-auto px-3 sm:px-4 lg:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            회원가입 후 모든 서비스를 무료로 체험해보실 수 있습니다
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/auth/register"
              className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-100 text-blue-600 font-bold rounded-lg transition-colors duration-200 text-base"
            >
              무료 회원가입
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-6 py-3 bg-transparent hover:bg-white/10 text-white font-medium rounded-lg border-2 border-white/30 transition-colors duration-200 text-base"
            >
              더 알아보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;