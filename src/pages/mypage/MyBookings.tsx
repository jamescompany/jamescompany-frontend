// src/pages/mypage/MyBookings.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import api from '../../services/api';
import { useAuthStore } from '../../stores/authStore';

interface Booking {
  id: string;
  mentorName: string;
  mentorTitle: string;
  scheduledDate: string;
  duration: number;
  status: 'pending' | 'completed' | 'cancelled' | 'refunded';
  price: number;
  hasReview?: boolean;
  calendarEventId?: string;
}

const MyBookings: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const isDevelopment = import.meta.env.DEV;
    
    if (isDevelopment) {
      // 개발 환경: 임시 데이터
      setTimeout(() => {
        setBookings([
          {
            id: '1',
            mentorName: '김철수',
            mentorTitle: 'QA 자동화 전문가',
            scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            duration: 60,
            status: 'pending',
            price: 50000,
            calendarEventId: 'google-calendar-123'
          },
          {
            id: '2',
            mentorName: '이영희',
            mentorTitle: '시니어 QA 엔지니어',
            scheduledDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
            duration: 60,
            status: 'pending',
            price: 60000,
            calendarEventId: 'google-calendar-456'
          },
          {
            id: '3',
            mentorName: '박민수',
            mentorTitle: '테스트 아키텍트',
            scheduledDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            duration: 60,
            status: 'completed',
            price: 80000,
            hasReview: false
          }
        ]);
        setLoading(false);
      }, 500);
    } else {
      // 프로덕션 환경: 실제 API 호출
      try {
        const response = await api.get('/api/coffee-chat/my-sessions?role=mentee');
        setBookings(response.data);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = async (bookingId: string) => {
    if (!confirm('정말 취소하시겠습니까? 예약 24시간 전까지만 무료 취소가 가능합니다.')) {
      return;
    }

    const isDevelopment = import.meta.env.DEV;
    
    if (isDevelopment) {
      // 개발 환경: 상태만 업데이트
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' as const }
          : booking
      ));
      alert('예약이 취소되었습니다.');
    } else {
      // 프로덕션 환경: 실제 API 호출
      try {
        await api.post(`/api/coffee-chat/sessions/${bookingId}/cancel`, {
          reason: '사용자 요청'
        });
        fetchBookings();
        alert('예약이 취소되었습니다.');
      } catch (error) {
        console.error('Failed to cancel booking:', error);
        alert('취소에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleReview = (bookingId: string) => {
    navigate(`/my-page/review/${bookingId}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="flex items-center text-yellow-600">
            <AlertCircle className="w-4 h-4 mr-1" />
            예약 확정
          </span>
        );
      case 'completed':
        return (
          <span className="flex items-center text-green-600">
            <CheckCircle className="w-4 h-4 mr-1" />
            완료
          </span>
        );
      case 'cancelled':
      case 'refunded':
        return (
          <span className="flex items-center text-red-600">
            <XCircle className="w-4 h-4 mr-1" />
            취소됨
          </span>
        );
      default:
        return null;
    }
  };

  const upcomingBookings = bookings.filter(
    b => new Date(b.scheduledDate) > new Date() && b.status === 'pending'
  );
  
  const pastBookings = bookings.filter(
    b => new Date(b.scheduledDate) <= new Date() || b.status !== 'pending'
  );

  const displayBookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">내 예약 내역</h1>

        {/* 탭 */}
        <div className="flex border-b mb-6">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'upcoming'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            예정된 커피챗 ({upcomingBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'past'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            지난 커피챗 ({pastBookings.length})
          </button>
        </div>

        {/* 예약 목록 */}
        {displayBookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {activeTab === 'upcoming' 
                ? '예정된 커피챗이 없습니다.' 
                : '지난 커피챗이 없습니다.'}
            </p>
            {activeTab === 'upcoming' && (
              <button
                onClick={() => navigate('/services/coffee-chat')}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                커피챗 예약하기
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {displayBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{booking.mentorName}</h3>
                        <p className="text-gray-600">{booking.mentorTitle}</p>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {format(new Date(booking.scheduledDate), 'yyyy년 M월 d일 (EEEEE)', { locale: ko })}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {format(new Date(booking.scheduledDate), 'HH:mm')} ({booking.duration}분)
                      </div>
                      <div className="flex items-center text-gray-600">
                        <span className="font-medium">₩{booking.price.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* 액션 버튼 */}
                    <div className="mt-4 flex gap-3">
                      {booking.status === 'pending' && new Date(booking.scheduledDate) > new Date() && (
                        <>
                          <button
                            onClick={() => handleCancel(booking.id)}
                            className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50"
                          >
                            예약 취소
                          </button>
                          {booking.calendarEventId && (
                            <a
                              href={`https://calendar.google.com/calendar/r/eventedit/${booking.calendarEventId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                              캘린더에서 보기
                            </a>
                          )}
                        </>
                      )}
                      
                      {booking.status === 'completed' && !booking.hasReview && (
                        <button
                          onClick={() => handleReview(booking.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          리뷰 작성
                        </button>
                      )}
                      
                      {booking.status === 'completed' && booking.hasReview && (
                        <span className="text-sm text-gray-500">리뷰 작성 완료</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 안내 사항 */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold mb-2">안내 사항</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• 예약 24시간 전까지 무료 취소가 가능합니다.</li>
            <li>• 커피챗 시작 5분 전에 Google Meet 링크로 접속해주세요.</li>
            <li>• 완료된 커피챗은 7일 이내에 리뷰를 작성할 수 있습니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;