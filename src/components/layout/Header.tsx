// src/components/layout/Header.tsx
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import ProfileMenu from './ProfileMenu'

export default function Header() {
  const { isAuthenticated, user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              James Company
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-gray-700 hover:text-primary">
              회사소개
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-primary">
              서비스
            </Link>
            <Link to="/insights" className="text-gray-700 hover:text-primary">
              인사이트
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary">
              문의하기
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="text-gray-700 hover:text-primary">
                  대시보드
                </Link>
                <ProfileMenu />
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-primary">
                  로그인
                </Link>
                <Link to="/signup" className="btn-primary">
                  회원가입
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link to="/about" className="block py-2 text-gray-700">회사소개</Link>
            <Link to="/services" className="block py-2 text-gray-700">서비스</Link>
            <Link to="/insights" className="block py-2 text-gray-700">인사이트</Link>
            <Link to="/contact" className="block py-2 text-gray-700">문의하기</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block py-2 text-gray-700">대시보드</Link>
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <div className="px-2 py-2 text-sm">
                    <p className="font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <Link to="/profile" className="block py-2 text-gray-700">내 정보</Link>
                  <Link to="/settings" className="block py-2 text-gray-700">계정 설정</Link>
                  <button onClick={handleLogout} className="block py-2 text-gray-700 w-full text-left">
                    로그아웃
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 text-gray-700">로그인</Link>
                <Link to="/signup" className="block py-2 text-gray-700">회원가입</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}