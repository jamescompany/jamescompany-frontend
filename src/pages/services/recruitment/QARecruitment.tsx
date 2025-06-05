// src/pages/services/recruitment/QARecruitment.tsx

import { useState } from 'react';
import { Search, TrendingUp, Award, Briefcase, Star } from 'lucide-react';
import JobCard from '../../../components/recruitment/JobCard';
import PricingCard from '../../../components/recruitment/PricingCard';
import JobDetailModal from '../../../components/recruitment/JobDetailModal';
import type { JobPosting, PricingPlan } from '../../../types/recruitment';

// 샘플 데이터
const sampleJobs: JobPosting[] = [
  {
    id: '1',
    companyName: '테크스타트업 A',
    position: 'QA 자동화 엔지니어',
    summary: 'Playwright 기반 테스트 자동화를 주도할 QA 엔지니어를 찾습니다',
    mainTasks: [
      '테스트 시나리오 작성 및 테스트 케이스 운영',
      'Playwright 기반 E2E 테스트 자동화',
      'CI/CD 환경 내 테스트 통합 및 품질 지표 관리',
      'API 테스트 자동화 구축'
    ],
    tools: ['Playwright', 'TestRail', 'GitHub Actions', 'Docker', 'Jest'],
    teamStructure: 'QA 2인 / 프론트엔드 3인 / 백엔드 4인 / PO 1인과 협업',
    preferredQualifications: [
      'API 테스트 자동화 경험',
      'DevOps 파이프라인 이해',
      'TypeScript 활용 능력'
    ],
    salaryRange: { min: 4800, max: 6000 },
    benefits: ['리모트 근무', '커리어 성장 지원비', '스톡옵션', '유연근무제'],
    location: '서울 강남구',
    workType: 'hybrid',
    applicationMethod: { type: 'url', value: 'https://example.com/apply' },
    jamesNote: '성장 중인 스타트업에서 QA 프로세스를 처음부터 구축할 수 있는 좋은 기회입니다. DevOps 문화가 잘 정착되어 있어 자동화 엔지니어에게 이상적인 환경입니다.',
    isCertified: true,
    postingDate: '2025-01-01',
    expiryDate: '2025-02-01',
    packageType: 'premium',
    viewCount: 342,
    isPinned: true
  },
  {
    id: '2',
    companyName: '핀테크 기업 B',
    position: 'Senior QA Engineer',
    summary: '금융 서비스의 품질을 책임질 시니어 QA 엔지니어를 모집합니다',
    mainTasks: [
      '금융 도메인 테스트 전략 수립',
      '보안 및 성능 테스트 수행',
      'QA 프로세스 개선 및 팀 리딩',
      '품질 메트릭 정의 및 관리'
    ],
    tools: ['Selenium', 'JMeter', 'Postman', 'Jenkins', 'Python'],
    teamStructure: 'QA 팀 5인 / 개발팀 15인 / 보안팀 3인과 협업',
    salaryRange: { min: 6000, max: 8000 },
    benefits: ['성과급', '건강검진', '자기개발비', '재택근무'],
    location: '서울 여의도',
    workType: 'onsite',
    applicationMethod: { type: 'email', value: 'recruit@fintech.com' },
    jamesNote: '금융 도메인에서 안정적인 커리어를 쌓을 수 있는 기회입니다. 체계적인 QA 프로세스와 전문가 팀이 구성되어 있습니다.',
    isCertified: true,
    postingDate: '2025-01-05',
    expiryDate: '2025-02-05',
    packageType: 'standard',
    viewCount: 256,
    isPinned: false
  }
];

const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: '기본형',
    price: 50000,
    duration: '1개월',
    features: [
      'QA 포맷 적용',
      '슬랙/뉴스레터 노출',
      '기본 통계 제공'
    ],
    bonusIncluded: false
  },
  {
    id: 'standard',
    name: '스탠다드형',
    price: 100000,
    duration: '1개월',
    features: [
      '기본형 모든 혜택',
      '뉴스레터 상단 노출',
      '상세 통계 리포트',
      '성과형 축하금 적용 가능'
    ],
    isPopular: true,
    bonusIncluded: false
  },
  {
    id: 'premium',
    name: '프리미엄형',
    price: 200000,
    duration: '1개월',
    features: [
      '스탠다드형 모든 혜택',
      '상단 고정 노출',
      '추천 공고 섹션 포함',
      '합격 축하금 기본 포함 (5만원)',
      '제임스의 한마디 강조'
    ],
    bonusIncluded: true
  }
];

const QARecruitment = () => {
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'remote' | 'onsite' | 'hybrid'>('all');

  const filteredJobs = sampleJobs.filter(job => {
    const matchesSearch = job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || job.workType === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <Award className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6 tracking-tight">
              QA Career Hub
              <span className="block text-2xl font-normal mt-2 text-blue-100">
                큐레이션된 QA 채용의 새로운 기준
              </span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-50">
              제임스컴퍼니가 엄선한 QA 포지션만을 소개합니다.
              <br />
              단순한 채용공고가 아닌, QA 전문가의 시선으로 분석한 인사이트를 제공합니다.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="font-semibold">현재 활성 공고</span>
                <span className="block text-2xl font-bold">{sampleJobs.length}개</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="font-semibold">평균 연봉</span>
                <span className="block text-2xl font-bold">5,800만원</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="font-semibold">QA 인증 기업</span>
                <span className="block text-2xl font-bold">100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="포지션, 회사명으로 검색"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  filterType === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setFilterType('remote')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  filterType === 'remote' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                재택근무
              </button>
              <button
                onClick={() => setFilterType('hybrid')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  filterType === 'hybrid' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                하이브리드
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Listings */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">채용 공고</h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingUp className="w-4 h-4" />
                <span>실시간 업데이트</span>
              </div>
            </div>
            
            {filteredJobs.length > 0 ? (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onClick={() => setSelectedJob(job)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">검색 결과가 없습니다.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Pricing Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">채용공고 등록 상품</h3>
              <div className="space-y-4">
                {pricingPlans.map((plan) => (
                  <PricingCard key={plan.id} plan={plan} />
                ))}
              </div>
              <div className="mt-6 text-center">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-colors">
                  채용공고 등록하기
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">왜 제임스컴퍼니인가?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700">QA 전문가가 직접 검증한 채용공고</span>
                </li>
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700">제임스의 한마디로 진로 판단 지원</span>
                </li>
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700">QA 조직 구조와 도구 정보 투명 공개</span>
                </li>
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700">합격 축하금 지원 (최대 5만원)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
};

export default QARecruitment;