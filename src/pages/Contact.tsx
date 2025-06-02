import { useState } from 'react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'

// API URL 설정 (환경변수로 관리하는 것이 좋습니다)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',  // 이 필드명이 문제일 수 있음
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      console.log('Sending data:', formData) // 전송 데이터 확인
      
      const response = await fetch(`${API_URL}/api/v1/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      console.log('Response:', response.status, data) // 응답 확인

      if (!response.ok) {
        // 422 에러의 경우 자세한 정보 표시
        if (response.status === 422) {
          console.error('Validation error:', data)
          const errorMessages = data.detail?.map((err: any) => 
            `${err.loc.join('.')}: ${err.msg}`
          ).join(', ') || '유효성 검사 실패'
          throw new Error(errorMessages)
        }
        throw new Error(data.detail || '문의 전송에 실패했습니다.')
      }

      // 성공 처리...
    } catch (err) {
      setError(err instanceof Error ? err.message : '문의 전송 중 오류가 발생했습니다.')
      console.error('Contact form error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">문의하기</h1>
          <p className="text-xl text-gray-600">
            궁금한 점이 있으시면 언제든지 문의해주세요
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 성공 메시지 */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.
              </div>
            )}

            {/* 에러 메시지 */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="이름"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
              <Input
                label="이메일"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                문의 유형
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-50 disabled:text-gray-500"
                required
                disabled={isLoading}
              >
                <option value="">선택해주세요</option>
                <option value="coffee-chat">커피챗 문의</option>
                <option value="casemaker">CaseMaker 문의</option>
                <option value="education">교육 서비스 문의</option>
                <option value="bug-bounty">Bug Bounty Arena 문의</option>
                <option value="other">기타 문의</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                문의 내용
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-50 disabled:text-gray-500"
                required
                disabled={isLoading}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? '전송 중...' : '문의 보내기'}
            </Button>
          </form>
        </Card>

        <div className="mt-12 text-center text-gray-600">
          <p>또는 직접 연락주세요</p>
          <p className="mt-2">
            <strong>이메일:</strong> contact@jamescompany.kr
          </p>
        </div>
      </div>
    </div>
  )
}