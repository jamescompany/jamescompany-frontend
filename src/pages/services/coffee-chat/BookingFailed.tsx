// src/pages/services/coffee-chat/BookingFailed.tsx

import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { XCircle, AlertCircle, CreditCard, Clock, ArrowLeft, RefreshCw } from 'lucide-react';

const BookingFailed: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const failureType = searchParams.get('type') || 'error';

  const getFailureDetails = () => {
    switch (failureType) {
      case 'payment_failed':
        return {
          icon: CreditCard,
          title: '결제에 실패했습니다',
          description: '카드 정보를 확인하고 다시 시도해주세요.',
          showRetry: true
        };
      case 'timeout':
        return {
          icon: Clock,
          title: '예약 시간이 초과되었습니다',
          description: '다른 사람이 먼저 예약했거나 시간이 초과되었습니다.',
          showRetry: true
        };
      case 'cancelled':
        return {
          icon: XCircle,
          title: '예약이 취소되었습니다',
          description: '예약을 취소하셨습니다.',
          showRetry: false
        };
      default:
        return {
          icon: AlertCircle,
          title: '예약에 실패했습니다',
          description: '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
          showRetry: true
        };
    }
  };

  const details = getFailureDetails();
  const Icon = details.icon;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100">
            <Icon className="h-12 w-12 text-red-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {details.title}
        </h1>

        <p className="text-gray-600 mb-8">
          {details.description}
        </p>

        <div className="bg-yellow-50 rounded-lg p-6 mb-8 text-left">
          <h2 className="text-lg font-semibold mb-3 flex items-center">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
            도움이 필요하신가요?
          </h2>
          
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• 네트워크 연결을 확인해주세요</li>
            <li>• 결제 정보가 올바른지 확인해주세요</li>
            <li>• 문제가 계속되면 고객센터로 문의해주세요</li>
          </ul>

          <p className="mt-4 text-sm">
            고객센터: <a href="mailto:support@jamescompany.kr" className="text-blue-600 hover:underline">support@jamescompany.kr</a>
          </p>
        </div>

        <div className="space-y-3">
          {details.showRetry && (
            <button
              onClick={() => navigate(-1)}
              className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              다시 시도하기
            </button>
          )}

          <button
            onClick={() => navigate('/services/coffee-chat')}
            className="w-full px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            커피챗 목록으로
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingFailed;