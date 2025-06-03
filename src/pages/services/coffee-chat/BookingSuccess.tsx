// src/pages/services/BookingSuccess.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Calendar, Mail, MessageSquare, ArrowRight } from 'lucide-react';

interface BookingDetails {
  sessionId: string;
  mentorName: string;
  scheduledDate: string;
  calendarEventId?: string;
}

const BookingSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  useEffect(() => {
    if (sessionId) {
      fetchBookingDetails();
    } else {
      // 개발 환경용 임시 데이터
      setBookingDetails({
        sessionId: '12345',
        mentorName: '홍지현',
        scheduledDate: '2024-02-15T14:00:00',
        calendarEventId: 'google-calendar-id'
      });
    }
  }, [sessionId]);

  const fetchBookingDetails = async () => {
    try {
      const response = await fetch(`/api/coffee-chat/sessions/${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        setBookingDetails(data);
      }
    } catch (error) {
      console.error('Failed to fetch booking details:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      weekday: 'long'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-2xl w-full mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* 성공 헤더 */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-center">
            <CheckCircle className="w-20 h-20 text-white mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">예약이 완료되었습니다!</h1>
            <p className="text-green-100">커피챗 일정이 성공적으로 예약되었습니다</p>
          </div>

          <div className="p-8">
            {bookingDetails && (
              <>
                {/* 예약 정보 */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">예약 정보</h2>
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">일정</p>
                        <p className="font-medium">{formatDate(bookingDetails.scheduledDate)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MessageSquare className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">멘토</p>
                        <p className="font-medium">{bookingDetails.mentorName}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Mail className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">예약 번호</p>
                        <p className="font-medium">#{bookingDetails.sessionId}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 다음 단계 안내 */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">다음 단계</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                        <span className="text-blue-600 font-semibold text-sm">1</span>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">이메일 확인</h3>
                        <p className="text-sm text-gray-600">
                          등록하신 이메일로 예약 확인 메일이 발송되었습니다. 
                          Google Calendar 초대장도 함께 확인해주세요.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                        <span className="text-blue-600 font-semibold text-sm">2</span>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">사전 준비</h3>
                        <p className="text-sm text-gray-600">
                          커피챗 전에 질문하고 싶은 내용을 미리 정리해두시면 더욱 유익한 시간이 될 수 있습니다.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                        <span className="text-blue-600 font-semibold text-sm">3</span>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">당일 접속</h3>
                        <p className="text-sm text-gray-600">
                          예약 시간 5분 전에 Google Meet 링크로 접속해주세요. 
                          마이크와 카메라가 정상 작동하는지 미리 확인해주세요.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 취소 정책 */}
                <div className="bg-amber-50 rounded-lg p-4 mb-8">
                  <h3 className="font-medium text-amber-900 mb-2">취소 정책 안내</h3>
                  <ul className="text-sm text-amber-800 space-y-1">
                    <li>• 예약 24시간 전까지 무료 취소가 가능합니다</li>
                    <li>• 24시간 이내 취소 시 수수료가 발생할 수 있습니다</li>
                    <li>• 취소는 마이페이지 &gt; 예약 내역에서 가능합니다</li>
                  </ul>
                </div>

                {/* 액션 버튼 */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate('/profile')}
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    내 예약 확인
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                  
                  <button
                    onClick={() => navigate('/services/coffee-chat')}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    더 많은 멘토 보기
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 추가 도움말 */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>문의사항이 있으신가요?</p>
          <a href="mailto:support@jamescompany.kr" className="text-blue-600 hover:underline">
            support@jamescompany.kr
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;