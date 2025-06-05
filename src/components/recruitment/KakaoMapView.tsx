// src/components/recruitment/KakaoMapView.tsx

import { useEffect, useRef, useState } from 'react';
import { MapPin, Briefcase, Users, TrendingUp, X, AlertCircle } from 'lucide-react';
import type { JobPosting } from '../../types/recruitment';
import { loadKakaoMapScript } from '../../utils/kakaoMapLoader';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapViewProps {
  jobs: JobPosting[];
  onJobSelect: (job: JobPosting) => void;
}

const KakaoMapView = ({ jobs, onJobSelect }: KakaoMapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [selectedJobs, setSelectedJobs] = useState<JobPosting[]>([]);
  const [showJobList, setShowJobList] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    
    // Kakao Maps SDK 로드
    const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY || '7a229cce225400f......';
    
    // 실제 전체 API 키를 입력하세요
    if (!KAKAO_API_KEY || KAKAO_API_KEY.includes('YOUR_API_KEY')) {
      setLoadError('API 키가 설정되지 않았습니다.');
      console.error('Kakao API key not set properly');
      return;
    }
    
    console.log('Starting to load Kakao Maps SDK...');
    console.log('API Key starts with:', KAKAO_API_KEY.substring(0, 10));
    
    loadKakaoMapScript(KAKAO_API_KEY)
      .then(() => {
        if (isMounted) {
          console.log('Kakao Maps SDK loaded successfully');
          setIsMapLoaded(true);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.error('Failed to load Kakao Maps:', error);
          setLoadError(`Kakao Maps SDK 로드 실패: ${error.message}`);
        }
      });
    
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isMapLoaded || !mapContainer.current) return;

    try {
      const kakao = window.kakao;
      
      // 지도 생성
      const options = {
        center: new kakao.maps.LatLng(36.5, 127.5), // 한국 중심
        level: 13 // 전국이 보이는 레벨
      };
      
      const newMap = new kakao.maps.Map(mapContainer.current, options);

      // 마커 클러스터러 생성
      const clusterer = new kakao.maps.MarkerClusterer({
        map: newMap,
        averageCenter: true,
        minLevel: 10,
        styles: [{
          width: '53px',
          height: '52px',
          background: 'url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/cluster_marker_bg.png) no-repeat',
          color: '#fff',
          textAlign: 'center',
          lineHeight: '54px'
        }]
      });

      // 마커 생성
      const markers = jobs.map((job) => {
        if (!job.coordinates) return null;

        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(job.coordinates.lat, job.coordinates.lng),
          title: job.companyName
        });

        // 커스텀 오버레이 생성
        const content = document.createElement('div');
        content.innerHTML = `
          <div style="
            background: white;
            border: 2px solid #3b82f6;
            border-radius: 8px;
            padding: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            min-width: 200px;
            cursor: pointer;
          ">
            <div style="font-weight: bold; margin-bottom: 4px;">${job.companyName}</div>
            <div style="font-size: 14px; color: #666; margin-bottom: 8px;">${job.position}</div>
            <div style="font-size: 12px; color: #999;">${job.location}</div>
            <div style="font-size: 13px; color: #3b82f6; font-weight: 600; margin-top: 8px;">
              ${job.salaryRange.min / 10000}-${job.salaryRange.max / 10000}만원
            </div>
          </div>
        `;

        const customOverlay = new kakao.maps.CustomOverlay({
          content: content,
          position: marker.getPosition(),
          xAnchor: 0.5,
          yAnchor: 1.4,
          zIndex: 3
        });

        // 마커 클릭 이벤트
        kakao.maps.event.addListener(marker, 'click', function() {
          customOverlay.setMap(newMap);
          
          // 3초 후 자동으로 닫기
          setTimeout(() => {
            customOverlay.setMap(null);
          }, 3000);

          // 해당 위치의 모든 채용공고 찾기
          const jobsAtLocation = jobs.filter(j => 
            j.coordinates?.lat === job.coordinates?.lat && 
            j.coordinates?.lng === job.coordinates?.lng
          );

          if (jobsAtLocation.length === 1) {
            onJobSelect(job);
          } else {
            setSelectedJobs(jobsAtLocation);
            setShowJobList(true);
          }
        });

        // 오버레이 클릭 이벤트
        content.addEventListener('click', () => {
          onJobSelect(job);
        });

        return marker;
      }).filter(Boolean);

      // 클러스터러에 마커 추가
      clusterer.addMarkers(markers);

      // 지도 컨트롤 추가
      const zoomControl = new kakao.maps.ZoomControl();
      newMap.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      const mapTypeControl = new kakao.maps.MapTypeControl();
      newMap.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    } catch (error) {
      console.error('Error initializing Kakao Map:', error);
      setLoadError('지도 초기화 중 오류가 발생했습니다.');
    }
  }, [isMapLoaded, jobs, onJobSelect]);

  // 로딩 중
  if (!isMapLoaded && !loadError) {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <MapPin className="w-7 h-7" />
            전국 QA 채용 지도
          </h3>
          <p className="text-blue-100">지도를 로드하는 중입니다...</p>
        </div>
        <div className="h-[600px] flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Kakao Map을 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (loadError) {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
            <MapPin className="w-7 h-7" />
            전국 QA 채용 지도
          </h3>
        </div>
        <div className="h-[600px] flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <p className="text-gray-700 font-semibold mb-2">지도를 불러올 수 없습니다</p>
            <p className="text-gray-500 text-sm mb-4">{loadError}</p>
            <div className="bg-blue-50 rounded-lg p-4 max-w-md mx-auto text-left">
              <p className="text-sm text-gray-700 mb-2">
                <strong>해결 방법:</strong>
              </p>
              <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                <li>Kakao Developers에서 API 키 확인</li>
                <li>Web 플랫폼에 현재 도메인 추가</li>
                <li>JavaScript 키가 올바른지 확인</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <MapPin className="w-7 h-7" />
          전국 QA 채용 지도
        </h3>
        <p className="text-blue-100">마커를 클릭하여 채용공고를 확인하세요</p>
        
        {/* 통계 */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              <span className="text-sm">총 채용공고</span>
            </div>
            <p className="text-2xl font-bold mt-1">{jobs.length}개</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="text-sm">채용 기업</span>
            </div>
            <p className="text-2xl font-bold mt-1">{new Set(jobs.map(j => j.companyName)).size}개</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm">평균 연봉</span>
            </div>
            <p className="text-2xl font-bold mt-1">5.6천만</p>
          </div>
        </div>
      </div>

      {/* 지도 영역 */}
      <div className="relative">
        <div ref={mapContainer} className="w-full h-[600px]" />
        
        {/* 범례 */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">채용 현황</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
              <span>개별 채용공고</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">N</div>
              <span>클러스터 (여러 공고)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 동일 위치 채용공고 목록 모달 */}
      {showJobList && selectedJobs.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedJobs[0].location} 지역 채용공고
                </h3>
                <button
                  onClick={() => setShowJobList(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid gap-4">
                {selectedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 cursor-pointer hover:shadow-lg transition-all duration-300"
                    onClick={() => {
                      onJobSelect(job);
                      setShowJobList(false);
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h5 className="font-semibold text-gray-900">{job.position}</h5>
                        <p className="text-sm text-gray-600">{job.companyName}</p>
                      </div>
                      {job.isCertified && (
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">인증</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{job.workType}</span>
                      <span className="font-medium text-blue-600">
                        {job.salaryRange.min / 10000}-{job.salaryRange.max / 10000}만원
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KakaoMapView;