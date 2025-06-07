// src/features/coffee-chat/pages/BookingSuccess.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MessageSquare, Home } from 'lucide-react';

const BookingSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          예약이 완료되었습니다!
        </h1>

        <p className="text-gray-600 mb-8">
          곧 확인 이메일이 발송될 예정입니다.
          Google Calendar에도 일정이 추가됩니다.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
          <h2 className="text-lg font-semibold mb-4">다음 단계</h2>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <Calendar className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium">캘린더 확인</p>
                <p className="text-sm text-gray-600">
                  Google Calendar에서 일정을 확인하세요
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <MessageSquare className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium">준비하기</p>
                <p className="text-sm text-gray-600">
                  상담받고 싶은 내용을 미리 정리해보세요
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Clock className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium">시간 엄수</p>
                <p className="text-sm text-gray-600">
                  예약 시간 5분 전에 접속해주세요
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/mypage/bookings')}
            className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            내 예약 확인하기
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            <Home className="w-4 h-4 mr-2" />
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;