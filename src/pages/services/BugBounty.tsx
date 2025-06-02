// src/pages/services/BugBounty.tsx
import React, { useEffect, useState } from 'react';
import { useServiceStore } from '../../stores/serviceStore';

const BugBounty: React.FC = () => {
  const { betaTests, fetchBetaTests, loading, error } = useServiceStore();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    const loadBetaTests = async () => {
      try {
        if (mounted) {
          await fetchBetaTests();
        }
      } catch (err) {
        if (mounted) {
          console.log('Beta tests API not available yet');
          setShowError(true);
        }
      }
    };
    
    loadBetaTests();
    
    return () => {
      mounted = false;
    };
  }, []); // fetchBetaTests 의존성 제거

  // 임시 데이터
  const mockBetaTests = [
    {
      id: 1,
      appName: '쇼핑몰 앱 v2.0',
      company: 'ABC 커머스',
      category: 'E-commerce',
      platform: 'Android/iOS',
      reward: '버그당 10,000원 ~ 50,000원',
      deadline: '2024-02-15',
      participants: 45,
      bugsFound: 127,
      status: 'active'
    },
    {
      id: 2,
      appName: '금융 관리 앱',
      company: 'XYZ 핀테크',
      category: 'Finance',
      platform: 'Android',
      reward: '버그당 20,000원 ~ 100,000원',
      deadline: '2024-02-20',
      participants: 32,
      bugsFound: 89,
      status: 'active'
    },
    {
      id: 3,
      appName: '헬스케어 트래커',
      company: '건강한 생활',
      category: 'Healthcare',
      platform: 'iOS',
      reward: '버그당 15,000원 ~ 70,000원',
      deadline: '2024-02-10',
      participants: 28,
      bugsFound: 56,
      status: 'ending'
    }
  ];

  const displayTests = betaTests?.length > 0 ? betaTests : mockBetaTests;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">진행중</span>;
      case 'ending':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">마감임박</span>;
      case 'ended':
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">종료</span>;
      default:
        return null;
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Bug Bounty Arena</h1>
          <p className="text-xl text-gray-600">앱 출시 전 베타 테스트에 참여하고 보상을 받으세요</p>
        </div>

        {error && showError && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">
              새로운 베타 테스트 프로그램을 준비 중입니다. 곧 더 많은 기회를 제공할 예정입니다.
            </p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">로딩 중...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              {displayTests.map((test: any) => (
                <div key={test.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {test.appName}
                      </h3>
                      <p className="text-gray-600">{test.company}</p>
                    </div>
                    {getStatusBadge(test.status)}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">카테고리</p>
                      <p className="font-medium">{test.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">플랫폼</p>
                      <p className="font-medium">{test.platform}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">마감일</p>
                      <p className="font-medium">{test.deadline}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">보상</p>
                      <p className="font-medium text-green-600">{test.reward}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <span>👥 참여자: {test.participants}명</span>
                      <span>🐛 발견된 버그: {test.bugsFound}개</span>
                    </div>
                    <button 
                      className={`w-full py-2 px-4 rounded-lg font-medium ${
                        test.status === 'active' 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={test.status !== 'active'}
                    >
                      {test.status === 'active' ? '참여하기' : '마감됨'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Bug Bounty 참여 방법</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">1️⃣</span>
                  </div>
                  <h3 className="font-semibold mb-1">프로그램 선택</h3>
                  <p className="text-sm text-gray-600">참여하고 싶은 베타 테스트 선택</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">2️⃣</span>
                  </div>
                  <h3 className="font-semibold mb-1">앱 테스트</h3>
                  <p className="text-sm text-gray-600">제공된 앱을 꼼꼼히 테스트</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">3️⃣</span>
                  </div>
                  <h3 className="font-semibold mb-1">버그 리포트</h3>
                  <p className="text-sm text-gray-600">발견한 버그를 상세히 작성</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">4️⃣</span>
                  </div>
                  <h3 className="font-semibold mb-1">보상 수령</h3>
                  <p className="text-sm text-gray-600">검증된 버그에 대한 보상 지급</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BugBounty;