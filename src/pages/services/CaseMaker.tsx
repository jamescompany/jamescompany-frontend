import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import { CheckCircle, Zap, Users, FileText } from 'lucide-react'

export default function CaseMaker() {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: 'AI 기반 자동 생성',
      description: '요구사항을 입력하면 AI가 자동으로 테스트 케이스를 생성합니다'
    },
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: '다양한 형식 지원',
      description: 'Excel, CSV, JSON 등 다양한 형식으로 내보내기 가능'
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: '팀 협업',
      description: '팀원들과 실시간으로 테스트 케이스를 공유하고 편집'
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
      title: '품질 검증',
      description: '생성된 테스트 케이스의 커버리지와 품질을 자동으로 검증'
    }
  ]

  const pricingPlans = [
    {
      name: 'Starter',
      price: '무료',
      features: [
        '월 100개 테스트 케이스 생성',
        '기본 템플릿 제공',
        'CSV 내보내기'
      ]
    },
    {
      name: 'Professional',
      price: '₩99,000/월',
      features: [
        '무제한 테스트 케이스 생성',
        '고급 AI 기능',
        '모든 형식 내보내기',
        '팀 협업 기능',
        '우선 지원'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '문의',
      features: [
        'Professional의 모든 기능',
        '전용 서버 구축',
        'API 제공',
        '맞춤형 통합',
        '전담 매니저'
      ]
    }
  ]

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">CaseMaker</h1>
          <p className="text-xl text-gray-600 mb-8">
            AI로 테스트 케이스 작성 시간을 90% 단축하세요
          </p>
          <Button size="lg">무료로 시작하기</Button>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">주요 기능</h2>
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

        {/* Pricing */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">요금제</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`text-center ${plan.popular ? 'ring-2 ring-primary' : ''}`}
              >
                {plan.popular && (
                  <div className="bg-primary text-white text-sm py-1 px-3 rounded-full inline-block mb-4">
                    인기
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold mb-6">{plan.price}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center justify-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full"
                >
                  {plan.price === '문의' ? '문의하기' : '시작하기'}
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gray-50 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">
            지금 시작하여 테스트 생산성을 높이세요
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            신용카드 없이 무료로 시작할 수 있습니다
          </p>
          <Button size="lg">무료 체험 시작하기</Button>
        </div>
      </div>
    </div>
  )
}