// src/components/profile/BookingHistory.tsx

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import api from '../../services/api';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  created_at: string;
  membership_tier: string;
  is_admin: boolean;
  is_active: boolean;
}

interface Booking {
  id: string;
  mentor_id: string;
  mentor_name: string;
  scheduled_date: string;
  scheduled_time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  meeting_link?: string;
  notes?: string;
}

interface BookingHistoryProps {
  profile: UserProfile | null;
}

const BookingHistory: React.FC<BookingHistoryProps> = ({ profile }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile) {
      fetchBookings();
    }
  }, [profile]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/bookings/my-bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      // 임시 데이터
      setBookings([
        {
          id: '1',
          mentor_id: '1',
          mentor_name: '김멘토',
          scheduled_date: '2025-01-15',
          scheduled_time: '14:00',
          status: 'completed',
          created_at: '2025-01-10T10:00:00Z',
          notes: 'QA 자동화 관련 상담'
        },
        {
          id: '2',
          mentor_id: '2',
          mentor_name: '이멘토',
          scheduled_date: '2025-01-20',
          scheduled_time: '16:00',
          status: 'confirmed',
          created_at: '2025-01-12T10:00:00Z',
          meeting_link: 'https://meet.google.com/abc-defg-hij',
          notes: '커리어 전환 상담'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'confirmed':
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '완료됨';
      case 'confirmed':
        return '확정됨';
      case 'cancelled':
        return '취소됨';
      default:
        return '대기중';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">예약 내역</h3>
      
      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">아직 예약 내역이 없습니다.</p>
          <p className="text-sm text-gray-400 mt-2">커피챗을 예약해보세요!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {getStatusIcon(booking.status)}
                    <h4 className="text-lg font-semibold text-gray-900">{booking.mentor_name} 멘토님</h4>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {getStatusText(booking.status)}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(booking.scheduled_date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{booking.scheduled_time}</span>
                    </div>
                    {booking.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded">
                        <p className="text-sm text-gray-700">{booking.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="ml-4">
                  {booking.status === 'confirmed' && booking.meeting_link && (
                    <a
                      href={booking.meeting_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                      미팅 참여
                    </a>
                  )}
                  {booking.status === 'pending' && (
                    <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50">
                      예약 취소
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;