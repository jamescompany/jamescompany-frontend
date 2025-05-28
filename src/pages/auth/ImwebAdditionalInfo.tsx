// src/pages/auth/ImwebAdditionalInfo.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'

export default function ImwebAdditionalInfo() {
  const user = useAuthStore(state => state.user)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    purpose: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 백엔드로 추가 정보 전송
    // await updateUserProfile(formData)
    
    navigate('/dashboard')
  }

  const handleSkip = () => {
    navigate('/dashboard')
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <Card>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">환영합니다! 🎉</h2>
            <p className="text-gray-600 mt-2">
              {user?.name}님, James Company에 오신 것을 환영합니다.
            </p>
            <p className="text-sm text-gray-500 mt-1">
              더 나은 서비스를 위해 추가 정보를 입력해주세요.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                회사/조직 (선택)
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="소속된 회사나 조직을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                직무 (선택)
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">선택하세요</option>
                <option value="qa">QA Engineer</option>
                <option value="sdet">SDET</option>
                <option value="developer">Developer</option>
                <option value="pm">Product Manager</option>
                <option value="other">기타</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                서비스 이용 목적 (선택)
              </label>
              <select
                value={formData.purpose}
                onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">선택하세요</option>
                <option value="casemaker">CaseMaker 사용</option>
                <option value="education">교육 서비스 수강</option>
                <option value="coffeechat">커피챗 상담</option>
                <option value="bugbounty">Bug Bounty 참여</option>
                <option value="all">모든 서비스</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleSkip}
                className="flex-1"
              >
                건너뛰기
              </Button>
              <Button
                type="submit"
                className="flex-1"
              >
                시작하기
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}