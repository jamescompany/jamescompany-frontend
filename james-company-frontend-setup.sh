#!/bin/bash

# James Company Frontend Project Setup Script
# 이 스크립트를 실행하면 전체 프론트엔드 프로젝트가 생성됩니다.

echo "🚀 James Company Frontend 프로젝트를 생성합니다..."

# 프로젝트 생성
yarn create vite james-company --template react-ts
cd james-company

# 의존성 설치
echo "📦 패키지를 설치하는 중..."
yarn add react-router-dom zustand axios date-fns lucide-react
yarn add -D tailwindcss postcss autoprefixer @types/react-router-dom

# Tailwind 초기화
npx tailwindcss init -p

# 디렉토리 구조 생성
echo "📁 디렉토리 구조를 생성하는 중..."
mkdir -p src/{components,pages,stores,services,types,utils,styles}
mkdir -p src/components/{ui,layout,auth,service}
mkdir -p src/pages/{auth,services,insights}

# tailwind.config.js
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#10b981',
        accent: '#f59e0b',
      },
    },
  },
  plugins: [],
}
EOF

# src/styles/globals.css
cat > src/styles/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --primary: 37 99 235;
    --secondary: 16 185 129;
    --accent: 245 158 11;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity;
  }
  
  .btn-secondary {
    @apply bg-secondary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow;
  }
}
EOF

# src/main.tsx
cat > src/main.tsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
EOF

# src/App.tsx
cat > src/App.tsx << 'EOF'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/auth/ProtectedRoute'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'
import Insights from './pages/insights/Insights'
import CoffeeChat from './pages/services/CoffeeChat'
import CaseMaker from './pages/services/CaseMaker'
import Education from './pages/services/Education'
import BugBounty from './pages/services/BugBounty'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="services/coffee-chat" element={<CoffeeChat />} />
        <Route path="services/casemaker" element={<CaseMaker />} />
        <Route path="services/education" element={<Education />} />
        <Route path="services/bug-bounty" element={<BugBounty />} />
        <Route path="insights" element={<Insights />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
EOF

# src/types/index.ts
cat > src/types/index.ts << 'EOF'
export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
}

export interface Post {
  id: string
  title: string
  content: string
  category: 'notice' | 'story'
  author: string
  createdAt: string
  updatedAt: string
}

export interface CoffeeChatSlot {
  id: string
  date: string
  time: string
  type: 'online' | 'offline'
  available: boolean
}

export interface Course {
  id: string
  title: string
  description: string
  price: number
  duration: string
  enrolled?: boolean
}

export interface BetaTest {
  id: string
  appName: string
  description: string
  deadline: string
  participants: number
  maxParticipants: number
}
EOF

# src/stores/authStore.ts
cat > src/stores/authStore.ts << 'EOF'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '../types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (data: SignupData) => Promise<void>
  logout: () => void
}

interface SignupData {
  email: string
  password: string
  name: string
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        // Mock login - 나중에 실제 API로 교체
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockUser: User = {
          id: '1',
          email,
          name: 'Test User',
          role: 'user'
        }
        
        set({ user: mockUser, isAuthenticated: true })
      },
      
      signup: async (data: SignupData) => {
        // Mock signup - 나중에 실제 API로 교체
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockUser: User = {
          id: '2',
          email: data.email,
          name: data.name,
          role: 'user'
        }
        
        set({ user: mockUser, isAuthenticated: true })
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false })
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)
EOF

# src/stores/serviceStore.ts
cat > src/stores/serviceStore.ts << 'EOF'
import { create } from 'zustand'
import { CoffeeChatSlot, Course, BetaTest } from '../types'

interface ServiceState {
  // Coffee Chat
  coffeeSlots: CoffeeChatSlot[]
  fetchCoffeeSlots: () => Promise<void>
  bookCoffeeSlot: (slotId: string) => Promise<void>
  
  // Education
  courses: Course[]
  myCourses: Course[]
  fetchCourses: () => Promise<void>
  enrollCourse: (courseId: string) => Promise<void>
  
  // Bug Bounty
  betaTests: BetaTest[]
  fetchBetaTests: () => Promise<void>
  applyBetaTest: (testId: string) => Promise<void>
}

