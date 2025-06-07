// src/features/auth/components/SocialLoginButton.tsx

import React from 'react';

interface SocialLoginButtonProps {
  provider: 'google' | 'kakao';
  onClick: () => void;
  isLoading?: boolean;
}

const providerConfig = {
  google: {
    name: 'Google',
    bgColor: 'bg-white hover:bg-gray-50',
    textColor: 'text-gray-700',
    borderColor: 'border border-gray-300',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
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
    )
  },
  kakao: {
    name: 'Kakao',
    bgColor: 'bg-[#FEE500] hover:bg-[#FDD835]',
    textColor: 'text-[#000000D9]',
    borderColor: 'border border-[#FEE500]',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          fill="#000000"
          d="M12 3c5.514 0 10 3.476 10 7.747 0 4.272-4.48 7.748-10 7.748-1.19 0-2.34-.16-3.41-.46l-3.67 2.84c-.16.12-.39.08-.51-.08-.13-.15-.13-.36-.02-.52l1.24-4.02c-2.16-1.55-3.63-3.9-3.63-6.56C2 6.476 6.486 3 12 3z"
        />
      </svg>
    )
  }
};

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ 
  provider, 
  onClick, 
  isLoading = false 
}) => {
  const config = providerConfig[provider];

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`
        relative w-full flex items-center justify-center gap-3 px-4 py-3
        ${config.bgColor} ${config.textColor} ${config.borderColor}
        rounded-lg font-medium transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
      `}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4" 
            fill="none" 
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
          />
        </svg>
      ) : (
        config.icon
      )}
      <span>{isLoading ? '로그인 중...' : `${config.name}로 계속하기`}</span>
    </button>
  );
};

export default SocialLoginButton;