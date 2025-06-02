/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string
    readonly VITE_IMWEB_CLIENT_ID: string
    readonly VITE_IMWEB_REDIRECT_URI?: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }