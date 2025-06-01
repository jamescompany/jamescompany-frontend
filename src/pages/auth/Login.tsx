// src/pages/auth/Login.tsx
import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Card from '../../components/ui/Card'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const login = useAuthStore(state => state.login)
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/dashboard'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (error: any) {
      console.error('Login failed:', error)
      setError(error.message || '로그인에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleImwebLogin = () => {
    // imweb OAuth 설정
    const CLIENT_ID = import.meta.env.VITE_IMWEB_CLIENT_ID
    const REDIRECT_URI = import.meta.env.VITE_IMWEB_REDIRECT_URI || `${window.location.origin}/auth/callback/imweb`
    const IMWEB_AUTH_URL = 'https://api.imweb.me/oauth/authorize'
    
    // OAuth 인증 페이지로 리다이렉트
    const authUrl = `${IMWEB_AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=user_info`
    
    window.location.href = authUrl
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">로그인</h2>
        </div>

        <Card>
          {/* imweb 로그인 버튼 */}
          <Button
            onClick={handleImwebLogin}
            variant="outline"
            className="w-full mb-4 flex items-center justify-center"
            size="lg"
          >
            <img 
              src="/imweb-logo.png" 
              alt="imweb" 
              className="w-5 h-5 mr-2"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
            imweb 계정으로 로그인
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">또는</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="이메일"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="이메일을 입력하세요"
              autoComplete="email"
            />

            <Input
              label="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="비밀번호를 입력하세요"
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-600">로그인 상태 유지</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                비밀번호 찾기
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? '로그인 중...' : '이메일로 로그인'}
            </Button>
          </form>
        </Card>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            기존 imweb 회원이시라면 imweb 계정으로 바로 로그인하실 수 있습니다.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            계정이 없으신가요?{' '}
            <Link to="/signup" className="text-primary hover:underline">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}