export const useServiceStore = create<ServiceState>((set, get) => ({
  // Coffee Chat
  coffeeSlots: [],
  fetchCoffeeSlots: async () => {
    // Mock data
    const mockSlots: CoffeeChatSlot[] = [
      { id: '1', date: '2024-01-25', time: '14:00', type: 'online', available: true },
      { id: '2', date: '2024-01-25', time: '15:00', type: 'offline', available: true },
      { id: '3', date: '2024-01-26', time: '10:00', type: 'online', available: false },
    ]
    set({ coffeeSlots: mockSlots })
  },
  
  bookCoffeeSlot: async (slotId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const slots = get().coffeeSlots.map(slot => 
      slot.id === slotId ? { ...slot, available: false } : slot
    )
    set({ coffeeSlots: slots })
  },
  
  // Education
  courses: [],
  myCourses: [],
  fetchCourses: async () => {
    const mockCourses: Course[] = [
      { id: '1', title: 'QA 자동화 입문', description: 'Selenium과 Pytest로 시작하는 자동화', price: 99000, duration: '8주' },
      { id: '2', title: 'SDET 실무', description: 'CI/CD와 테스트 자동화 구축', price: 199000, duration: '12주' },
    ]
    set({ courses: mockCourses })
  },
  
  enrollCourse: async (courseId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const course = get().courses.find(c => c.id === courseId)
    if (course) {
      set({ myCourses: [...get().myCourses, { ...course, enrolled: true }] })
    }
  },
  
  // Bug Bounty
  betaTests: [],
  fetchBetaTests: async () => {
    const mockTests: BetaTest[] = [
      { id: '1', appName: '쇼핑 앱 v2.0', description: '새로운 결제 시스템 테스트', deadline: '2024-02-01', participants: 45, maxParticipants: 100 },
      { id: '2', appName: '피트니스 트래커', description: '운동 기록 기능 베타 테스트', deadline: '2024-01-30', participants: 23, maxParticipants: 50 },
    ]
    set({ betaTests: mockTests })
  },
  
  applyBetaTest: async (testId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    console.log('Applied to beta test:', testId)
  }
}))
EOF

# src/components/layout/Layout.tsx
cat > src/components/layout/Layout.tsx << 'EOF'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
EOF

# src/components/layout/Header.tsx
cat > src/components/layout/Header.tsx << 'EOF'
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
EOF

# src/components/layout/Footer.tsx
cat > src/components/layout/Footer.tsx << 'EOF'
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">James Company</h3>
            <p className="text-gray-400">혁신적인 솔루션을 제공합니다</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">서비스</h4>
            <ul className="space-y-2 text-gray-400">
              <li>커피챗</li>
              <li>CaseMaker</li>
              <li>교육 서비스</li>
              <li>Bug Bounty Arena</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">회사</h4>
            <ul className="space-y-2 text-gray-400">
              <li>회사 소개</li>
              <li>인사이트</li>
              <li>문의하기</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">연락처</h4>
            <p className="text-gray-400">contact@jamescompany.com</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 James Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
EOF

# src/components/auth/ProtectedRoute.tsx
cat > src/components/auth/ProtectedRoute.tsx << 'EOF'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
EOF

