// src/features/auth/pages/ImwebCallback.tsx

import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

export default function ImwebCallback() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const loginWithImweb = useAuthStore(state => state.loginWithImweb)

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code')
      const error = searchParams.get('error')

      if (error) {
        console.error('OAuth error:', error)
        alert('로그인에 실패했습니다.')
        navigate('/login')
        return
      }

      if (code) {
        try {
          // 백엔드로 code를 보내서 access token을 받아옴
          await loginWithImweb(code)
          navigate('/dashboard')
        } catch (error) {
          console.error('Login failed:', error)
          alert('로그인 처리 중 오류가 발생했습니다.')
          navigate('/login')
        }
      }
    }

    handleCallback()
  }, [searchParams, navigate, loginWithImweb])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">imweb 계정으로 로그인 중...</p>
      </div>
    </div>
  )
}