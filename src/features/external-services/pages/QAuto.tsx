// src/features/external-services/pages/QAuto.tsx

import { useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

const QAuto = () => {
  useEffect(() => {
    // 3초 후 자동 리다이렉트
    const timer = setTimeout(() => {
      window.location.href = 'https://qauto.jamescompany.kr';
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">QAuto로 이동 중...</h1>
        <p className="text-gray-600 mb-4">잠시만 기다려주세요</p>
        <a 
          href="https://qauto.jamescompany.kr" 
          className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
        >
          지금 바로 이동하기
          <ExternalLink className="w-4 h-4 ml-1" />
        </a>
      </div>
    </div>
  );
};

export default QAuto;