import { useState, useEffect } from 'react'
import { useServiceStore } from '../../stores/serviceStore'
import { useAuthStore } from '../../stores/authStore'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import { Calendar, Clock, MapPin, Video } from 'lucide-react'

export default function CoffeeChat() {
  const { coffeeSlots, fetchCoffeeSlots, bookCoffeeSlot } = useServiceStore()
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const navigate = useNavigate()
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

  useEffect(() => {
    fetchCoffeeSlots()
  }, [fetchCoffeeSlots])

  const handleBooking = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } })
      return
    }

    if (selectedSlot) {
      await bookCoffeeSlot(selectedSlot)
      alert('커피챗이 예약되었습니다!')
      setSelectedSlot(null)
    }
  }

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">커피챗</h1>
          <p className="text-xl text-gray-600">
            편안한 분위기에서 1:1 맞춤 상담을 받아보세요
          </p>
        </div>

        <Card className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">서비스 소개</h2>
          <p className="text-gray-700 mb-6">
            커피챗은 QA 자동화, 테스트 전략, 커리어 개발 등 다양한 주제로 
            전문가와 1:1 상담을 받을 수 있는 서비스입니다.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <Video className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">온라인 미팅</h3>
                <p className="text-sm text-gray-600">Zoom을 통한 화상 상담</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">오프라인 미팅</h3>
                <p className="text-sm text-gray-600">서울 강남 카페에서 만남</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">1시간 상담</h3>
                <p className="text-sm text-gray-600">충분한 시간으로 깊이 있는 대화</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">유연한 일정</h3>
                <p className="text-sm text-gray-600">원하는 시간대 선택 가능</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold mb-6">예약 가능한 시간</h2>
          
          <div className="space-y-3">
            {coffeeSlots.map((slot) => (
              <div
                key={slot.id}
                className={`
                  border rounded-lg p-4 cursor-pointer transition-all
                  ${selectedSlot === slot.id ? 'border-primary bg-blue-50' : 'border-gray-300'}
                  ${!slot.available ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary'}
                `}
                onClick={() => slot.available && setSelectedSlot(slot.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">{slot.date}</span>
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span>{slot.time}</span>
                    {slot.type === 'online' ? (
                      <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        온라인
                      </span>
                    ) : (
                      <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                        오프라인
                      </span>
                    )}
                  </div>
                  <div>
                    {slot.available ? (
                      <span className="text-green-600">예약 가능</span>
                    ) : (
                      <span className="text-red-600">예약 완료</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Button
              onClick={handleBooking}
              disabled={!selectedSlot}
              className="w-full"
              size="lg"
            >
              {isAuthenticated ? '예약하기' : '로그인 후 예약하기'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}