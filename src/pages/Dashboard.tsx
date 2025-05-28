import { useAuthStore } from '../stores/authStore'
import Card from '../components/ui/Card'
import { Calendar, BookOpen, Bug, Coffee } from 'lucide-react'

export default function Dashboard() {
  const user = useAuthStore(state => state.user)

  const dashboardItems = [
    {
      icon: <Coffee className="w-6 h-6" />,
      title: '예약된 커피챗',
      count: 2,
      link: '/coffee-chat/my'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: '수강 중인 강의',
      count: 1,
      link: '/my-courses'
    },
    {
      icon: <Bug className="w-6 h-6" />,
      title: '참여 중인 베타 테스트',
      count: 3,
      link: '/my-beta-tests'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: '다가오는 일정',
      count: 5,
      link: '/calendar'
    }
  ]

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">대시보드</h1>
          <p className="text-gray-600 mt-2">안녕하세요, {user?.name}님!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardItems.map((item, index) => (
            <Card key={index} hoverable>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-500 mb-2">{item.icon}</div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-2xl font-bold text-primary mt-1">{item.count}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-xl font-semibold mb-4">최근 활동</h2>
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <p className="font-medium">커피챗 예약 완료</p>
                  <p className="text-sm text-gray-600">2024년 1월 25일 오후 2:00</p>
                </div>
                <div className="border-b pb-3">
                  <p className="font-medium">QA 자동화 입문 강의 수강 시작</p>
                  <p className="text-sm text-gray-600">2024년 1월 20일</p>
                </div>
                <div>
                  <p className="font-medium">쇼핑 앱 v2.0 베타 테스트 참여</p>
                  <p className="text-sm text-gray-600">2024년 1월 18일</p>
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Card>
              <h2 className="text-xl font-semibold mb-4">프로필 정보</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">이메일</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">가입일</p>
                  <p className="font-medium">2024년 1월 15일</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">회원 등급</p>
                  <p className="font-medium">일반 회원</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}