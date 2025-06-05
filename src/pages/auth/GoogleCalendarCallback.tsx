// src/pages/auth/GoogleCalendarCallback.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { coffeeChatApi } from '../../pages/services/coffee-chat/api';

const GoogleCalendarCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const error = searchParams.get('error');

      if (error) {
        setError('Google Calendar 연동이 취소되었습니다.');
        setTimeout(() => {
          navigate('/services/coffee-chat/mentor-registration');
        }, 2000);
        return;
      }

      if (!code) {
        setError('인증 코드가 없습니다.');
        return;
      }

      try {
        // 백엔드로 code 전송
        await coffeeChatApi.handleGoogleCalendarCallback(code);
        
        // state 파라미터에 따라 리다이렉트
        if (state === 'mentor-registration') {
          navigate('/services/coffee-chat/mentor-registration', { 
            state: { calendarConnected: true } 
          });
        } else {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Calendar callback error:', error);
        setError('Google Calendar 연동에 실패했습니다.');
        setTimeout(() => {
          navigate('/services/coffee-chat/mentor-registration');
        }, 2000);
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        {error ? (
          <div className="text-red-600">
            <p>{error}</p>
            <p className="text-sm text-gray-500 mt-2">잠시 후 이전 페이지로 돌아갑니다...</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Google Calendar 연동 중...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleCalendarCallback;