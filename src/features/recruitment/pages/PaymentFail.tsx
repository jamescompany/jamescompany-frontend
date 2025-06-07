// src/features/recruitment/pages/PaymentFail.tsx

import { useSearchParams, useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';

const PaymentFail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const errorMessage = searchParams.get('message') || '결제가 취소되었습니다.';
  const orderId = searchParams.get('orderId');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <XCircle className="w-10 h-10 text-red-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          결제에 실패했습니다
        </h2>
        
        <p className="text-gray-600 mb-8">
          {errorMessage}
        </p>
        
        {orderId && (
          <p className="text-sm text-gray-500 mb-6">
            주문번호: {orderId}
          </p>
        )}
        
        <div className="space-y-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            다시 시도하기
          </button>
          
          <button
            onClick={() => navigate('/services/recruitment')}
            className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            채용공고 목록으로
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;