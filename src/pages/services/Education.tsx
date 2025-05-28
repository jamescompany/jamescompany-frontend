import { useEffect } from 'react'
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
}