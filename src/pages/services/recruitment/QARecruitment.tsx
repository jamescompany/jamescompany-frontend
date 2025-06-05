// src/pages/services/recruitment/QARecruitment.tsx

import { useState, useMemo } from 'react';
import { Search, TrendingUp, Award, Briefcase, Star, Map, List, MapPin, SlidersHorizontal } from 'lucide-react';
import JobCard from '../../../components/recruitment/JobCard';
import PricingCard from '../../../components/recruitment/PricingCard';
import JobDetailModal from '../../../components/recruitment/JobDetailModal';
import KakaoMapView from '../../../components/recruitment/KakaoMapView';
import type { JobPosting, PricingPlan } from '../../../types/recruitment';
import { useLocationStore } from '../../../stores/locationStore';
import { calculateDistance } from '../../../utils/distanceCalculator';
import { useNavigate } from 'react-router-dom';

// 샘플 데이터 (동일)
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
    location: '서울 강남구 테헤란로 142',
    coordinates: {
      lat: 37.5012767,
      lng: 127.0396002
    },
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
    location: '서울 영등포구 국제금융로 10',
    coordinates: {
      lat: 37.5259671,
      lng: 126.9263991
    },
    workType: 'onsite',
    applicationMethod: { type: 'email', value: 'recruit@fintech.com' },
    jamesNote: '금융 도메인에서 안정적인 커리어를 쌓을 수 있는 기회입니다. 체계적인 QA 프로세스와 전문가 팀이 구성되어 있습니다.',
    isCertified: true,
    postingDate: '2025-01-05',
    expiryDate: '2025-02-05',
    packageType: 'standard',
    viewCount: 256,
    isPinned: false
  },
  {
    id: '3',
    companyName: 'e커머스 플랫폼 C',
    position: 'QA Lead Engineer',
    summary: '대규모 이커머스 플랫폼의 품질을 책임질 QA 리드를 찾습니다',
    mainTasks: [
      'QA 팀 리딩 및 멘토링',
      '테스트 전략 및 로드맵 수립',
      '성능 테스트 및 모니터링 체계 구축',
      '자동화 프레임워크 설계 및 개선'
    ],
    tools: ['Cypress', 'K6', 'Datadog', 'GitLab CI', 'JavaScript'],
    teamStructure: 'QA 팀 8인 / 개발팀 20인 / DevOps 팀 4인과 협업',
    salaryRange: { min: 7000, max: 9000 },
    benefits: ['스톡옵션', '유연근무제', '교육비 지원', '안식휴가'],
    location: '서울 서초구 강남대로 373',
    coordinates: {
      lat: 37.4954501,
      lng: 127.0283985
    },
    workType: 'hybrid',
    applicationMethod: { type: 'url', value: 'https://careers.ecommerce.com' },
    jamesNote: '국내 최대 규모 이커머스 플랫폼에서 QA 리더십을 발휘할 수 있는 포지션입니다. 대규모 트래픽 환경에서의 품질 관리 경험을 쌓을 수 있습니다.',
    isCertified: true,
    postingDate: '2025-01-10',
    expiryDate: '2025-02-10',
    packageType: 'premium',
    viewCount: 489,
    isPinned: true
  },
  {
    id: '4',
    companyName: '게임 스튜디오 D',
    position: 'Game QA Engineer',
    summary: '모바일 게임의 품질을 담당할 QA 엔지니어를 모집합니다',
    mainTasks: [
      '게임 기능 및 밸런스 테스트',
      '버그 리포팅 및 이슈 트래킹',
      '테스트 자동화 스크립트 개발',
      '유저 피드백 분석 및 품질 개선'
    ],
    tools: ['Unity Test Framework', 'Charles Proxy', 'JIRA', 'Appium', 'Python'],
    teamStructure: 'QA 팀 3인 / 게임 개발팀 12인 / 기획팀 5인과 협업',
    salaryRange: { min: 4000, max: 5500 },
    benefits: ['게임 출시 보너스', '리모트 근무', '최신 기기 지원', '게임 포인트'],
    location: '경기도 성남시 분당구 판교역로 235',
    coordinates: {
      lat: 37.4019528,
      lng: 127.1082172
    },
    workType: 'hybrid',
    applicationMethod: { type: 'email', value: 'hr@gamestudio.com' },
    jamesNote: '게임 산업에서 QA 커리어를 시작하기 좋은 기회입니다. 다양한 장르의 게임 프로젝트에 참여할 수 있습니다.',
    isCertified: false,
    postingDate: '2025-01-08',
    expiryDate: '2025-02-08',
    packageType: 'basic',
    viewCount: 178,
    isPinned: false
  },
  {
    id: '5',
    companyName: '헬스케어 스타트업 E',
    position: 'Healthcare QA Specialist',
    summary: '디지털 헬스케어 서비스의 품질과 규제 준수를 담당할 QA 전문가',
    mainTasks: [
      '의료기기 소프트웨어 검증 및 밸리데이션',
      'ISO 13485, IEC 62304 규제 준수 테스트',
      '위험 분석 및 추적성 매트릭스 관리',
      '임상 시험 데이터 검증'
    ],
    tools: ['TestComplete', 'Ranorex', 'Confluence', 'Azure DevOps', 'Python'],
    teamStructure: 'QA/RA 팀 4인 / 개발팀 8인 / 임상팀 3인과 협업',
    salaryRange: { min: 5500, max: 7000 },
    benefits: ['건강검진 프리미엄', '자기개발비', '재택근무', '학회 참석 지원'],
    location: '서울 강남구 봉은사로 524',
    coordinates: {
      lat: 37.5172363,
      lng: 127.0473248
    },
    workType: 'remote',
    applicationMethod: { type: 'url', value: 'https://healthcare-startup.com/careers' },
    jamesNote: '헬스케어 도메인의 전문성을 기를 수 있는 포지션입니다. 규제 산업에서의 QA 경험은 커리어에 큰 자산이 될 것입니다.',
    isCertified: true,
    postingDate: '2025-01-12',
    expiryDate: '2025-02-12',
    packageType: 'standard',
    viewCount: 234,
    isPinned: false
  },
  {
    id: '6',
    companyName: '해양 IT 기업 F',
    position: 'QA Engineer',
    summary: '해양 관련 소프트웨어의 품질 관리를 담당할 QA 엔지니어',
    mainTasks: [
      '해양 데이터 처리 시스템 테스트',
      '실시간 모니터링 시스템 검증',
      'API 통합 테스트',
      '성능 및 안정성 테스트'
    ],
    tools: ['Postman', 'JMeter', 'Docker', 'PostgreSQL', 'Python'],
    teamStructure: 'QA 팀 3인 / 개발팀 10인 / 데이터팀 4인과 협업',
    salaryRange: { min: 4500, max: 6000 },
    benefits: ['해양 관련 교육 지원', '유연근무제', '건강검진', '리프레시 휴가'],
    location: '부산 해운대구 센텀중앙로 97',
    coordinates: {
      lat: 35.1689766,
      lng: 129.1308636
    },
    workType: 'hybrid',
    applicationMethod: { type: 'url', value: 'https://marine-it.com/careers' },
    jamesNote: '부산의 대표적인 해양 IT 기업으로, 특화된 도메인 경험을 쌓을 수 있습니다.',
    isCertified: true,
    postingDate: '2025-01-15',
    expiryDate: '2025-02-15',
    packageType: 'standard',
    viewCount: 189,
    isPinned: false
  },
  {
    id: '7',
    companyName: '대구 AI 스타트업 G',
    position: 'AI/ML QA Specialist',
    summary: 'AI 모델 품질 검증 및 테스트 자동화 전문가',
    mainTasks: [
      'AI 모델 성능 검증 및 테스트',
      'ML 파이프라인 품질 관리',
      '데이터 품질 검증 프로세스 구축',
      'A/B 테스트 설계 및 분석'
    ],
    tools: ['Python', 'TensorFlow', 'MLflow', 'Pytest', 'Airflow'],
    teamStructure: 'QA 팀 2인 / ML 엔지니어 6인 / 데이터 사이언티스트 4인과 협업',
    salaryRange: { min: 5000, max: 6500 },
    benefits: ['AI 컨퍼런스 참가 지원', '논문 작성 지원', '재택근무', '스톡옵션'],
    location: '대구 동구 동대구로 461',
    coordinates: {
      lat: 35.8714354,
      lng: 128.6014447
    },
    workType: 'hybrid',
    applicationMethod: { type: 'email', value: 'recruit@daegu-ai.com' },
    jamesNote: 'AI/ML 분야의 QA는 희소성이 있는 포지션으로, 전문성을 기를 수 있는 좋은 기회입니다.',
    isCertified: true,
    postingDate: '2025-01-18',
    expiryDate: '2025-02-18',
    packageType: 'premium',
    viewCount: 267,
    isPinned: true
  },
  {
    id: '8',
    companyName: '제주 관광 플랫폼 H',
    position: 'Mobile QA Engineer',
    summary: '관광 모바일 앱의 품질을 책임질 QA 엔지니어',
    mainTasks: [
      '모바일 앱 (iOS/Android) 테스트',
      '다국어 지원 테스트',
      '위치 기반 서비스 테스트',
      '사용성 테스트 및 개선안 제시'
    ],
    tools: ['Appium', 'XCTest', 'Espresso', 'Firebase', 'BrowserStack'],
    teamStructure: 'QA 팀 2인 / 모바일 개발팀 5인 / UX팀 2인과 협업',
    salaryRange: { min: 4000, max: 5500 },
    benefits: ['제주 정착 지원금', '주거 지원', '항공료 지원', '워케이션'],
    location: '제주 제주시 첨단로 242',
    coordinates: {
      lat: 33.4890113,
      lng: 126.4983023
    },
    workType: 'onsite',
    applicationMethod: { type: 'url', value: 'https://jeju-travel.com/careers' },
    jamesNote: '제주도에서 워라밸을 즐기며 일할 수 있는 포지션입니다. 관광 도메인 특화 경험도 쌓을 수 있습니다.',
    isCertified: false,
    postingDate: '2025-01-20',
    expiryDate: '2025-02-20',
    packageType: 'basic',
    viewCount: 145,
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
  const navigate = useNavigate();
  const { userLocation, preferredDistance } = useLocationStore();
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'remote' | 'onsite' | 'hybrid'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [distanceFilter, setDistanceFilter] = useState<'all' | 'near'>('all');

  // 거리 기반 필터링된 채용공고
  const filteredJobs = useMemo(() => {
    let jobs = sampleJobs.filter(job => {
      const matchesSearch = job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.companyName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || job.workType === filterType;
      return matchesSearch && matchesFilter;
    });

    // 거리 필터 적용
    if (distanceFilter === 'near' && userLocation?.coordinates) {
      jobs = jobs.filter(job => {
        if (!job.coordinates || !userLocation.coordinates) return false;
        const distance = calculateDistance(
          userLocation.coordinates.lat,
          userLocation.coordinates.lng,
          job.coordinates.lat,
          job.coordinates.lng
        );
        return distance <= preferredDistance;
      });

      // 거리순 정렬
      jobs.sort((a, b) => {
        if (!a.coordinates || !b.coordinates || !userLocation.coordinates) return 0;
        const distanceA = calculateDistance(
          userLocation.coordinates.lat,
          userLocation.coordinates.lng,
          a.coordinates.lat,
          a.coordinates.lng
        );
        const distanceB = calculateDistance(
          userLocation.coordinates.lat,
          userLocation.coordinates.lng,
          b.coordinates.lat,
          b.coordinates.lng
        );
        return distanceA - distanceB;
      });
    }

    return jobs;
  }, [searchTerm, filterType, distanceFilter, userLocation, preferredDistance]);

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
            
            {userLocation && (
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 inline-flex items-center gap-2 mb-6">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">내 위치: {userLocation.city} {userLocation.district} {userLocation.neighborhood}</span>
                <button
                  onClick={() => navigate('/profile')}
                  className="text-sm underline hover:no-underline"
                >
                  변경
                </button>
              </div>
            )}
            
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="font-semibold">현재 활성 공고</span>
                <span className="block text-2xl font-bold">{sampleJobs.length}개</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="font-semibold">평균 연봉</span>
                <span className="block text-2xl font-bold">5,600만원</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="font-semibold">전국 채용</span>
                <span className="block text-2xl font-bold">6개 지역</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col lg:flex-row gap-4">
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
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2 ${
                    viewMode === 'list' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <List className="w-4 h-4" />
                  목록
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2 ${
                    viewMode === 'map' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Map className="w-4 h-4" />
                  지도
                </button>
              </div>
              
              {userLocation && (
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setDistanceFilter('all')}
                    className={`px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2 ${
                      distanceFilter === 'all' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    전체
                  </button>
                  <button
                    onClick={() => setDistanceFilter('near')}
                    className={`px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2 ${
                      distanceFilter === 'near' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                    {preferredDistance}km 이내
                  </button>
                </div>
              )}
              
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
                <button
                  onClick={() => setFilterType('onsite')}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    filterType === 'onsite' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  사무실
                </button>
              </div>
            </div>
          </div>
          
          {!userLocation && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <p className="text-sm text-blue-800">
                  위치를 설정하면 거리 기반 필터링과 채용공고까지의 거리를 확인할 수 있습니다.
                </p>
              </div>
              <button
                onClick={() => navigate('/profile')}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                위치 설정하기
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Listings or Map View */}
          <div className="lg:col-span-2">
            {viewMode === 'list' ? (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    채용 공고
                    {distanceFilter === 'near' && ` (${preferredDistance}km 이내)`}
                  </h2>
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
                    <p className="text-gray-500">
                      {distanceFilter === 'near' 
                        ? `${preferredDistance}km 이내에 채용공고가 없습니다.`
                        : '검색 결과가 없습니다.'}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <KakaoMapView 
                jobs={filteredJobs} 
                onJobSelect={setSelectedJob}
              />
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