// src/components/auth/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, token } = useAuthStore();
  
  // localStorage에서 토큰 직접 확인 (persist 로드 지연 대응)
  const hasToken = token || localStorage.getItem('access_token');
  
  if (!isAuthenticated && !hasToken) {
    // 로그인 페이지로 리다이렉트하면서 현재 위치 저장
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;