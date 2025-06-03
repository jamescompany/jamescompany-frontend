// src/pages/services/coffee-chat/CoffeeChatBooking.tsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, CreditCard, AlertCircle, Check } from 'lucide-react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { coffeeChatApi } from './api';

interface Mentor {
  id: string;
  name: string;
  title: string;
  expertise: string[];
  session_price: number;
  bio: string;
  qa_experience?: string;
}

interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
  reason?: string;
}

const CoffeeChatBooking: React.FC = () => {
  const { mentorId } = useParams<{ mentorId: string }>();
  const navigate = useNavigate();
  
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: 날짜/시간 선택, 2: 정보 입력, 3: 결제

  useEffect(() => {
    if (mentorId) {
      fetchMentorDetails();
    }
  }, [mentorId]);

  useEffect(() => {
    if (mentor && selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedDate, mentor]);

  const fetchMentorDetails = async () => {
    try {
      const data = await coffeeChatApi.getMentorById(mentorId!);
      setMentor(data);
    } catch (error) {
      console.error('Failed to fetch mentor details:', error);
      // 에러 발생 시 임시 데이터
      setMentor({
        id: mentorId || '1',
        name: mentorId === '1' ? '홍지현' : mentorId === '2' ? '이영희' : '박민수',
        title: mentorId === '1' ? 'QA 자동화 전문가' : mentorId === '2' ? '시니어 QA 엔지니어' : '테스트 아키텍트',
        expertise: mentorId === '1' ? ['웹 테스팅', '자동화 테스팅', 'CI/CD'] : 
                   mentorId === '2' ? ['모바일 테스팅', 'API 테스팅', '성능 테스팅'] :
                   ['테스트 전략', 'QA 리더십', 'SDET'],
        session_price: mentorId === '1' ? 50000 : mentorId === '2' ? 60000 : 80000,
        bio: mentorId === '1' ? '10년차 QA 엔지니어로 다양한 자동화 프레임워크 경험이 있습니다.' :
             mentorId === '2' ? '모바일 앱 테스팅 전문가로 대규모 서비스 QA 경험이 풍부합니다.' :
             '테스트 전략 수립과 QA 팀 빌딩 경험이 풍부한 리더입니다.',
        qa_experience: '삼성전자, 네이버, 카카오에서 QA 엔지니어로 근무했습니다.'
      });
    }
  };

  const fetchAvailableSlots = async () => {
    const startDate = format(selectedDate, 'yyyy-MM-dd');
    const endDate = format(selectedDate, 'yyyy-MM-dd');
    
    try {
      const data = await coffeeChatApi.getMentorAvailableSlots(mentorId!, startDate, endDate);
      setAvailableSlots(data);
    } catch (error) {
      console.error('Failed to fetch available slots:', error);
      generateMockSlots();
    }
  };

  const generateMockSlots = () => {
    const slots: TimeSlot[] = [];
    const hours = [9, 10, 11, 14, 15, 16, 17];
    
    hours.forEach(hour => {
      const isAvailable = Math.random() > 0.3;
      slots.push({
        start: `${hour}:00`,
        end: `${hour + 1}:00`,
        available: isAvailable,
        reason: !isAvailable ? '이미 예약된 시간입니다' : undefined
      });
    });
    
    setAvailableSlots(slots);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    if (slot.available) {
      setSelectedSlot(slot);
    }
  };

  const handleNextStep = () => {
    if (step === 1 && selectedSlot) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleBooking = async () => {
    if (!selectedSlot || !mentor) return;

    setLoading(true);
    
    const bookingData = {
      mentorId: mentor.id,
      slotId: `${format(selectedDate, 'yyyy-MM-dd')}-${selectedSlot.start}`,
      topic: '커피챗 세션',
      message: message,
      duration: 60
    };

    try {
      await coffeeChatApi.createBooking(bookingData);
      navigate('/services/coffee-chat/booking-success');
    } catch (error: any) {
      console.error('Booking failed:', error);
      
      // 에러 유형에 따라 다른 실패 페이지로 이동
      if (error.response?.status === 402) {
        navigate('/services/coffee-chat/booking-failed?type=payment_failed');
      } else if (error.response?.status === 408) {
        navigate('/services/coffee-chat/booking-failed?type=timeout');
      } else {
        navigate('/services/coffee-chat/booking-failed?type=error');
      }
    } finally {
      setLoading(false);
    }
  };

  // 달력 날짜 생성
  const generateCalendarDates = () => {
    const dates = [];
    const today = new Date();
    const start = startOfWeek(today, { weekStartsOn: 0 });
    
    for (let i = 0; i < 28; i++) {
      dates.push(addDays(start, i));
    }
    
    return dates;
  };

  if (!mentor) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 진행 상태 표시 */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                {step > 1 ? <Check className="w-5 h-5" /> : '1'}
              </div>
              <span className="ml-2 font-medium">일정 선택</span>
            </div>
            
            <div className={`mx-8 w-24 h-0.5 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            
            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                {step > 2 ? <Check className="w-5 h-5" /> : '2'}
              </div>
              <span className="ml-2 font-medium">정보 입력</span>
            </div>
            
            <div className={`mx-8 w-24 h-0.5 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            
            <div className={`flex items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                3
              </div>
              <span className="ml-2 font-medium">결제</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* 멘토 정보 헤더 */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">{mentor.name} 멘토와의 커피챗</h1>
                <p className="text-blue-100">{mentor.title}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">₩{mentor.session_price.toLocaleString()}</p>
                <p className="text-sm text-blue-100">60분 세션</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {step === 1 && (
              <>
                <h2 className="text-xl font-semibold mb-6">날짜와 시간을 선택해주세요</h2>
                
                {/* 달력 */}
                <div className="mb-8">
                  <h3 className="font-medium mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    날짜 선택
                  </h3>
                  <div className="grid grid-cols-7 gap-2">
                    {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                      <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                        {day}
                      </div>
                    ))}
                    {generateCalendarDates().map(date => {
                      const isToday = isSameDay(date, new Date());
                      const isSelected = isSameDay(date, selectedDate);
                      const isPast = date < new Date();
                      
                      return (
                        <button
                          key={date.toISOString()}
                          onClick={() => !isPast && handleDateSelect(date)}
                          disabled={isPast}
                          className={`
                            p-2 rounded-lg text-sm transition-colors
                            ${isPast ? 'text-gray-300 cursor-not-allowed' : ''}
                            ${isToday && !isPast ? 'bg-blue-50 text-blue-600 font-semibold' : ''}
                            ${isSelected && !isPast ? 'bg-blue-600 text-white' : ''}
                            ${!isPast && !isSelected && !isToday ? 'hover:bg-gray-100' : ''}
                          `}
                        >
                          {format(date, 'd')}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 시간 슬롯 */}
                <div>
                  <h3 className="font-medium mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    시간 선택 ({format(selectedDate, 'M월 d일', { locale: ko })})
                  </h3>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {availableSlots.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => handleSlotSelect(slot)}
                        disabled={!slot.available}
                        className={`
                          p-3 rounded-lg border-2 transition-all
                          ${!slot.available 
                            ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed' 
                            : selectedSlot === slot
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-200 hover:border-blue-300'
                          }
                        `}
                      >
                        <p className="font-medium">{slot.start} - {slot.end}</p>
                        {!slot.available && (
                          <p className="text-xs mt-1">{slot.reason}</p>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleNextStep}
                    disabled={!selectedSlot}
                    className={`
                      px-6 py-3 rounded-lg font-medium transition-colors
                      ${selectedSlot
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }
                    `}
                  >
                    다음 단계
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-xl font-semibold mb-6">추가 정보 입력</h2>
                
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900 mb-1">선택한 일정</p>
                      <p className="text-blue-700">
                        {format(selectedDate, 'yyyy년 M월 d일', { locale: ko })} {selectedSlot?.start} - {selectedSlot?.end}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      멘토에게 전달할 메시지 (선택사항)
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="상담받고 싶은 주제나 궁금한 점을 자유롭게 작성해주세요"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium mb-3">예약 정보 확인</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">멘토</span>
                        <span className="font-medium">{mentor.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">일정</span>
                        <span className="font-medium">
                          {format(selectedDate, 'M월 d일', { locale: ko })} {selectedSlot?.start}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">시간</span>
                        <span className="font-medium">60분</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-gray-900 font-medium">결제 금액</span>
                        <span className="font-bold text-lg">₩{mentor.session_price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                  >
                    이전 단계
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                  >
                    결제하기
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-xl font-semibold mb-6">결제 정보</h2>
                
                <div className="text-center py-8">
                  <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-6">
                    안전한 결제를 위해 결제 페이지로 이동합니다
                  </p>
                  
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={handleBooking}
                      disabled={loading}
                      className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
                    >
                      {loading ? '처리 중...' : '결제 진행하기'}
                    </button>
                    
                    <button
                      onClick={() => navigate('/services/coffee-chat/booking-failed?type=cancelled')}
                      disabled={loading}
                      className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50"
                    >
                      취소
                    </button>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">결제 안내</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 결제는 Stripe를 통해 안전하게 처리됩니다</li>
                    <li>• 예약 24시간 전까지 무료 취소가 가능합니다</li>
                    <li>• 결제 완료 후 Google Calendar 초대장이 발송됩니다</li>
                  </ul>
                </div>

                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                  >
                    이전 단계
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeChatBooking;