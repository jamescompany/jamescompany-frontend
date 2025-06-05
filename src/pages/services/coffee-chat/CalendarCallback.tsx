// src/pages/services/coffee-chat/CalendarCallback.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import { coffeeChatApi } from './api';

const CalendarCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    handleCallback();
  }, []);

  const handleCallback = async () => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const state = searchParams.get('state');

    if (error) {
      setStatus('error');
      setMessage('Google Calendar 연동이 취소되었습니다.');
      return;
    }

    if (!code) {
      setStatus('error');
      setMessage('인증 코드를 받지 못했습니다.');
      return;
    }

    try {
      const result = await coffeeChatApi.handleGoogleCalendarCallback(code);
      
      if (result.isConnected) {
        setStatus('success');
        setMessage('Google Calendar가 성공적으로 연동되었습니다!');
        
        // state에 리다이렉트 정보가 있으면 해당 페이지로, 없으면 멘토 등록 페이지로
        setTimeout(() => {
          if (state === 'mentor-registration') {
            navigate('/services/coffee-chat/mentor-registration', { 
              state: { calendarConnected: true } 
            });
          } else {
            navigate('/services/coffee-chat');
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Calendar connection failed:', error);
      setStatus('error');
      setMessage('Google Calendar 연동 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {status === 'loading' && (
            <>
              <Loader className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Google Calendar 연동 중...</h2>
              <p className="text-gray-600">잠시만 기다려주세요.</p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">연동 완료!</h2>
              <p className="text-gray-600">{message}</p>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">연동 실패</h2>
              <p className="text-gray-600 mb-4">{message}</p>
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                이전 페이지로 돌아가기
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarCallback;