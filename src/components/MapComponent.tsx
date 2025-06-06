// src/components/MapComponent.tsx

import { useEffect, useState } from 'react';
import { loadKakaoMapScript } from '../utils/kakaoMapLoader';

const MapComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_KAKAO_MAP_API_KEY || '7a229cce225400f923c0c2fb181a9ab3';
    
    loadKakaoMapScript(apiKey, {
      libraries: ['services', 'clusterer'],
      timeout: 15000
    })
    .then(() => {
      setIsLoading(false);
      // 지도 초기화 로직
    })
    .catch((err) => {
      console.error('Map loading error:', err);
      setError(err.message);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <div>지도 로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return <div id="map" style={{ width: '100%', height: '400px' }} />;
};