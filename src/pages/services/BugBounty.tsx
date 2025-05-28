import { useEffect } from 'react'
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
                        width: `${(test.participants / test.maxParticipants) * 100}%`
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
}