// src/data/recruitment/sampleJobs.ts

import type { JobPosting } from '../../types/recruitment';

export const sampleJobs: JobPosting[] = [
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
    salaryRange: { min: 48000000, max: 60000000 },
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
    salaryRange: { min: 60000000, max: 80000000 },
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
    salaryRange: { min: 70000000, max: 90000000 },
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
  }
];