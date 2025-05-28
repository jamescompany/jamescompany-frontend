import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { Menu, X, User } from 'lucide-react'
import { useState } from 'react'

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
                <Link to="/dashboard" className="flex items-center text-gray-700 hover:text-primary">
                  <User className="w-5 h-5 mr-1" />
                  {user?.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-primary"
                >
                  로그아웃
                </button>
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
                <button onClick={handleLogout} className="block py-2 text-gray-700 w-full text-left">
                  로그아웃
                </button>
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