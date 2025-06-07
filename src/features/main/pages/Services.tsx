// src/features/main/pages/Services.tsx

import { Link } from 'react-router-dom'
import { Coffee, Code, GraduationCap, Bug, Briefcase } from 'lucide-react'
import Card from '../../../shared/component/ui/Card'

export default function Services() {
  const services = [
    {
      icon: <Briefcase className="w-12 h-12 text-primary" />,
      title: 'QA Career Hub',
      description: '큐레이션된 QA 채용 공고와 커리어 인사이트를 제공합니다. 제임스컴퍼니가 엄선한 QA 포지션만을 소개합니다.',
      features: ['엄선된 QA 포지션', '제임스의 한마디', 'QA 인증 기업', '합격 축하금 지원'],
      link: '/services/recruitment',
      isNew: true
    },
    {
      icon: <Coffee className="w-12 h-12 text-primary" />,
      title: '커피챗',
      description: '1:1 맞춤형 상담 서비스로 당신의 고민을 해결해드립니다. Google Calendar와 연동되어 편리하게 일정을 관리할 수 있습니다.',
      features: ['온라인/오프라인 선택 가능', 'Google Calendar 연동', '유연한 일정 조정'],
      link: '/services/coffee-chat'
    },
    {
      icon: <Code className="w-12 h-12 text-primary" />,
      title: 'CaseMaker',
      description: 'AI 기반 테스트 케이스 자동 생성 도구로 QA 업무의 효율성을 극대화합니다.',
      features: ['자동 테스트 케이스 생성', '다양한 형식 지원', '팀 협업 기능'],
      link: '/services/casemaker'
    },
    {
      icon: <GraduationCap className="w-12 h-12 text-primary" />,
      title: '교육 서비스',
      description: 'QA 엔지니어와 SDET를 위한 전문 교육 프로그램을 제공합니다.',
      features: ['실무 중심 커리큘럼', '멘토링 지원', '수료증 발급'],
      link: '/services/education'
    },
    {
      icon: <Bug className="w-12 h-12 text-primary" />,
      title: 'Bug Bounty Arena',
      description: '앱 출시 전 실제 사용자들의 피드백을 받아 품질을 향상시킬 수 있습니다.',
      features: ['베타 테스터 모집', '상세한 버그 리포트', '사용자 피드백 분석'],
      link: '/services/bug-bounty'
    }
  ]

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">우리의 서비스</h1>
          <p className="text-xl text-gray-600">
            James Company가 제공하는 다양한 서비스를 만나보세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="p-8 relative">
              {service.isNew && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                  NEW
                </div>
              )}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">{service.icon}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={service.link}
                    className="text-primary font-semibold hover:underline"
                  >
                    자세히 알아보기 →
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}