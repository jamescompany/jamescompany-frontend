// src/shared/components/layout/Layout.tsx

import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* 메인 콘텐츠 영역 - flex-grow로 Footer를 하단에 고정 */}
      <main className="flex-grow">
        <Outlet /> {/* 각 페이지 콘텐츠가 여기에 렌더링됨 */}
      </main>
      
      <Footer />
    </div>
  )
}