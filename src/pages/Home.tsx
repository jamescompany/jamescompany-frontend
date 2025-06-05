// src/pages/Home.tsx

import React from 'react';
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
  CheckCircle,
  TrendingUp,
  Sparkles
} from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: '커피챗',
      description: '구글 캘린더와 연동하여 멘토링 일정을 효율적으로 관리하세요',
      icon: Coffee,
      link: '/services/coffee-chat',
      color: 'bg-amber-500',
      features: ['1:1 멘토링', '일정 자동 관리', '실시간 예약']
    },
    {
      title: 'CaseMaker',
      description: '전문적인 테스트 케이스를 빠르고 체계적으로 작성하세요',
      icon: FileText,
      link: '/services/casemaker',
      isExternal: true,
      externalUrl: 'https://casemaker.jamescompany.kr',
      color: 'bg-blue-500',
      features: ['AI 기반 생성', '템플릿 제공', '팀 협업']
    },
    {
      title: 'QAuto',
      description: '자동화 테스트를 쉽고 강력하게 구현하세요',
      icon: Zap,
      link: '/services/qauto',
      isExternal: true,
      externalUrl: 'https://qauto.jamescompany.kr',
      color: 'bg-purple-500',
      features: ['노코드 자동화', '크로스 브라우저', 'CI/CD 연동']
    },
    {
      title: '교육 서비스',
      description: 'QA 전문가가 되기 위한 체계적인 교육 커리큘럼',
      icon: GraduationCap,
      link: '/services/education',
      color: 'bg-green-500',
      features: ['실무 중심', '단계별 학습', '수료증 발급']
    },
    {
      title: 'Bug Bounty Arena',
      description: '베타 테스터를 모집하고 품질 높은 피드백을 받으세요',
      icon: Bug,
      link: '/services/bug-bounty',
      color: 'bg-red-500',
      features: ['리워드 시스템', '실시간 리포트', '통계 분석']
    }
  ];

  const stats = [
    { label: '활성 사용자', value: '1,200+', icon: Users },
    { label: '누적 테스트 케이스', value: '50K+', icon: FileText },
    { label: '평균 만족도', value: '4.8/5', icon: Star },
    { label: '보안 인증', value: 'ISO 27001', icon: Shield }
  ];

  const handleServiceClick = (service: any) => {
    if (service.isExternal) {
      window.open(service.externalUrl, '_blank');
    } else {
      navigate(service.link);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              새롭게 시작하는 JamesCompany
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              QA 엔지니어를 위한<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                올인원 플랫폼
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              테스트 케이스 작성부터 자동화, 교육, 멘토링까지<br />
              QA 업무의 모든 것을 한 곳에서 해결하세요
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth/register"
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                무료로 시작하기
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-300 transition-colors duration-200"
              >
                서비스 둘러보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg mb-3">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              QA 업무를 혁신하는 서비스
            </h2>
            <p className="text-lg text-gray-600">
              각 분야 전문가들이 만든 도구로 업무 효율을 극대화하세요
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => handleServiceClick(service)}
                className="group relative bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 ${service.color} text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                  {service.title}
                  {service.isExternal && (
                    <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      외부 링크
                    </span>
                  )}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-500">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            회원가입 후 모든 서비스를 무료로 체험해보실 수 있습니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth/register"
              className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 font-medium rounded-lg transition-colors duration-200"
            >
              <TrendingUp className="mr-2 w-5 h-5" />
              무료 회원가입
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center px-8 py-4 bg-transparent hover:bg-white/10 text-white font-medium rounded-lg border border-white/30 transition-colors duration-200"
            >
              더 알아보기
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">안전한 데이터 보호</h3>
              <p className="text-gray-600">
                최신 보안 기술로 여러분의 데이터를 안전하게 보호합니다
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">빠른 업무 처리</h3>
              <p className="text-gray-600">
                자동화된 프로세스로 반복 작업을 최소화합니다
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">전문가 네트워크</h3>
              <p className="text-gray-600">
                QA 전문가들과 함께 성장하는 커뮤니티
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;