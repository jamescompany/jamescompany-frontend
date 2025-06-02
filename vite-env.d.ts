/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  readonly VITE_APP_ENV?: 'local' | 'development' | 'production'
  readonly VITE_APP_NAME?: string
  readonly VITE_GOOGLE_CLIENT_ID?: string  // Google OAuth용
  readonly VITE_IMWEB_CLIENT_ID?: string   // imweb 로그인용
  readonly VITE_CASEMAKER_URL?: string     // https://casemaker.jamescompany.kr
  readonly VITE_QAUTO_URL?: string         // https://qauto.jamescompany.kr
  readonly VITE_SENTRY_DSN?: string        // 에러 트래킹용
  readonly VITE_USE_MOCK_DATA?: string     // Mock 데이터 사용 여부
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}