// src/features/auth/components/ProtectedRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'mentor' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const user = useAuthStore(state => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 역할 기반 접근 제어
  if (requiredRole) {
    // 멘토 페이지 접근 시
    if (requiredRole === 'mentor') {
      // admin은 모든 페이지 접근 가능
      if (user?.role === 'admin') {
        return <>{children}</>;
      }
      
      // mentorStatus 체크 (승인된 멘토인지 확인)
      if (user?.mentorStatus === 'pending') {
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">승인 대기 중</h2>
              <p className="text-gray-600 mb-6">
                멘토 신청이 검토 중입니다.<br />
                승인 완료 후 이용 가능합니다.
              </p>
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                대시보드로 돌아가기
              </button>
            </div>
          </div>
        );
      }
      
      if (user?.mentorStatus === 'rejected') {
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">접근 불가</h2>
              <p className="text-gray-600 mb-6">
                멘토 신청이 거절되었습니다.<br />
                자세한 내용은 이메일을 확인해주세요.
              </p>
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                대시보드로 돌아가기
              </button>
            </div>
          </div>
        );
      }
      
      // mentorStatus가 'approved'인 경우에만 접근 허용
      if (user?.mentorStatus === 'approved') {
        return <>{children}</>;
      }
      
      // 멘토가 아닌 경우
      return <Navigate to="/dashboard" replace />;
    }
    
    // 관리자 페이지 접근 시
    if (requiredRole === 'admin' && user?.role !== 'admin') {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;