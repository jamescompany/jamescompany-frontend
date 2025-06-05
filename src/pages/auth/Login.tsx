// src/pages/auth/Login.tsx

import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Card from '../../components/ui/Card'
import RememberMeModal from '../../components/auth/RememberMeModal'
import { Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rememberMe, setRememberMe] = useState(false)
  const [showRememberMeModal, setShowRememberMeModal] = useState(false)
  
  const login = useAuthStore(state => state.login)
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/dashboard'

  // 로그인된 상태에서 접근시 리다이렉트
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, from])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      await login(email, password)
      
      // rememberMe 옵션에 따라 토큰 저장 방식 결정
      if (rememberMe) {
        // 로그인 상태 유지를 선택한 경우 - 이미 localStorage에 저장됨
        console.log('로그인 상태가 유지됩니다.')
      } else {
        // 로그인 상태 유지를 선택하지 않은 경우 - sessionStorage 사용 권장
        console.log('브라우저를 닫으면 로그아웃됩니다.')
      }
      
      navigate(from, { replace: true })
    } catch (error: any) {
      console.error('Login failed:', error)
      setError(error.message || '로그인에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    // 현재 페이지 저장 (로그인 후 돌아올 페이지)
    sessionStorage.setItem('oauth_redirect', from)
    // Backend OAuth 엔드포인트로 리다이렉트
    window.location.href = `${import.meta.env.VITE_API_URL}/api/v1/auth/google/login`
  }

  const handleKakaoLogin = () => {
    // 현재 페이지 저장 (로그인 후 돌아올 페이지)
    sessionStorage.setItem('oauth_redirect', from)
    // Backend OAuth 엔드포인트로 리다이렉트
    window.location.href = `${import.meta.env.VITE_API_URL}/api/v1/auth/kakao/login`
  }

  const handleRememberMeChange = (checked: boolean) => {
    if (checked) {
      setShowRememberMeModal(true)
    } else {
      setRememberMe(false)
    }
  }

  const confirmRememberMe = () => {
    setRememberMe(true)
    setShowRememberMeModal(false)
  }

  const cancelRememberMe = () => {
    setRememberMe(false)
    setShowRememberMeModal(false)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">로그인</h2>
        </div>

        <Card>
          {/* 소셜 로그인 버튼들 - imweb 버튼 제거됨 */}
          <div className="space-y-3">
            {/* Google 로그인 버튼 */}
            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full flex items-center justify-center hover:bg-gray-50"
              size="lg"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google로 계속하기
            </Button>

            {/* Kakao 로그인 버튼 */}
            <Button
              onClick={handleKakaoLogin}
              className="w-full flex items-center justify-center bg-[#FEE500] hover:bg-[#FDD835] text-[#000000D9]"
              size="lg"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
                <path
                  fill="#000000"
                  d="M12 3c5.514 0 10 3.476 10 7.747 0 4.272-4.48 7.748-10 7.748-1.19 0-2.34-.16-3.41-.46l-3.67 2.84c-.16.12-.39.08-.51-.08-.13-.15-.13-.36-.02-.52l1.24-4.02c-2.16-1.55-3.63-3.9-3.63-6.56C2 6.476 6.486 3 12 3z"
                />
              </svg>
              카카오로 계속하기
            </Button>
          </div>

          <div className="relative my-6">
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

            <div className="relative">
              <Input
                label="비밀번호"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="비밀번호를 입력하세요"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="mr-2"
                  checked={rememberMe}
                  onChange={(e) => handleRememberMeChange(e.target.checked)}
                />
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
          <p className="text-sm text-gray-600 mt-2">
            계정이 없으신가요?{' '}
            <Link to="/signup" className="text-primary hover:underline">
              회원가입
            </Link>
          </p>
        </div>
      </div>

      {/* 로그인 상태 유지 확인 모달 */}
      <RememberMeModal
        isOpen={showRememberMeModal}
        onConfirm={confirmRememberMe}
        onCancel={cancelRememberMe}
      />
    </div>
  )
}