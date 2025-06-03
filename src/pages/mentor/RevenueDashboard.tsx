// src/pages/mentor/RevenueDashboard.tsx

import React, { useState, useEffect } from 'react';
import { Calendar, DollarSign, Users, TrendingUp, Download, Clock } from 'lucide-react';
import api from '../../services/api';

interface RevenueData {
  total_revenue: number;
  total_sessions: number;
  current_month_revenue: number;
  current_month_sessions: number;
  pending_settlement: number;
  recent_settlements: Settlement[];
}

interface Settlement {
  id: string;
  period: string;
  amount: number;
  status: string;
  processed_at: string | null;
}

const RevenueDashboard: React.FC = () => {
  const [revenueData, setRevenueData] = useState<RevenueData | null>(null);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRevenueData();
    fetchMonthlyData();
  }, []);

  const fetchRevenueData = async () => {
    try {
      const response = await api.get('/api/mentors/dashboard/revenue');
      setRevenueData(response.data);
    } catch (error) {
      console.error('Failed to fetch revenue data:', error);
      // 임시 데이터
      setRevenueData({
        total_revenue: 2850000,
        total_sessions: 57,
        current_month_revenue: 450000,
        current_month_sessions: 9,
        pending_settlement: 450000,
        recent_settlements: [
          { id: '1', period: '2024-01', amount: 480000, status: 'completed', processed_at: '2024-02-05' },
          { id: '2', period: '2024-02', amount: 540000, status: 'completed', processed_at: '2024-03-05' },
          { id: '3', period: '2024-03', amount: 600000, status: 'completed', processed_at: '2024-04-05' },
          { id: '4', period: '2024-04', amount: 450000, status: 'pending', processed_at: null },
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchMonthlyData = async () => {
    try {
      const response = await api.get('/api/mentors/dashboard/monthly-revenue');
      setMonthlyData(response.data);
    } catch (error) {
      console.error('Failed to fetch monthly data:', error);
      // 임시 데이터
      const mockData = [
        { month: '2024-01', revenue: 450000, sessions: 15 },
        { month: '2024-02', revenue: 540000, sessions: 18 },
        { month: '2024-03', revenue: 600000, sessions: 20 },
        { month: '2024-04', revenue: 720000, sessions: 24 },
        { month: '2024-05', revenue: 690000, sessions: 23 },
        { month: '2024-06', revenue: 810000, sessions: 27 },
      ];
      setMonthlyData(mockData);
    }
  };

  const handleExcelDownload = async () => {
    try {
      const response = await api.get('/api/mentors/settlements/download', {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `revenue_${new Date().toISOString().slice(0, 7)}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Failed to download:', error);
      alert('다운로드에 실패했습니다.');
    }
  };

  if (loading || !revenueData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="ml-3 text-gray-600">로딩 중...</p>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '정산완료';
      case 'pending': return '정산대기';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">수익 대시보드</h1>

        {/* 수익 요약 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-blue-600" />
              <span className="text-sm text-gray-500">총 수익</span>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(revenueData.total_revenue)}</p>
            <p className="text-sm text-gray-600 mt-1">플랫폼 수수료 차감 후</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-green-600" />
              <span className="text-sm text-gray-500">총 세션</span>
            </div>
            <p className="text-2xl font-bold">{revenueData.total_sessions}회</p>
            <p className="text-sm text-gray-600 mt-1">
              평균 {formatCurrency(revenueData.total_revenue / revenueData.total_sessions)}/세션
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-purple-600" />
              <span className="text-sm text-gray-500">이번 달</span>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(revenueData.current_month_revenue)}</p>
            <p className="text-sm text-gray-600 mt-1">{revenueData.current_month_sessions}회 진행</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-orange-600" />
              <span className="text-sm text-gray-500">정산 예정</span>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(revenueData.pending_settlement)}</p>
            <p className="text-sm text-gray-600 mt-1">다음 달 5일 정산</p>
          </div>
        </div>

        {/* 월별 추이 그래프 */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            월별 수익 추이
          </h2>
          <div className="h-64">
            <div className="flex h-full items-end justify-between">
              {monthlyData.map((data, index) => {
                const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));
                const heightPercent = (data.revenue / maxRevenue) * 100;
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center mx-2">
                    <div className="relative w-full">
                      <div 
                        className="bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer"
                        style={{ height: `${heightPercent * 2}px` }}
                        title={formatCurrency(data.revenue)}
                      />
                      <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap">
                        {formatCurrency(data.revenue).replace('₩', '')}
                      </span>
                    </div>
                    <span className="text-xs text-gray-600 mt-2">
                      {data.month.slice(5)}월
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 정산 내역 */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold">정산 내역</h2>
            <button 
              onClick={handleExcelDownload}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <Download className="w-4 h-4 mr-1" />
              엑셀 다운로드
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    정산 기간
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    정산 금액
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    정산일
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {revenueData.recent_settlements.map((settlement) => (
                  <tr key={settlement.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {settlement.period}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-gray-900">
                        {formatCurrency(settlement.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(settlement.status)}`}>
                        {getStatusText(settlement.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {settlement.processed_at 
                        ? new Date(settlement.processed_at).toLocaleDateString()
                        : '-'
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 정산 정책 안내 */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">정산 정책 안내</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              정산은 매월 5일에 진행되며, 전월 1일부터 말일까지의 완료된 세션이 대상입니다.
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              플랫폼 수수료 20%가 차감된 금액이 정산됩니다.
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              취소된 세션은 정산 대상에서 제외됩니다.
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              정산 금액은 등록하신 계좌로 입금되며, 입금 완료 시 이메일로 안내드립니다.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RevenueDashboard;