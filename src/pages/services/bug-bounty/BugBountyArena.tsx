// src/pages/services/bugbounty/BugBounty.tsx

import { useState } from 'react';
import { Bug, Trophy, DollarSign, Shield, Target, Users, AlertCircle, CheckCircle } from 'lucide-react';

interface BugBountyProgram {
  id: string;
  appName: string;
  company: string;
  platform: 'android' | 'ios' | 'web';
  description: string;
  minReward: number;
  maxReward: number;
  severity: string[];
  participants: number;
  bugsFound: number;
  status: 'active' | 'upcoming' | 'ended';
  deadline?: string;
}

const programs: BugBountyProgram[] = [
  {
    id: '1',
    appName: '쇼핑몰 앱 v2.0',
    company: 'ABC커머스',
    platform: 'android',
    description: '새로운 결제 시스템과 UI가 적용된 쇼핑몰 앱의 베타 테스트',
    minReward: 10000,
    maxReward: 500000,
    severity: ['Critical', 'High', 'Medium', 'Low'],
    participants: 145,
    bugsFound: 23,
    status: 'active',
    deadline: '2024-03-15'
  },
  {
    id: '2',
    appName: '피트니스 트래커',
    company: '헬스테크',
    platform: 'ios',
    description: '운동 기록 및 건강 관리 앱의 신규 기능 테스트',
    minReward: 20000,
    maxReward: 300000,
    severity: ['High', 'Medium', 'Low'],
    participants: 89,
    bugsFound: 12,
    status: 'active',
    deadline: '2024-03-20'
  },
  {
    id: '3',
    appName: '금융 관리 플랫폼',
    company: '핀테크솔루션',
    platform: 'web',
    description: '개인 자산 관리 웹 플랫폼의 보안 취약점 점검',
    minReward: 50000,
    maxReward: 1000000,
    severity: ['Critical', 'High'],
    participants: 234,
    bugsFound: 45,
    status: 'active',
    deadline: '2024-03-10'
  },
  {
    id: '4',
    appName: '교육 플랫폼 3.0',
    company: '에듀테크',
    platform: 'web',
    description: '온라인 학습 플랫폼의 대규모 업데이트 테스트',
    minReward: 15000,
    maxReward: 200000,
    severity: ['High', 'Medium', 'Low'],
    participants: 0,
    bugsFound: 0,
    status: 'upcoming',
    deadline: '2024-04-01'
  }
];

const BugBountyArena = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('active');

  const filteredPrograms = programs.filter(program => {
    const platformMatch = selectedPlatform === 'all' || program.platform === selectedPlatform;
    const statusMatch = selectedStatus === 'all' || program.status === selectedStatus;
    return platformMatch && statusMatch;
  });

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'android':
        return '🤖';
      case 'ios':
        return '🍎';
      case 'web':
        return '🌐';
      default:
        return '📱';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'ended':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'text-red-600';
      case 'High':
        return 'text-orange-600';
      case 'Medium':
        return 'text-yellow-600';
      case 'Low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <Bug className="w-10 h-10 mr-3 text-red-600" />
            Bug Bounty Arena
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            앱 출시 전 베타 테스터가 되어 버그를 찾고 보상을 받으세요
          </p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-900">89</p>
            <p className="text-gray-600 text-sm">총 버그 발견</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-900">₩5.2M</p>
            <p className="text-gray-600 text-sm">총 보상금</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-900">468</p>
            <p className="text-gray-600 text-sm">활동 테스터</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <Target className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-900">12</p>
            <p className="text-gray-600 text-sm">진행중 프로그램</p>
          </div>
        </div>

        {/* 필터 */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">플랫폼</label>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">전체</option>
              <option value="android">Android</option>
              <option value="ios">iOS</option>
              <option value="web">Web</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">전체</option>
              <option value="active">진행중</option>
              <option value="upcoming">예정</option>
              <option value="ended">종료</option>
            </select>
          </div>
        </div>

        {/* 프로그램 목록 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPrograms.map((program) => (
            <div key={program.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-2">{getPlatformIcon(program.platform)}</span>
                      <h3 className="text-xl font-semibold text-gray-900">{program.appName}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{program.company}</p>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(program.status)}`}>
                    {program.status === 'active' ? '진행중' : program.status === 'upcoming' ? '예정' : '종료'}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{program.description}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">보상금 범위</span>
                    <span className="font-semibold">
                      ₩{program.minReward.toLocaleString()} - ₩{program.maxReward.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">심각도</span>
                    <div className="flex gap-2">
                      {program.severity.map((sev) => (
                        <span key={sev} className={`text-xs font-medium ${getSeverityColor(sev)}`}>
                          {sev}
                        </span>
                      ))}
                    </div>
                  </div>

                  {program.status === 'active' && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">참여자</span>
                        <span className="text-sm">{program.participants}명</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">발견된 버그</span>
                        <span className="text-sm">{program.bugsFound}개</span>
                      </div>
                    </>
                  )}

                  {program.deadline && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">마감일</span>
                      <span className="text-sm">{new Date(program.deadline).toLocaleDateString('ko-KR')}</span>
                    </div>
                  )}
                </div>

                <button
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    program.status === 'active'
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : program.status === 'upcoming'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={program.status === 'ended'}
                >
                  {program.status === 'active' ? '참여하기' : program.status === 'upcoming' ? '알림 신청' : '종료됨'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 안내 사항 */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Bug Bounty 참여 안내
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-800">
            <div>
              <h3 className="font-semibold mb-2">참여 자격</h3>
              <ul className="space-y-1">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>만 18세 이상의 개인 또는 팀</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>기본적인 테스팅 지식 보유자</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>책임감 있는 버그 리포팅 가능자</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">보상 기준</h3>
              <ul className="space-y-1">
                <li className="flex items-start">
                  <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>버그의 심각도에 따라 차등 지급</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>중복 제보는 최초 제보자에게만 지급</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>리포트 품질에 따라 추가 보상 가능</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BugBountyArena;