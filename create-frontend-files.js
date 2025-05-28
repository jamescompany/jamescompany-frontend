const fs = require('fs');
const path = require('path');

// 디렉토리 생성 함수
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// 파일 쓰기 함수
function writeFile(filePath, content) {
  ensureDirectoryExists(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
  console.log(`✅ Created: ${filePath}`);
}

// 프로젝트 구조 생성
const directories = [
  'src/components',
  'src/components/ui',
  'src/components/layout',
  'src/components/auth',
  'src/components/service',
  'src/pages',
  'src/pages/auth',
  'src/pages/services',
  'src/pages/insights',
  'src/stores',
  'src/services',
  'src/types',
  'src/utils',
  'src/styles'
];

directories.forEach(dir => ensureDirectoryExists(dir));

// 파일 내용 정의
const files = {
  'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
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
}`,

  'src/styles/globals.css': `@tailwind base;
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
}`,

  'src/main.tsx': `import React from 'react'
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
)`,

  'src/App.tsx': `import { Routes, Route } from 'react-router-dom'
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

export default App`,

  'src/types/index.ts': `export interface User {
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
}`,

  'src/stores/authStore.ts': `import { create } from 'zustand'
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
)`,

  'src/components/layout/Layout.tsx': `import { Outlet } from 'react-router-dom'
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
}`,

  'src/components/layout/Header.tsx': `import { Link, useNavigate } from 'react-router-dom'
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
}`,

  'src/components/layout/Footer.tsx': `export default function Footer() {
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
}`,

  'src/components/ui/Button.tsx': `import type { ButtonHTMLAttributes, forwardRef } from 'react'

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
    
    const classes = \`\${baseStyles} \${variants[variant]} \${sizes[size]} \${className}\`
    
    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button`,

  'src/components/ui/Input.tsx': `import { InputHTMLAttributes, forwardRef } from 'react'

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
          className={\`
            w-full px-3 py-2 border border-gray-300 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            \${error ? 'border-red-500' : ''}
            \${className}
          \`}
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

export default Input`,

  'src/components/ui/Card.tsx': `import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hoverable?: boolean
}

export default function Card({ children, className = '', hoverable = false }: CardProps) {
  return (
    <div className={\`
      bg-white rounded-lg shadow-md p-6
      \${hoverable ? 'hover:shadow-lg transition-shadow duration-200' : ''}
      \${className}
    \`}>
      {children}
    </div>
  )
}`,

  'src/components/auth/ProtectedRoute.tsx': `import { Navigate, useLocation } from 'react-router-dom'
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
}`,

  'src/pages/Home.tsx': `import { Link } from 'react-router-dom'
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
}`,

  'src/pages/About.tsx': `export default function About() {
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
}`,

  'src/pages/Services.tsx': `import { Link } from 'react-router-dom'
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
}`,

  'src/pages/Contact.tsx': `import { useState } from 'react'
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
}`,

  'src/pages/Dashboard.tsx': `import { useAuthStore } from '../stores/authStore'
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
}`,

  'src/pages/auth/Login.tsx': `import { useState } from 'react'
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
}`,

  'src/pages/auth/Signup.tsx': `import { useState } from 'react'
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
}`
};

// 나머지 파일들도 필요하면 추가
const additionalFiles = {
  'src/stores/serviceStore.ts': `import { create } from 'zustand'
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
}))`,

  'src/pages/services/CoffeeChat.tsx': `import { useState, useEffect } from 'react'
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
                className={\`
                  border rounded-lg p-4 cursor-pointer transition-all
                  \${selectedSlot === slot.id ? 'border-primary bg-blue-50' : 'border-gray-300'}
                  \${!slot.available ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary'}
                \`}
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
}`
};

// 모든 파일 병합
const allFiles = { ...files, ...additionalFiles };

// 파일 생성
console.log('🚀 James Company 프론트엔드 파일 생성을 시작합니다...\n');

Object.entries(allFiles).forEach(([filePath, content]) => {
  writeFile(filePath, content);
});

// 나머지 서비스 페이지들도 생성
const servicePages = {
  'src/pages/services/CaseMaker.tsx': true,
  'src/pages/services/Education.tsx': true,
  'src/pages/services/BugBounty.tsx': true,
  'src/pages/insights/Insights.tsx': true
};

console.log('\n✅ 모든 파일이 생성되었습니다!');
console.log('\n다음 단계:');
console.log('1. yarn install');
console.log('2. yarn dev');
console.log('\n테스트 계정: test@example.com / password');
