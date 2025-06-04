// src/services/Services.tsx 

import { Link } from 'react-router-dom';
// import { Coffee, FileText, Zap, GraduationCap, Bug } from 'lucide-react';
import { Coffee, GraduationCap, Bug } from 'lucide-react';

const services = [
  {
    id: 'coffee-chat',
    title: '커피챗',
    description: 'QA 전문가와 1:1 멘토링을 통해 경험을 공유하고 성장하세요',
    icon: Coffee,
    link: '/services/coffee-chat',
    color: 'bg-blue-500',
    isExternal: false
  },
  // {
  //   id: 'casemaker',
  //   title: 'CaseMaker',
  //   description: '테스트 케이스를 자동으로 생성하고 관리하는 스마트한 도구',
  //   icon: FileText,
  //   link: '/services/casemaker',
  //   color: 'bg-green-500',
  //   isExternal: true
  // },
  // {
  //   id: 'qauto',
  //   title: 'QAuto',
  //   description: '테스트 자동화를 위한 강력하고 직관적인 솔루션',
  //   icon: Zap,
  //   link: '/services/qauto',
  //   color: 'bg-purple-500',
  //   isExternal: true
  // },
  {
    id: 'education',
    title: '교육 서비스',
    description: 'QA 전문가가 되기 위한 체계적인 교육 프로그램',
    icon: GraduationCap,
    link: '/services/education',
    color: 'bg-orange-500',
    isExternal: false
  },
  {
    id: 'bug-bounty',
    title: 'Bug Bounty Arena',
    description: '베타 테스터를 모집하고 품질 피드백을 받는 플랫폼',
    icon: Bug,
    link: '/services/bug-bounty',
    color: 'bg-red-500',
    isExternal: false
  }
];

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            서비스
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            QA 전문가를 위한 다양한 도구와 서비스를 제공합니다
          </p>
        </div>

        {/* 서비스 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.id}
                to={service.link}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group"
              >
                <div className="p-6">
                  <div className={`${service.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center text-blue-600 font-medium">
                    <span>{service.isExternal ? '바로가기' : '자세히 보기'}</span>
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                  {service.isExternal && (
                    <div className="mt-2">
                      <span className="text-xs text-gray-500">외부 서비스</span>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* 추가 정보 */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            JamesCompany 멤버십
          </h2>
          <p className="text-gray-600 mb-6">
            JamesCompany에 가입하시면 모든 서비스를 더욱 편리하게 이용하실 수 있습니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">Free</h3>
                <p className="text-3xl font-bold mb-2">₩0</p>
                <p className="text-sm text-gray-600">기본 서비스 이용</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">Basic</h3>
                <p className="text-3xl font-bold mb-2">₩9,900</p>
                <p className="text-sm text-gray-600">우선 예약 및 할인 혜택</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-purple-50 border-2 border-purple-500 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">Pro</h3>
                <p className="text-3xl font-bold mb-2">₩29,900</p>
                <p className="text-sm text-gray-600">무제한 이용 및 프리미엄 기능</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;