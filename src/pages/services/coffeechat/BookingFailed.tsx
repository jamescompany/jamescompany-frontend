// src/pages/services/coffeechat/BookingFailed.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { XCircle, AlertTriangle, RefreshCw, ArrowLeft, HelpCircle } from 'lucide-react';

type FailureType = 'cancelled' | 'payment_failed' | 'error' | 'timeout';

interface FailureInfo {
  type: FailureType;
  title: string;
  message: string;
  icon: React.ReactNode;
  iconBgColor: string;
}

const BookingFailed: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [failureType, setFailureType] = useState<FailureType>('error');
  
  useEffect(() => {
    // URL 파라미터에서 실패 유형 확인
    const type = searchParams.get('type') as FailureType;
    if (type) {
      setFailureType(type);
    }
  }, [searchParams]);

  const failureInfo: Record<FailureType, FailureInfo> = {
    cancelled: {
      type: 'cancelled',
      title: '예약이 취소되었습니다',
      message: '결제를 취소하셨습니다. 언제든지 다시 예약하실 수 있습니다.',
      icon: <XCircle className="w-20 h-20 text-gray-600" />,
      iconBgColor: 'bg-gray-100'
    },
    payment_failed: {
      type: 'payment_failed',
      title: '결제에 실패했습니다',
      message: '결제 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
      icon: <AlertTriangle className="w-20 h-20 text-red-600" />,
      iconBgColor: 'bg-red-100'
    },
    error: {
      type: 'error',
      title: '예약 중 오류가 발생했습니다',
      message: '예약 처리 중 문제가 발생했습니다. 계속 문제가 발생하면 고객센터로 문의해주세요.',
      icon: <AlertTriangle className="w-20 h-20 text-orange-600" />,
      iconBgColor: 'bg-orange-100'
    },
    timeout: {
      type: 'timeout',
      title: '예약 시간이 초과되었습니다',
      message: '예약 가능 시간이 지났습니다. 다른 시간대를 선택해주세요.',
      icon: <AlertTriangle className="w-20 h-20 text-yellow-600" />,
      iconBgColor: 'bg-yellow-100'
    }
  };

  const currentFailure = failureInfo[failureType];

  const handleRetry = () => {
    // 이전 페이지로 돌아가거나 커피챗 메인으로 이동
    navigate('/services/coffee-chat');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-2xl w-full mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* 실패 헤더 */}
          <div className={`${currentFailure.iconBgColor} p-8 text-center`}>
            <div className="inline-block">
              {currentFailure.icon}
            </div>
          </div>

          <div className="p-8">
            <h1 className="text-2xl font-bold text-center mb-4">
              {currentFailure.title}
            </h1>
            
            <p className="text-gray-600 text-center mb-8">
              {currentFailure.message}
            </p>

            {/* 추가 정보 */}
            {failureType === 'payment_failed' && (
              <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2 flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2 text-gray-600" />
                  결제 실패 가능한 원인
                </h3>
                <ul className="text-sm text-gray-600 space-y-1 ml-7">
                  <li>• 카드 잔액 부족</li>
                  <li>• 카드 유효기간 만료</li>
                  <li>• 일시적인 네트워크 오류</li>
                  <li>• 카드사 승인 거절</li>
                </ul>
              </div>
            )}

            {/* 액션 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleRetry}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                다시 시도
              </button>
              
              <button
                onClick={() => navigate('/')}
                className="flex-1 flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                홈으로 돌아가기
              </button>
            </div>

            {/* 도움말 */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 mb-2">
                계속해서 문제가 발생하나요?
              </p>
              <div className="flex justify-center gap-4">
                <a 
                  href="mailto:support@jamescompany.kr" 
                  className="text-blue-600 hover:underline text-sm"
                >
                  support@jamescompany.kr
                </a>
                <span className="text-gray-400">|</span>
                <a 
                  href="/faq" 
                  className="text-blue-600 hover:underline text-sm"
                >
                  자주 묻는 질문
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 주의사항 */}
        {failureType === 'cancelled' && (
          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <h3 className="font-semibold mb-2 text-blue-900">알려드립니다</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 선택하신 시간대는 아직 예약 가능합니다</li>
              <li>• 결제 정보는 안전하게 처리되며 저장되지 않습니다</li>
              <li>• 언제든지 다시 예약하실 수 있습니다</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingFailed;