// src/components/layout/Footer.tsx

import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import PolicyModal from '../PolicyModal'
import { getLatestPrivacy } from '../../data/policies/privacy'
import { getLatestTerms } from '../../data/policies/terms'
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react'

export default function Footer() {
  const location = useLocation()
  const [isTermsOpen, setIsTermsOpen] = useState(false)
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false)

  const handleLinkClick = (path: string) => {
    // 현재 경로와 클릭한 경로가 같으면 스크롤을 최상단으로
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const latestTerms = getLatestTerms()
  const latestPrivacy = getLatestPrivacy()

  return (
    <footer className="bg-gray-900 text-white">
      {/* 상단 CTA 섹션 */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold">QA 전문가를 찾고 계신가요?</h3>
              <p className="text-blue-100">최고의 QA 인재를 만나보세요</p>
            </div>
            <Link 
              to="/services/recruitment" 
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              채용공고 등록하기
            </Link>
          </div>
        </div>
      </div>

      {/* 메인 푸터 */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* 회사 정보 */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-4">
                <Link 
                  to="/" 
                  className="hover:text-gray-300 transition-colors"
                  onClick={() => handleLinkClick('/')}
                >
                  James Company
                </Link>
              </h3>
              <p className="text-gray-400 mb-4">
                QA 전문가와 기업을 연결하는 최고의 플랫폼
              </p>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a 
                    href="mailto:contact@jamescompany.kr" 
                    className="hover:text-white transition-colors"
                  >
                    contact@jamescompany.kr
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>010-8327-6861</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>서울특별시 강남구</span>
                </div>
              </div>
            </div>
            
            {/* 서비스 */}
            <div>
              <h4 className="font-semibold mb-4">서비스</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link 
                    to="/services/coffee-chat" 
                    className="hover:text-white transition-colors"
                    onClick={() => handleLinkClick('/services/coffee-chat')}
                  >
                    커피챗
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/services/casemaker" 
                    className="hover:text-white transition-colors flex items-center gap-1"
                    onClick={() => handleLinkClick('/services/casemaker')}
                  >
                    CaseMaker
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/services/qauto" 
                    className="hover:text-white transition-colors flex items-center gap-1"
                    onClick={() => handleLinkClick('/services/qauto')}
                  >
                    QAuto
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/services/education" 
                    className="hover:text-white transition-colors"
                    onClick={() => handleLinkClick('/services/education')}
                  >
                    교육 서비스
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/services/bug-bounty" 
                    className="hover:text-white transition-colors"
                    onClick={() => handleLinkClick('/services/bug-bounty')}
                  >
                    Bug Bounty Arena
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/services/recruitment" 
                    className="hover:text-white transition-colors flex items-center gap-1"
                    onClick={() => handleLinkClick('/services/recruitment')}
                  >
                    QA 채용
                    <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                      NEW
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* 회사 */}
            <div>
              <h4 className="font-semibold mb-4">회사</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link 
                    to="/about" 
                    className="hover:text-white transition-colors"
                    onClick={() => handleLinkClick('/about')}
                  >
                    회사 소개
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/insights" 
                    className="hover:text-white transition-colors"
                    onClick={() => handleLinkClick('/insights')}
                  >
                    인사이트
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/insights/notice" 
                    className="hover:text-white transition-colors"
                    onClick={() => handleLinkClick('/insights/notice')}
                  >
                    공지사항
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className="hover:text-white transition-colors"
                    onClick={() => handleLinkClick('/contact')}
                  >
                    문의하기
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* 고객 지원 */}
            <div>
              <h4 className="font-semibold mb-4">고객 지원</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link 
                    to="/help" 
                    className="hover:text-white transition-colors"
                    onClick={() => handleLinkClick('/help')}
                  >
                    도움말 센터
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/faq" 
                    className="hover:text-white transition-colors"
                    onClick={() => handleLinkClick('/faq')}
                  >
                    자주 묻는 질문
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/support" 
                    className="hover:text-white transition-colors"
                    onClick={() => handleLinkClick('/support')}
                  >
                    1:1 문의
                  </Link>
                </li>
                <li>
                  <button 
                    className="hover:text-white transition-colors"
                    onClick={() => {/* 실시간 채팅 열기 */}}
                  >
                    실시간 채팅
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          {/* 하단 정보 */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="mb-6">
              <p className="text-gray-400 text-sm leading-relaxed">
                <strong className="text-white">James Company</strong><br />
                <br />
                상호명 : 제임스컴퍼니(James Company)<br />
                대표 : 강홍재 | 전화번호: 010-8327-6861<br />
                개인정보책임자 : 강홍재 | 사업자등록번호 : 692-07-02577<br />
                통신판매업신고번호 : 제 2024-서울강남-05094 호<br />
                고객지원 : <Link to="/contact" className="underline hover:text-white">Contact 페이지</Link> 또는 실시간 채팅
              </p>
            </div>
            
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex gap-4 text-sm">
                <button 
                  onClick={() => setIsTermsOpen(true)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  이용약관
                </button>
                <span className="text-gray-600">|</span>
                <button 
                  onClick={() => setIsPrivacyOpen(true)}
                  className="text-gray-400 hover:text-white font-bold transition-colors"
                >
                  개인정보처리방침
                </button>
                <span className="text-gray-600">|</span>
                <Link 
                  to="/sitemap"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  사이트맵
                </Link>
              </div>
              
              <p className="text-gray-400 text-sm">
                &copy; 2024 James Company. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 이용약관 모달 */}
      <PolicyModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        title="이용약관"
        content={latestTerms.content}
        version={latestTerms.version}
        lastUpdated={latestTerms.date}
      />

      {/* 개인정보처리방침 모달 */}
      {latestPrivacy && (
        <PolicyModal
          isOpen={isPrivacyOpen}
          onClose={() => setIsPrivacyOpen(false)}
          title="개인정보처리방침"
          content={latestPrivacy.content}
          version={latestPrivacy.version}
          lastUpdated={latestPrivacy.date}
        />
      )}
    </footer>
  )
}