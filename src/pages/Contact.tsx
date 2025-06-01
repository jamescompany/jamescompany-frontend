import { useState } from 'react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: API 연동
    console.log('Form submitted:', formData)
    alert('문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.')
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="이름"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="이메일"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              문의 보내기
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