// src/features/external-services/pages/CaseMakerRedirect.tsx

import Button from '../../../shared/component/ui/Button'
import { CheckCircle, Zap, Users, FileText, ExternalLink } from 'lucide-react'
import Card from '../../../shared/component/ui/Card'

export default function CaseMaker() {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: 'AI 기반 자동 생성',
      description: '요구사항만 입력하면 AI가 테스트 케이스를 자동으로 생성해줍니다.'
    },
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: '다양한 형식 지원',
      description: 'Excel, CSV, JSON 등 다양한 포맷으로 내보낼 수 있습니다.'
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: '실시간 협업',
      description: '팀원들과 테스트 케이스를 함께 작성하고 수정할 수 있습니다.'
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
      title: '품질 검증 도구 내장',
      description: '생성된 테스트 케이스의 커버리지와 품질을 자동으로 분석합니다.'
    }
  ]



  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">🔍 CaseMaker 소개</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            James Company에서 개발한 AI 기반 테스트 케이스 자동 생성 도구입니다.<br />
            기존의 수작업 QA 프로세스를 혁신하여,<br />
            QA 엔지니어가 더 전략적인 활동에 집중할 수 있도록 돕습니다.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-sm text-blue-700">
              💡 CaseMaker는 별도의 서비스로 운영되며, James Company 계정으로 무료로 체험해볼 수 있습니다.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">🧠 주요 기능</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">사용 방법</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">요구사항 입력</h3>
                  <p className="text-gray-600">
                    테스트하려는 기능의 요구사항이나 유저 스토리를 입력합니다
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">AI 분석 및 생성</h3>
                  <p className="text-gray-600">
                    AI가 요구사항을 분석하여 포괄적인 테스트 케이스를 자동 생성합니다
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">검토 및 수정</h3>
                  <p className="text-gray-600">
                    생성된 테스트 케이스를 검토하고 필요시 수정합니다
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">내보내기 및 실행</h3>
                  <p className="text-gray-600">
                    원하는 형식으로 내보내어 테스트 관리 도구에서 사용합니다
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Reference */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-4">요금제 참고</h2>
          <p className="text-center text-gray-600 mb-12">
            ※ 아래 요금제는 참고용이며, 실제 요금 및 결제는 CaseMaker 서비스에서 확인하실 수 있습니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Free</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">₩0</span>
                <span className="text-gray-500">/월</span>
              </div>
              <p className="text-gray-600 mb-6">개인 프로젝트와 학습용으로 최적화</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">프로젝트 3개까지 생성</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">프로젝트당 테스트 케이스 10개</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">기본 템플릿 제공</span>
                </li>
              </ul>
            </div>

            {/* Basic Plan */}
            <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full">추천</span>
              </div>
              <div className="mb-4 pt-4">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">⚡ Basic</h3>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">₩9,900</span>
                <span className="text-gray-500">/월</span>
              </div>
              <p className="text-gray-600 mb-6">소규모 팀과 전문가를 위한 필수 기능</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">프로젝트 20개까지 생성</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">프로젝트당 테스트 케이스 100개</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Excel 내보내기 지원</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">팀원 5명까지 협업</span>
                </li>
              </ul>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border border-purple-300">
              <div className="mb-4">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">👑 Pro</h3>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">₩29,900</span>
                <span className="text-gray-500">/월</span>
              </div>
              <p className="text-gray-600 mb-6">대규모 프로젝트를 위한 프리미엄 기능</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">무제한 프로젝트 생성</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">무제한 테스트 케이스</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">AI 기반 테스트 케이스 제안</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">우선 지원 서비스</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">API 액세스 및 커스텀 템플릿</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gray-50 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">
            🚀 지금 바로 사용해보세요
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            AI로 테스트 케이스 작성 시간을 90% 단축하세요
          </p>
          <a 
            href="/casemaker" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button size="lg" className="text-lg px-8 py-4">
              <span className="flex items-center gap-2">
                CaseMaker 사용하러 가기 <ExternalLink className="w-5 h-5" />
              </span>
            </Button>
          </a>
          <p className="text-sm text-gray-500 mt-4">
            ※ CaseMaker의 요금제 및 상세 기능은 별도 페이지에서 확인하실 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  )
}