# src/components/ui/Button.tsx
cat > src/components/ui/Button.tsx << 'EOF'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'font-medium rounded-lg transition-all duration-200 disabled:opacity-50'
    
    const variants = {
      primary: 'bg-primary text-white hover:opacity-90',
      secondary: 'bg-secondary text-white hover:opacity-90',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
    }
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg'
    }
    
    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`
    
    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
EOF

# src/components/ui/Input.tsx
cat > src/components/ui/Input.tsx << 'EOF'
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-3 py-2 border border-gray-300 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
EOF

# src/components/ui/Card.tsx
cat > src/components/ui/Card.tsx << 'EOF'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hoverable?: boolean
}

export default function Card({ children, className = '', hoverable = false }: CardProps) {
  return (
    <div className={`
      bg-white rounded-lg shadow-md p-6
      ${hoverable ? 'hover:shadow-lg transition-shadow duration-200' : ''}
      ${className}
    `}>
      {children}
    </div>
  )
}
EOF

# src/pages/Home.tsx
cat > src/pages/Home.tsx << 'EOF'
import { Link } from 'react-router-dom'
import { ArrowRight, Coffee, Code, GraduationCap, Bug } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

export default function Home() {
  const services = [
    {
      icon: <Coffee className="w-8 h-8 text-primary" />,
      title: '커피챗',
      description: 'Google Calendar와 연동되는 1:1 상담 서비스',
      link: '/services/coffee-chat'
    },
    {
      icon: <Code className="w-8 h-8 text-primary" />,
      title: 'CaseMaker',
      description: '테스트 케이스 자동 생성 웹 서비스',
      link: '/services/casemaker'
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-primary" />,
      title: '교육 서비스',
      description: 'QA/SDET 전문 교육 프로그램',
      link: '/services/education'
    },
    {
      icon: <Bug className="w-8 h-8 text-primary" />,
      title: 'Bug Bounty Arena',
      description: '앱 출시 전 베타 테스트 서비스',
      link: '/services/bug-bounty'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            다양한 형태의 성장을 돕습니다
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            QA 자동화부터 교육, 컨설팅까지 James Company와 함께 
            더 나은 소프트웨어 품질을 만들어가세요.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/services">
              <Button size="lg">서비스 둘러보기</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">문의하기</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">우리의 서비스</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link key={index} to={service.link}>
                <Card hoverable className="h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <span className="text-primary flex items-center">
                      자세히 보기 <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            프로젝트를 시작할 준비가 되셨나요?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            전문가와 함께 최적의 솔루션을 찾아보세요
          </p>
          <Link to="/contact">
            <Button variant="secondary" size="lg">
              지금 상담 신청하기
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
EOF

# src/pages/About.tsx
cat > src/pages/About.tsx << 'EOF'
export default function About() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">회사 소개</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            James Company는 소프트웨어 품질 향상을 위한 다양한 솔루션을 제공하는 
            기술 기반 스타트업입니다.
          </p>
          
          <h2 className="text-2xl font-semibold mt-12 mb-4">우리의 미션</h2>
          <p className="text-gray-700">
            모든 개발팀이 더 나은 소프트웨어를 만들 수 있도록 지원하고, 
            QA 문화를 혁신하는 것이 우리의 목표입니다.
          </p>
          
          <h2 className="text-2xl font-semibold mt-12 mb-4">핵심 가치</h2>
          <ul className="space-y-4 text-gray-700">
            <li>
              <strong>혁신:</strong> 끊임없이 새로운 방법을 탐구합니다
            </li>
            <li>
              <strong>품질:</strong> 최고의 품질을 추구합니다
            </li>
            <li>
              <strong>성장:</strong> 고객과 함께 성장합니다
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
EOF

# src/pages/Services.tsx
cat > src/pages/Services.tsx << 'EOF'
import { Link } from 'react-router-dom'
import { Coffee, Code, GraduationCap, Bug } from 'lucide-react'
import Card from '../components/ui/Card'

export default function Services() {
  const services = [
    {
      icon: <Coffee className="w-12 h-12 text-primary" />,
      title: '커피챗',
      description: '1:1 맞춤형 상담 서비스로 당신의 고민을 해결해드립니다. Google Calendar와 연동되어 편리하게 일정을 관리할 수 있습니다.',
      features: ['온라인/오프라인 선택 가능', 'Google Calendar 연동', '유연한 일정 조정'],
      link: '/services/coffee-chat'
    },
    {
      icon: <Code className="w-12 h-12 text-primary" />,
      title: 'CaseMaker',
      description: 'AI 기반 테스트 케이스 자동 생성 도구로 QA 업무의 효율성을 극대화합니다.',
      features: ['자동 테스트 케이스 생성', '다양한 형식 지원', '팀 협업 기능'],
      link: '/services/casemaker'
    },
    {
      icon: <GraduationCap className="w-12 h-12 text-primary" />,
      title: '교육 서비스',
      description: 'QA 엔지니어와 SDET를 위한 전문 교육 프로그램을 제공합니다.',
      features: ['실무 중심 커리큘럼', '멘토링 지원', '수료증 발급'],
      link: '/services/education'
    },
    {
      icon: <Bug className="w-12 h-12 text-primary" />,
      title: 'Bug Bounty Arena',
      description: '앱 출시 전 실제 사용자들의 피드백을 받아 품질을 향상시킬 수 있습니다.',
      features: ['베타 테스터 모집', '상세한 버그 리포트', '사용자 피드백 분석'],
      link: '/services/bug-bounty'
    }
  ]

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">우리의 서비스</h1>
          <p className="text-xl text-gray-600">
            James Company가 제공하는 다양한 서비스를 만나보세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">{service.icon}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={service.link}
                    className="text-primary font-semibold hover:underline"
                  >
                    자세히 알아보기 →
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
EOF

# src/pages/Contact.tsx
cat > src/pages/Contact.tsx << 'EOF'
import { useState } from 'react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: API 연동
    console.log('Form submitted:', formData)
    alert('문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">문의하기</h1>
          <p className="text-xl text-gray-600">
            궁금한 점이 있으시면 언제든지 문의해주세요
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="이름"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="이메일"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                문의 유형
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">선택해주세요</option>
                <option value="coffee-chat">커피챗 문의</option>
                <option value="casemaker">CaseMaker 문의</option>
                <option value="education">교육 서비스 문의</option>
                <option value="bug-bounty">Bug Bounty Arena 문의</option>
                <option value="other">기타 문의</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                문의 내용
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              문의 보내기
            </Button>
          </form>
        </Card>

        <div className="mt-12 text-center text-gray-600">
          <p>또는 직접 연락주세요</p>
          <p className="mt-2">
            <strong>이메일:</strong> contact@jamescompany.com
          </p>
        </div>
      </div>
    </div>
  )
}
EOF

# src/pages/auth/Login.tsx
cat > src/pages/auth/Login.tsx << 'EOF'
import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Card from '../../components/ui/Card'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const login = useAuthStore(state => state.login)
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/dashboard'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (error) {
      console.error('Login failed:', error)
      alert('로그인에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">로그인</h2>
          <p className="mt-2 text-gray-600">
            계정이 없으신가요?{' '}
            <Link to="/signup" className="text-primary hover:underline">
              회원가입
            </Link>
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="이메일"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="이메일을 입력하세요"
            />

            <Input
              label="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="비밀번호를 입력하세요"
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-600">로그인 상태 유지</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                비밀번호 찾기
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? '로그인 중...' : '로그인'}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">또는</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                테스트 계정: test@example.com / password
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
EOF

# src/pages/auth/Signup.tsx
cat > src/pages/auth/Signup.tsx << 'EOF'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Card from '../../components/ui/Card'

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const signup = useAuthStore(state => state.signup)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }

    setLoading(true)
    
    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
      navigate('/dashboard')
    } catch (error) {
      console.error('Signup failed:', error)
      alert('회원가입에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">회원가입</h2>
          <p className="mt-2 text-gray-600">
            이미 계정이 있으신가요?{' '}
            <Link to="/login" className="text-primary hover:underline">
              로그인
            </Link>
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="이름"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="이름을 입력하세요"
            />

            <Input
              label="이메일"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="이메일을 입력하세요"
            />

            <Input
              label="비밀번호"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="비밀번호를 입력하세요"
            />

            <Input
              label="비밀번호 확인"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="비밀번호를 다시 입력하세요"
            />

            <div className="flex items-center">
              <input type="checkbox" id="terms" className="mr-2" required />
              <label htmlFor="terms" className="text-sm text-gray-600">
                <Link to="/terms" className="text-primary hover:underline">
                  이용약관
                </Link>
                과{' '}
                <Link to="/privacy" className="text-primary hover:underline">
                  개인정보처리방침
                </Link>
                에 동의합니다
              </label>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? '가입 중...' : '회원가입'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
EOF

# src/pages/Dashboard.tsx
cat > src/pages/Dashboard.tsx << 'EOF'
import { useAuthStore } from '../stores/authStore'
import Card from '../components/ui/Card'
import { Calendar, BookOpen, Bug, Coffee } from 'lucide-react'

export default function Dashboard() {
  const user = useAuthStore(state => state.user)

  const dashboardItems = [
    {
      icon: <Coffee className="w-6 h-6" />,
      title: '예약된 커피챗',
      count: 2,
      link: '/coffee-chat/my'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: '수강 중인 강의',
      count: 1,
      link: '/my-courses'
    },
    {
      icon: <Bug className="w-6 h-6" />,
      title: '참여 중인 베타 테스트',
      count: 3,
      link: '/my-beta-tests'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: '다가오는 일정',
      count: 5,
      link: '/calendar'
    }
  ]

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">대시보드</h1>
          <p className="text-gray-600 mt-2">안녕하세요, {user?.name}님!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardItems.map((item, index) => (
            <Card key={index} hoverable>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-500 mb-2">{item.icon}</div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-2xl font-bold text-primary mt-1">{item.count}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-xl font-semibold mb-4">최근 활동</h2>
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <p className="font-medium">커피챗 예약 완료</p>
                  <p className="text-sm text-gray-600">2024년 1월 25일 오후 2:00</p>
                </div>
                <div className="border-b pb-3">
                  <p className="font-medium">QA 자동화 입문 강의 수강 시작</p>
                  <p className="text-sm text-gray-600">2024년 1월 20일</p>
                </div>
                <div>
                  <p className="font-medium">쇼핑 앱 v2.0 베타 테스트 참여</p>
                  <p className="text-sm text-gray-600">2024년 1월 18일</p>
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Card>
              <h2 className="text-xl font-semibold mb-4">프로필 정보</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">이메일</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">가입일</p>
                  <p className="font-medium">2024년 1월 15일</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">회원 등급</p>
                  <p className="font-medium">일반 회원</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
EOF

# src/pages/services/CoffeeChat.tsx
cat > src/pages/services/CoffeeChat.tsx << 'EOF'
import { useState, useEffect } from 'react'
import { useServiceStore } from '../../stores/serviceStore'
import { useAuthStore } from '../../stores/authStore'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import { Calendar, Clock, MapPin, Video } from 'lucide-react'

export default function CoffeeChat() {
  const { coffeeSlots, fetchCoffeeSlots, bookCoffeeSlot } = useServiceStore()
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const navigate = useNavigate()
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

  useEffect(() => {
    fetchCoffeeSlots()
  }, [fetchCoffeeSlots])

  const handleBooking = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } })
      return
    }

    if (selectedSlot) {
      await bookCoffeeSlot(selectedSlot)
      alert('커피챗이 예약되었습니다!')
      setSelectedSlot(null)
    }
  }

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">커피챗</h1>
          <p className="text-xl text-gray-600">
            편안한 분위기에서 1:1 맞춤 상담을 받아보세요
          </p>
        </div>

        <Card className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">서비스 소개</h2>
          <p className="text-gray-700 mb-6">
            커피챗은 QA 자동화, 테스트 전략, 커리어 개발 등 다양한 주제로 
            전문가와 1:1 상담을 받을 수 있는 서비스입니다.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <Video className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">온라인 미팅</h3>
                <p className="text-sm text-gray-600">Zoom을 통한 화상 상담</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">오프라인 미팅</h3>
                <p className="text-sm text-gray-600">서울 강남 카페에서 만남</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">1시간 상담</h3>
                <p className="text-sm text-gray-600">충분한 시간으로 깊이 있는 대화</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">유연한 일정</h3>
                <p className="text-sm text-gray-600">원하는 시간대 선택 가능</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold mb-6">예약 가능한 시간</h2>
          
          <div className="space-y-3">
            {coffeeSlots.map((slot) => (
              <div
                key={slot.id}
                className={`
                  border rounded-lg p-4 cursor-pointer transition-all
                  ${selectedSlot === slot.id ? 'border-primary bg-blue-50' : 'border-gray-300'}
                  ${!slot.available ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary'}
                `}
                onClick={() => slot.available && setSelectedSlot(slot.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">{slot.date}</span>
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span>{slot.time}</span>
                    {slot.type === 'online' ? (
                      <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        온라인
                      </span>
                    ) : (
                      <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                        오프라인
                      </span>
                    )}
                  </div>
                  <div>
                    {slot.available ? (
                      <span className="text-green-600">예약 가능</span>
                    ) : (
                      <span className="text-red-600">예약 완료</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Button
              onClick={handleBooking}
              disabled={!selectedSlot}
              className="w-full"
              size="lg"
            >
              {isAuthenticated ? '예약하기' : '로그인 후 예약하기'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
EOF

# src/pages/services/CaseMaker.tsx
cat > src/pages/services/CaseMaker.tsx << 'EOF'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import { CheckCircle, Zap, Users, FileText } from 'lucide-react'

export default function CaseMaker() {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: 'AI 기반 자동 생성',
      description: '요구사항을 입력하면 AI가 자동으로 테스트 케이스를 생성합니다'
    },
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: '다양한 형식 지원',
      description: 'Excel, CSV, JSON 등 다양한 형식으로 내보내기 가능'
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: '팀 협업',
      description: '팀원들과 실시간으로 테스트 케이스를 공유하고 편집'
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
      title: '품질 검증',
      description: '생성된 테스트 케이스의 커버리지와 품질을 자동으로 검증'
    }
  ]

  const pricingPlans = [
    {
      name: 'Starter',
      price: '무료',
      features: [
        '월 100개 테스트 케이스 생성',
        '기본 템플릿 제공',
        'CSV 내보내기'
      ]
    },
    {
      name: 'Professional',
      price: '₩99,000/월',
      features: [
        '무제한 테스트 케이스 생성',
        '고급 AI 기능',
        '모든 형식 내보내기',
        '팀 협업 기능',
        '우선 지원'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '문의',
      features: [
        'Professional의 모든 기능',
        '전용 서버 구축',
        'API 제공',
        '맞춤형 통합',
        '전담 매니저'
      ]
    }
  ]

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">CaseMaker</h1>
          <p className="text-xl text-gray-600 mb-8">
            AI로 테스트 케이스 작성 시간을 90% 단축하세요
          </p>
          <Button size="lg">무료로 시작하기</Button>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">주요 기능</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">사용 방법</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">요구사항 입력</h3>
                  <p className="text-gray-600">
                    테스트하려는 기능의 요구사항이나 유저 스토리를 입력합니다
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">AI 분석 및 생성</h3>
                  <p className="text-gray-600">
                    AI가 요구사항을 분석하여 포괄적인 테스트 케이스를 자동 생성합니다
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">검토 및 수정</h3>
                  <p className="text-gray-600">
                    생성된 테스트 케이스를 검토하고 필요시 수정합니다
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">내보내기 및 실행</h3>
                  <p className="text-gray-600">
                    원하는 형식으로 내보내어 테스트 관리 도구에서 사용합니다
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">요금제</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`text-center ${plan.popular ? 'ring-2 ring-primary' : ''}`}
              >
                {plan.popular && (
                  <div className="bg-primary text-white text-sm py-1 px-3 rounded-full inline-block mb-4">
                    인기
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold mb-6">{plan.price}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center justify-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full"
                >
                  {plan.price === '문의' ? '문의하기' : '시작하기'}
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gray-50 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">
            지금 시작하여 테스트 생산성을 높이세요
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            신용카드 없이 무료로 시작할 수 있습니다
          </p>
          <Button size="lg">무료 체험 시작하기</Button>
        </div>
      </div>
    </div>
  )
}
EOF

# src/pages/services/Education.tsx
cat > src/pages/services/Education.tsx << 'EOF'
import { useEffect } from 'react'
import { useServiceStore } from '../../stores/serviceStore'
import { useAuthStore } from '../../stores/authStore'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import { Clock, Users, Award, PlayCircle } from 'lucide-react'

export default function Education() {
  const { courses, fetchCourses, enrollCourse } = useServiceStore()
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  const handleEnroll = async (courseId: string) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } })
      return
    }

    await enrollCourse(courseId)
    alert('수강 신청이 완료되었습니다!')
  }

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">교육 서비스</h1>
          <p className="text-xl text-gray-600">
            실무에 바로 적용 가능한 QA/SDET 전문 교육
          </p>
        </div>

        {/* Why Our Education */}
        <div className="mb-16">
          <Card>
            <h2 className="text-2xl font-semibold mb-6">왜 James Company 교육인가?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">실무 전문가 강의</h3>
                <p className="text-sm text-gray-600">현업 전문가의 생생한 경험</p>
              </div>
              <div className="text-center">
                <PlayCircle className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">실습 중심 커리큘럼</h3>
                <p className="text-sm text-gray-600">이론보다 실습 위주의 교육</p>
              </div>
              <div className="text-center">
                <Clock className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">평생 수강</h3>
                <p className="text-sm text-gray-600">한 번 결제로 평생 시청</p>
              </div>
              <div className="text-center">
                <Award className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">수료증 발급</h3>
                <p className="text-sm text-gray-600">과정 완료 시 수료증 제공</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Course List */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">개설 강좌</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course) => (
              <Card key={course.id} className="flex flex-col">
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold mb-3">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-700">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>기간: {course.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <Users className="w-4 h-4 mr-2" />
                      <span>수강생 500명+</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-bold">₩{course.price.toLocaleString()}</span>
                      <span className="text-sm text-gray-500">VAT 포함</span>
                    </div>
                    
                    <Button
                      onClick={() => handleEnroll(course.id)}
                      className="w-full"
                    >
                      {course.enrolled ? '수강 중' : '수강 신청'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Curriculum Preview */}
        <Card className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">커리큘럼 예시</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">1주차: 자동화 테스트의 이해</h4>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• 자동화 테스트의 필요성과 ROI</li>
                <li>• 테스트 피라미드와 전략</li>
                <li>• 도구 선택 가이드</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">2주차: Selenium 기초</h4>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• WebDriver 설정 및 환경 구축</li>
                <li>• 기본 명령어와 요소 찾기</li>
                <li>• 첫 번째 자동화 스크립트 작성</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">3주차: 페이지 객체 모델</h4>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• POM 패턴의 이해</li>
                <li>• 재사용 가능한 코드 작성</li>
                <li>• 유지보수가 쉬운 테스트 구조</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* FAQ */}
        <div className="text-center bg-gray-50 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">
            더 궁금하신 점이 있으신가요?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            교육 과정에 대해 상세히 안내해드립니다
          </p>
          <Button size="lg" onClick={() => navigate('/contact')}>
            문의하기
          </Button>
        </div>
      </div>
    </div>
  )
}
EOF

# src/pages/services/BugBounty.tsx
cat > src/pages/services/BugBounty.tsx << 'EOF'
import { useEffect } from 'react'
import { useServiceStore } from '../../stores/serviceStore'
import { useAuthStore } from '../../stores/authStore'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import { Users, Calendar, TrendingUp, Shield } from 'lucide-react'

export default function BugBounty() {
  const { betaTests, fetchBetaTests, applyBetaTest } = useServiceStore()
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    fetchBetaTests()
  }, [fetchBetaTests])

  const handleApply = async (testId: string) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } })
      return
    }

    await applyBetaTest(testId)
    alert('베타 테스트 신청이 완료되었습니다!')
  }

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Bug Bounty Arena</h1>
          <p className="text-xl text-gray-600">
            앱 출시 전 실제 사용자의 피드백으로 완성도를 높이세요
          </p>
        </div>

        {/* How it Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">서비스 프로세스</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1</div>
              <h3 className="font-semibold mb-2">앱 등록</h3>
              <p className="text-sm text-gray-600">
                테스트할 앱 정보와 목표를 등록합니다
              </p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">2</div>
              <h3 className="font-semibold mb-2">테스터 모집</h3>
              <p className="text-sm text-gray-600">
                타겟 사용자에 맞는 테스터를 모집합니다
              </p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">3</div>
              <h3 className="font-semibold mb-2">테스트 진행</h3>
              <p className="text-sm text-gray-600">
                실제 환경에서 앱을 테스트합니다
              </p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">4</div>
              <h3 className="font-semibold mb-2">리포트 제공</h3>
              <p className="text-sm text-gray-600">
                버그와 개선사항을 정리하여 전달합니다
              </p>
            </Card>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <Card>
            <h2 className="text-2xl font-semibold mb-6">왜 Bug Bounty Arena인가?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <Users className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">다양한 테스터 풀</h3>
                  <p className="text-gray-600">
                    연령, 직업, 관심사가 다양한 1만명+ 테스터 보유
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Shield className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">검증된 품질</h3>
                  <p className="text-gray-600">
                    전문 QA가 검토한 고품질 버그 리포트 제공
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <TrendingUp className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">비용 효율성</h3>
                  <p className="text-gray-600">
                    내부 QA 팀 구축 대비 80% 비용 절감
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Calendar className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">빠른 진행</h3>
                  <p className="text-gray-600">
                    평균 3-5일 내 테스트 완료 및 리포트 제공
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Active Beta Tests */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">진행 중인 베타 테스트</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {betaTests.map((test) => (
              <Card key={test.id}>
                <h3 className="text-xl font-semibold mb-2">{test.appName}</h3>
                <p className="text-gray-600 mb-4">{test.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">마감일</span>
                    <span className="font-medium">{test.deadline}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">참여자</span>
                    <span className="font-medium">
                      {test.participants}/{test.maxParticipants}명
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: `${(test.participants / test.maxParticipants) * 100}%`
                      }}
                    />
                  </div>
                </div>
                
                <Button
                  onClick={() => handleApply(test.id)}
                  className="w-full"
                  disabled={test.participants >= test.maxParticipants}
                >
                  {test.participants >= test.maxParticipants
                    ? '모집 완료'
                    : '참여 신청'}
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA for Companies */}
        <div className="text-center bg-primary text-white rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">
            여러분의 앱도 테스트 받아보세요
          </h2>
          <p className="text-xl mb-8">
            출시 전 마지막 점검, Bug Bounty Arena와 함께하세요
          </p>
          <Button variant="secondary" size="lg" onClick={() => navigate('/contact')}>
            앱 등록 문의하기
          </Button>
        </div>
      </div>
    </div>
  )
}
EOF

# src/pages/insights/Insights.tsx
cat > src/pages/insights/Insights.tsx << 'EOF'
import { useState } from 'react'
import Card from '../../components/ui/Card'
import { Calendar, User, Tag } from 'lucide-react'

interface Post {
  id: string
  title: string
  excerpt: string
  category: 'notice' | 'story'
  author: string
  date: string
  tags: string[]
}

export default function Insights() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'notice' | 'story'>('all')

  // Mock data
  const posts: Post[] = [
    {
      id: '1',
      title: '새로운 Bug Bounty Arena 서비스 출시',
      excerpt: 'James Company에서 새롭게 선보이는 Bug Bounty Arena 서비스를 소개합니다. 앱 출시 전 실제 사용자들의 피드백을 받아보세요.',
      category: 'notice',
      author: 'James Company',
      date: '2024-01-20',
      tags: ['서비스', '출시', 'Bug Bounty']
    },
    {
      id: '2',
      title: 'QA 자동화의 ROI를 높이는 5가지 방법',
      excerpt: '많은 기업들이 QA 자동화를 도입하지만 기대한 만큼의 효과를 보지 못합니다. 실제 사례를 통해 ROI를 높이는 방법을 알아봅시다.',
      category: 'story',
      author: 'James Lee',
      date: '2024-01-18',
      tags: ['QA', '자동화', 'ROI']
    },
    {
      id: '3',
      title: '2024년 1분기 교육 일정 안내',
      excerpt: '2024년 1분기 QA/SDET 교육 과정 일정이 확정되었습니다. 조기 등록 시 20% 할인 혜택을 받으실 수 있습니다.',
      category: 'notice',
      author: 'James Company',
      date: '2024-01-15',
      tags: ['교육', '일정', '할인']
    },
    {
      id: '4',
      title: '스타트업에서 QA 문화 만들기',
      excerpt: '리소스가 부족한 스타트업에서 어떻게 효과적인 QA 문화를 만들 수 있을까요? 실제 경험을 바탕으로 한 인사이트를 공유합니다.',
      category: 'story',
      author: 'James Lee',
      date: '2024-01-12',
      tags: ['스타트업', 'QA', '문화']
    }
  ]

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory)

  const getCategoryBadgeColor = (category: string) => {
    return category === 'notice' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
  }

  const getCategoryText = (category: string) => {
    return category === 'notice' ? '공지사항' : '스토리'
  }

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">인사이트</h1>
          <p className="text-xl text-gray-600">
            James Company의 소식과 QA 관련 인사이트를 만나보세요
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            전체
          </button>
          <button
            onClick={() => setSelectedCategory('notice')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === 'notice'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            공지사항
          </button>
          <button
            onClick={() => setSelectedCategory('story')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === 'story'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            스토리
          </button>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} hoverable>
              <article>
                <div className="flex items-center space-x-4 mb-3">
                  <span className={`text-sm px-3 py-1 rounded-full ${getCategoryBadgeColor(post.category)}`}>
                    {getCategoryText(post.category)}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="w-4 h-4 mr-1" />
                    {post.author}
                  </div>
                </div>

                <h2 className="text-2xl font-semibold mb-3 hover:text-primary cursor-pointer">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <div className="flex space-x-2">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="text-sm text-gray-500">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button className="text-primary hover:underline">
                    자세히 읽기 →
                  </button>
                </div>
              </article>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12 space-x-2">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            이전
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg">
            1
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            2
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            3
          </button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            다음
          </button>
        </div>
      </div>
    </div>
  )
}
EOF

# index.html 수정
cat > index.html << 'EOF'
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>James Company - 다양한 형태의 성장을 돕습니다</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

# package.json에 persist 추가
npm install zustand

echo "✅ James Company 프론트엔드 프로젝트 생성 완료!"
echo ""
echo "실행 방법:"
echo "1. cd james-company"
echo "2. yarn install (패키지가 설치되지 않았다면)"
echo "3. yarn dev"
echo ""
echo "접속 주소: http://localhost:5173"
echo ""
echo "테스트 계정: test@example.com / password"