// src/features/auth/services/oauth.utils.ts

// OAuth 프로바이더 설정
export const OAUTH_CONFIG = {
    google: {
      authUrl: `${import.meta.env.VITE_API_URL}/auth/oauth/google`,
      name: 'Google',
      icon: '🔵',
    },
    kakao: {
      authUrl: `${import.meta.env.VITE_API_URL}/auth/oauth/kakao`,
      name: 'Kakao',
      icon: '🟡',
    },
  } as const;
  
  export type OAuthProvider = keyof typeof OAUTH_CONFIG;
  
  // OAuth 로그인 시작
  export const startOAuthLogin = (provider: OAuthProvider) => {
    const config = OAUTH_CONFIG[provider];
    
    // 현재 URL을 세션 스토리지에 저장 (로그인 후 돌아올 페이지)
    sessionStorage.setItem('oauth_redirect', window.location.pathname);
    
    // OAuth 프로바이더로 리다이렉트
    window.location.href = config.authUrl;
  };
  
  // OAuth 콜백 처리
  export const handleOAuthCallback = async (params: URLSearchParams) => {
    const token = params.get('token');
    const refreshToken = params.get('refresh_token');
    const error = params.get('error');
    const isNew = params.get('isNew') === 'true';
    
    if (error) {
      throw new Error(error);
    }
    
    if (!token) {
      throw new Error('No token received');
    }
    
    // 토큰 저장
    localStorage.setItem('access_token', token);
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }
    
    // 원래 페이지로 리다이렉트할 경로
    const redirectPath = sessionStorage.getItem('oauth_redirect') || '/';
    sessionStorage.removeItem('oauth_redirect');
    
    return { token, refreshToken, isNew, redirectPath };
  };
  
  // OAuth 에러 메시지 처리
  export const getOAuthErrorMessage = (error: string): string => {
    const errorMessages: Record<string, string> = {
      'access_denied': '로그인이 취소되었습니다.',
      'invalid_request': '잘못된 요청입니다.',
      'unauthorized_client': '인증되지 않은 클라이언트입니다.',
      'unsupported_response_type': '지원하지 않는 응답 유형입니다.',
      'server_error': '서버 오류가 발생했습니다.',
      'temporarily_unavailable': '일시적으로 사용할 수 없습니다.',
      'kakao_auth_failed': '카카오 로그인에 실패했습니다.',
    };
    
    return errorMessages[error] || '로그인 중 오류가 발생했습니다.';
  };