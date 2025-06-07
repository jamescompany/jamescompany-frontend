// src/features/recruitment/components/JamesScoreDisplay.tsx

import { useState } from 'react';
import { Star, TrendingUp, TrendingDown, Info, Edit2, Check, X, Calculator } from 'lucide-react';
import api from '../../../shared/services/api';

interface ScoreBreakdown {
  experience?: number;
  skills?: number;
  education?: number;
  portfolio?: number;
  qa_specific?: number;
}

interface ScoreFactors {
  positive?: string[];
  negative?: string[];
}

interface ManualAdjustment {
  original_score: number;
  reason: string;
  adjusted_at: string;
  adjusted_by?: string;
}

interface ScoreDetails {
  breakdown?: ScoreBreakdown;
  factors?: ScoreFactors;
  manual_adjustments?: ManualAdjustment;
  calculated_at?: string;
}

interface JamesScoreDisplayProps {
  applicationId: string;
  initialScore?: number;
  details?: ScoreDetails;
  feedback?: string;
  editable?: boolean;
  onScoreUpdate?: (score: number) => void;
}

const JamesScoreDisplay = ({ 
  applicationId,
  initialScore, 
  details, 
  feedback,
  editable = false,
  onScoreUpdate
}: JamesScoreDisplayProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [score, setScore] = useState(initialScore || 0);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(score.toString());
  const [loading, setLoading] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-50';
    if (score >= 60) return 'bg-blue-50';
    if (score >= 40) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  const getScoreLevel = (score: number) => {
    if (score >= 80) return '우수';
    if (score >= 60) return '양호';
    if (score >= 40) return '보통';
    return 'miheup';
  };

  const calculateScore = async () => {
    setLoading(true);
    try {
      const response = await api.post(`/api/v1/applications/${applicationId}/calculate-score`);
      const newScore = response.data.james_score || response.data.score;
      setScore(newScore);
      onScoreUpdate?.(newScore);
    } catch (error) {
      console.error('Failed to calculate score:', error);
      alert('점수 계산 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const updateScore = async () => {
    const newScore = parseInt(editValue);
    if (isNaN(newScore) || newScore < 0 || newScore > 100) {
      alert('0-100 사이의 점수를 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      await api.put(`/api/v1/applications/${applicationId}/score`, {
        score: newScore,
        reason: '수동 조정'
      });
      setScore(newScore);
      setIsEditing(false);
      onScoreUpdate?.(newScore);
    } catch (error) {
      console.error('Failed to update score:', error);
      alert('점수 업데이트 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 점수가 없는 경우 계산 버튼 표시
  if (!initialScore && !loading) {
    return (
      <button
        onClick={calculateScore}
        disabled={loading}
        className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors disabled:opacity-50"
      >
        <Calculator className="w-4 h-4" />
        점수 계산
      </button>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
              min="0"
              max="100"
              autoFocus
            />
            <button
              onClick={updateScore}
              disabled={loading}
              className="p-1 text-green-600 hover:bg-green-50 rounded disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditValue(score.toString());
              }}
              className="p-1 text-red-600 hover:bg-red-50 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <div className={`flex items-center gap-1 px-3 py-1 rounded-lg ${getScoreBgColor(score)}`}>
              <Star className={`w-4 h-4 fill-current ${getScoreColor(score)}`} />
              <span className={`font-bold ${getScoreColor(score)}`}>{score}</span>
              <span className={`text-sm ${getScoreColor(score)}`}>/ 100</span>
            </div>
            
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              score >= 80 ? 'bg-green-100 text-green-700' :
              score >= 60 ? 'bg-blue-100 text-blue-700' :
              score >= 40 ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {getScoreLevel(score)}
            </span>

            {editable && (
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                title="점수 수정"
              >
                <Edit2 className="w-3 h-3" />
              </button>
            )}

            {details && (
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                title="상세 정보"
              >
                <Info className="w-3 h-3" />
              </button>
            )}
          </>
        )}
      </div>

      {/* 점수 상세 정보 팝오버 */}
      {showDetails && details && (
        <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900">James Score 상세 분석</h4>
            <button
              onClick={() => setShowDetails(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {/* 점수 구성 */}
          {details.breakdown && (
            <div className="space-y-2 mb-4">
              <h5 className="text-sm font-medium text-gray-700">점수 구성</h5>
              {Object.entries(details.breakdown).map(([key, value]: [string, number]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {key === 'experience' && '경력'}
                    {key === 'skills' && '기술 스택'}
                    {key === 'education' && '학력'}
                    {key === 'portfolio' && '포트폴리오'}
                    {key === 'qa_specific' && 'QA 전문성'}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-12 text-right">{value}점</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 주요 평가 요인 */}
          {details.factors && (
            <div className="space-y-3 mb-4">
              {details.factors.positive && details.factors.positive.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium text-green-700 mb-1 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    긍정적 요인
                  </h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {details.factors.positive.map((factor: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 pl-5">
                        <span className="text-green-500 mt-1">•</span>
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {details.factors.negative && details.factors.negative.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium text-red-700 mb-1 flex items-center gap-1">
                    <TrendingDown className="w-4 h-4" />
                    개선 필요
                  </h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {details.factors.negative.map((factor: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 pl-5">
                        <span className="text-red-500 mt-1">•</span>
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* AI 피드백 */}
          {feedback && (
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-700 mb-1">AI 평가 의견</h5>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{feedback}</p>
            </div>
          )}

          {/* 수동 조정 기록 */}
          {details.manual_adjustments && (
            <div className="pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                수동 조정: {details.manual_adjustments.original_score}점 → {score}점
              </p>
              {details.manual_adjustments.reason && (
                <p className="text-xs text-gray-500">사유: {details.manual_adjustments.reason}</p>
              )}
              {details.manual_adjustments.adjusted_at && (
                <p className="text-xs text-gray-500">
                  조정일: {new Date(details.manual_adjustments.adjusted_at).toLocaleDateString('ko-KR')}
                </p>
              )}
            </div>
          )}

          {/* 계산 시간 */}
          {details.calculated_at && (
            <p className="text-xs text-gray-500 mt-2">
              계산일시: {new Date(details.calculated_at).toLocaleString('ko-KR')}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default JamesScoreDisplay;