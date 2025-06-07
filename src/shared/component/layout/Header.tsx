// src/components/layout/Header.tsx

import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/stores/authStore"; // 이 경로는 그대로 유효
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";
import ProfileMenu from "./ProfileMenu";

export default function Header() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const services = [
    { name: "커피챗", path: "/services/coffee-chat" },
    { name: "CaseMaker", path: "/services/casemaker" },
    { name: "QAuto", path: "/services/qauto" },
    { name: "교육", path: "/services/education" },
    { name: "Bug Bounty Arena", path: "/services/bug-bounty" },
    { name: "QA 채용", path: "/services/recruitment", isNew: true },
  ];

  const handleMouseEnter = (dropdown: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 100); // 100ms 지연
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              JAMES COMPANY
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-gray-700 hover:text-primary">
              회사소개
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("services")}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center gap-1 text-gray-700 hover:text-primary py-2">
                서비스
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    activeDropdown === "services" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeDropdown === "services" && (
                <>
                  {/* 투명한 브릿지 - 버튼과 드롭다운 사이의 간격을 메우는 역할 */}
                  <div className="absolute top-full left-0 right-0 h-2" />

                  <div className="absolute top-full left-0 mt-0 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {services.map((service) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <div className="flex items-center justify-between">
                          <span>{service.name}</span>
                          {service.isNew && (
                            <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                              NEW
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            <Link to="/insights" className="text-gray-700 hover:text-primary">
              인사이트
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary">
              문의하기
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-primary"
                >
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
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              to="/about"
              className="block py-2 text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              회사소개
            </Link>

            {/* Mobile Services */}
            <div className="py-2">
              <div className="font-medium text-gray-900 mb-2">서비스</div>
              <div className="pl-4 space-y-2">
                {services.map((service) => (
                  <Link
                    key={service.path}
                    to={service.path}
                    className="flex py-1 text-gray-700 items-center justify-between" // 'block'과 'flex' 충돌 해결
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{service.name}</span>
                    {service.isNew && (
                      <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                        NEW
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/insights"
              className="block py-2 text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              인사이트
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              문의하기
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block py-2 text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  대시보드
                </Link>
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <div className="px-2 py-2 text-sm">
                    <p className="font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="block py-2 text-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    내 정보
                  </Link>
                  <Link
                    to="/mypage/applications"
                    className="block py-2 text-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    지원 현황
                  </Link>
                  <Link
                    to="/settings"
                    className="block py-2 text-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    계정 설정
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block py-2 text-gray-700 w-full text-left"
                  >
                    로그아웃
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  로그인
                </Link>
                <Link
                  to="/signup"
                  className="block py-2 text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
