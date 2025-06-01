// 이 스크립트를 create-files.js에 추가하거나 별도로 실행하세요

const fs = require('fs');
const path = require('path');

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function writeFile(filePath, content) {
  ensureDirectoryExists(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
  console.log(`✅ Created: ${filePath}`);
}

const additionalServicePages = {
  'src/pages/services/CaseMaker.tsx': `import Button from '../../components/ui/Button'
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
                className={\`text-center \${plan.popular ? 'ring-2 ring-primary' : ''}\`}
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
}`,

  'src/pages/services/Education.tsx': `import { useEffect } from 'react'
import { useServiceStore } from '../../stores/serviceStore'
import { useAuthStore } from '../../stores/authStore'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import { Clock, Users, Award, PlayCircle } from 'lucide-react'

export default function Education() {
  const { courses, fetchCourses, enrollCourse } = useServiceStore()
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  const handleEnroll = async (courseId: string) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } })
      return
    }

    await enrollCourse(courseId)
    alert('수강 신청이 완료되었습니다!')
  }

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">교육 서비스</h1>
          <p className="text-xl text-gray-600">
            실무에 바로 적용 가능한 QA/SDET 전문 교육
          </p>
        </div>

        {/* Why Our Education */}
        <div className="mb-16">
          <Card>
            <h2 className="text-2xl font-semibold mb-6">왜 James Company 교육인가?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">실무 전문가 강의</h3>
                <p className="text-sm text-gray-600">현업 전문가의 생생한 경험</p>
              </div>
              <div className="text-center">
                <PlayCircle className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">실습 중심 커리큘럼</h3>
                <p className="text-sm text-gray-600">이론보다 실습 위주의 교육</p>
              </div>
              <div className="text-center">
                <Clock className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">평생 수강</h3>
                <p className="text-sm text-gray-600">한 번 결제로 평생 시청</p>
              </div>
              <div className="text-center">
                <Award className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">수료증 발급</h3>
                <p className="text-sm text-gray-600">과정 완료 시 수료증 제공</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Course List */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">개설 강좌</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course) => (
              <Card key={course.id} className="flex flex-col">
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold mb-3">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-700">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>기간: {course.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <Users className="w-4 h-4 mr-2" />
                      <span>수강생 500명+</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-bold">₩{course.price.toLocaleString()}</span>
                      <span className="text-sm text-gray-500">VAT 포함</span>
                    </div>
                    
                    <Button
                      onClick={() => handleEnroll(course.id)}
                      className="w-full"
                    >
                      {course.enrolled ? '수강 중' : '수강 신청'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Curriculum Preview */}
        <Card className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">커리큘럼 예시</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">1주차: 자동화 테스트의 이해</h4>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• 자동화 테스트의 필요성과 ROI</li>
                <li>• 테스트 피라미드와 전략</li>
                <li>• 도구 선택 가이드</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">2주차: Selenium 기초</h4>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• WebDriver 설정 및 환경 구축</li>
                <li>• 기본 명령어와 요소 찾기</li>
                <li>• 첫 번째 자동화 스크립트 작성</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">3주차: 페이지 객체 모델</h4>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• POM 패턴의 이해</li>
                <li>• 재사용 가능한 코드 작성</li>
                <li>• 유지보수가 쉬운 테스트 구조</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* FAQ */}
        <div className="text-center bg-gray-50 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">
            더 궁금하신 점이 있으신가요?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            교육 과정에 대해 상세히 안내해드립니다
          </p>
          <Button size="lg" onClick={() => navigate('/contact')}>
            문의하기
          </Button>
        </div>
      </div>
    </div>
  )
}`,

  'src/pages/services/BugBounty.tsx': `import { useEffect } from 'react'
import { useServiceStore } from '../../stores/serviceStore'
import { useAuthStore } from '../../stores/authStore'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import { Users, Calendar, TrendingUp, Shield } from 'lucide-react'

export default function BugBounty() {
  const { betaTests, fetchBetaTests, applyBetaTest } = useServiceStore()
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    fetchBetaTests()
  }, [fetchBetaTests])

  const handleApply = async (testId: string) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } })
      return
    }

    await applyBetaTest(testId)
    alert('베타 테스트 신청이 완료되었습니다!')
  }

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Bug Bounty Arena</h1>
          <p className="text-xl text-gray-600">
            앱 출시 전 실제 사용자의 피드백으로 완성도를 높이세요
          </p>
        </div>

        {/* How it Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">서비스 프로세스</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1</div>
              <h3 className="font-semibold mb-2">앱 등록</h3>
              <p className="text-sm text-gray-600">
                테스트할 앱 정보와 목표를 등록합니다
              </p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">2</div>
              <h3 className="font-semibold mb-2">테스터 모집</h3>
              <p className="text-sm text-gray-600">
                타겟 사용자에 맞는 테스터를 모집합니다
              </p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">3</div>
              <h3 className="font-semibold mb-2">테스트 진행</h3>
              <p className="text-sm text-gray-600">
                실제 환경에서 앱을 테스트합니다
              </p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">4</div>
              <h3 className="font-semibold mb-2">리포트 제공</h3>
              <p className="text-sm text-gray-600">
                버그와 개선사항을 정리하여 전달합니다
              </p>
            </Card>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <Card>
            <h2 className="text-2xl font-semibold mb-6">왜 Bug Bounty Arena인가?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <Users className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">다양한 테스터 풀</h3>
                  <p className="text-gray-600">
                    연령, 직업, 관심사가 다양한 1만명+ 테스터 보유
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Shield className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">검증된 품질</h3>
                  <p className="text-gray-600">
                    전문 QA가 검토한 고품질 버그 리포트 제공
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <TrendingUp className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">비용 효율성</h3>
                  <p className="text-gray-600">
                    내부 QA 팀 구축 대비 80% 비용 절감
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Calendar className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">빠른 진행</h3>
                  <p className="text-gray-600">
                    평균 3-5일 내 테스트 완료 및 리포트 제공
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Active Beta Tests */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">진행 중인 베타 테스트</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {betaTests.map((test) => (
              <Card key={test.id}>
                <h3 className="text-xl font-semibold mb-2">{test.appName}</h3>
                <p className="text-gray-600 mb-4">{test.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">마감일</span>
                    <span className="font-medium">{test.deadline}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">참여자</span>
                    <span className="font-medium">
                      {test.participants}/{test.maxParticipants}명
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: \`\${(test.participants / test.maxParticipants) * 100}%\`
                      }}
                    />
                  </div>
                </div>
                
                <Button
                  onClick={() => handleApply(test.id)}
                  className="w-full"
                  disabled={test.participants >= test.maxParticipants}
                >
                  {test.participants >= test.maxParticipants
                    ? '모집 완료'
                    : '참여 신청'}
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA for Companies */}
        <div className="text-center bg-primary text-white rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">
            여러분의 앱도 테스트 받아보세요
          </h2>
          <p className="text-xl mb-8">
            출시 전 마지막 점검, Bug Bounty Arena와 함께하세요
          </p>
          <Button variant="secondary" size="lg" onClick={() => navigate('/contact')}>
            앱 등록 문의하기
          </Button>
        </div>
      </div>
    </div>
  )
}`,

  'src/pages/insights/Insights.tsx': `import { useState } from 'react'
import Card from '../../components/ui/Card'
import { Calendar, User, Tag } from 'lucide-react'

interface Post {
  id: string
  title: string
  excerpt: string
  category: 'notice' | 'story'
  author: string
  date: string
  tags: string[]
}

export default function Insights() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'notice' | 'story'>('all')

  // Mock data
  const posts: Post[] = [
    {
      id: '1',
      title: '새로운 Bug Bounty Arena 서비스 출시',
      excerpt: 'James Company에서 새롭게 선보이는 Bug Bounty Arena 서비스를 소개합니다. 앱 출시 전 실제 사용자들의 피드백을 받아보세요.',
      category: 'notice',
      author: 'James Company',
      date: '2024-01-20',
      tags: ['서비스', '출시', 'Bug Bounty']
    },
    {
      id: '2',
      title: 'QA 자동화의 ROI를 높이는 5가지 방법',
      excerpt: '많은 기업들이 QA 자동화를 도입하지만 기대한 만큼의 효과를 보지 못합니다. 실제 사례를 통해 ROI를 높이는 방법을 알아봅시다.',
      category: 'story',
      author: 'James Kang',
      date: '2024-01-18',
      tags: ['QA', '자동화', 'ROI']
    },
    {
      id: '3',
      title: '2024년 1분기 교육 일정 안내',
      excerpt: '2024년 1분기 QA/SDET 교육 과정 일정이 확정되었습니다. 조기 등록 시 20% 할인 혜택을 받으실 수 있습니다.',
      category: 'notice',
      author: 'James Company',
      date: '2024-01-15',
      tags: ['교육', '일정', '할인']
    },
    {
      id: '4',
      title: '스타트업에서 QA 문화 만들기',
      excerpt: '리소스가 부족한 스타트업에서 어떻게 효과적인 QA 문화를 만들 수 있을까요? 실제 경험을 바탕으로 한 인사이트를 공유합니다.',
      category: 'story',
      author: 'James Kang',
      date: '2024-01-12',
      tags: ['스타트업', 'QA', '문화']
    }
  ]

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory)

  const getCategoryBadgeColor = (category: string) => {
    return category === 'notice' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
  }

  const getCategoryText = (category: string) => {
    return category === 'notice' ? '공지사항' : '스토리'
  }

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">인사이트</h1>
          <p className="text-xl text-gray-600">
            James Company의 소식과 QA 관련 인사이트를 만나보세요
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={\`px-4 py-2 rounded-lg transition-colors \${
              selectedCategory === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }\`}
          >
            전체
          </button>
          <button
            onClick={() => setSelectedCategory('notice')}
            className={\`px-4 py-2 rounded-lg transition-colors \${
              selectedCategory === 'notice'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }\`}
          >
            공지사항
          </button>
          <button
            onClick={() => setSelectedCategory('story')}
            className={\`px-4 py-2 rounded-lg transition-colors \${
              selectedCategory === 'story'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }\`}
          >
            스토리
          </button>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} hoverable>
              <article>
                <div className="flex items-center space-x-4 mb-3">
                  <span className={\`text-sm px-3 py-1 rounded-full \${getCategoryBadgeColor(post.category)}\`}>
                    {getCategoryText(post.category)}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="w-4 h-4 mr-1" />
                    {post.author}
                  </div>
                </div>

                <h2 className="text-2xl font-semibold mb-3 hover:text-primary cursor-pointer">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <div className="flex space-x-2">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="text-sm text-gray-500">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button className="text-primary hover:underline">
                    자세히 읽기 →
                  </button>
                </div>
              </article>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12 space-x-2">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            이전
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg">
            1
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            2
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            3
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            다음
          </button>
        </div>
      </div>
    </div>
  )
}`
};

// 파일 생성
Object.entries(additionalServicePages).forEach(([filePath, content]) => {
  writeFile(filePath, content);
});

console.log('\n✅ 추가 서비스 페이지들이 생성되었습니다!');
