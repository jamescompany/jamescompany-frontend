// src/features/auth/components/OAuthCallback.tsx

import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import Card from '../../../shared/component/ui/Card'
import api from '../../../shared/services/api'

interface OAuthUser {
  id: string
  email: string
  name: string
  is_admin: boolean
  is_active: boolean
  membership_tier: string
  created_at: string
  profile_image?: string
}

export default function OAuthCallback() {
  const navigate = useNavigate()
  const location = useLocation()
  const setAuth = useAuthStore(state => state.setAuth)
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('로그인 처리 중...')

  useEffect(() => {
    const processOAuthCallback = async () => {
      try {
        const params = new URLSearchParams(location.search)
        const token = params.get('token')
        const refreshToken = params.get('refresh_token')
        const error = params.get('error')
        const isNew = params.get('isNew') === 'true'

        if (error) {
          throw new Error(getOAuthErrorMessage(error))
        }

        if (!token) {
          throw new Error('인증 토큰을 받지 못했습니다.')
        }

        // 토큰 저장
        localStorage.setItem('access_token', token)
        if (refreshToken) {
          localStorage.setItem('refresh_token', refreshToken)
        }

        // 사용자 정보 가져오기
        try {
          const response = await api.get<OAuthUser>('/api/v1/users/me')
          const user = {
            id: response.data.id,
            email: response.data.email,
            name: response.data.name,
            role: response.data.is_admin ? 'admin' as const : 'user' as const,
            is_admin: response.data.is_admin,
            membership_tier: response.data.membership_tier,
            profile_image: response.data.profile_image
          }
          
          // authStore에 인증 상태 설정
          setAuth(true, user, token)
        } catch (err) {
          console.error('Failed to fetch user info:', err)
          // 사용자 정보를 가져오지 못해도 토큰은 저장되어 있으므로 인증 상태만 설정
          setAuth(true, null, token)
        }

        // 성공 메시지
        setStatus('success')
        setMessage(isNew ? '회원가입이 완료되었습니다!' : '로그인되었습니다!')

        // 원래 가려던 페이지로 리다이렉트
        const redirectPath = sessionStorage.getItem('oauth_redirect') || '/dashboard'
        sessionStorage.removeItem('oauth_redirect')

        setTimeout(() => {
          navigate(redirectPath)
        }, 1500)
      } catch (error) {
        setStatus('error')
        setMessage(error instanceof Error ? error.message : '로그인 처리 중 오류가 발생했습니다.')
      }
    }

    processOAuthCallback()
  }, [location, navigate, setAuth])

  const getOAuthErrorMessage = (error: string): string => {
    const errorMessages: Record<string, string> = {
      'access_denied': '로그인이 취소되었습니다.',
      'invalid_request': '잘못된 요청입니다.',
      'unauthorized_client': '인증되지 않은 클라이언트입니다.',
      'server_error': '서버 오류가 발생했습니다.',
      'kakao_auth_failed': '카카오 로그인에 실패했습니다.',
    }
    
    return errorMessages[error] || '로그인 중 오류가 발생했습니다.'
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <Card>
          <div className="text-center">
            {status === 'loading' && (
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
                <p className="text-gray-600">{message}</p>
              </div>
            )}

            {status === 'success' && (
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-900 font-medium">{message}</p>
                <p className="text-sm text-gray-500">잠시 후 이동합니다...</p>
              </div>
            )}

            {status === 'error' && (
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <p className="text-gray-900 font-medium">{message}</p>
                <button
                  onClick={() => navigate('/login')}
                  className="inline-block mt-4 text-sm text-primary hover:underline"
                >
                  로그인 페이지로 돌아가기
                </button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}