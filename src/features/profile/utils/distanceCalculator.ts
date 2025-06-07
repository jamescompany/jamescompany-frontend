// src/features/profile/utils/distanceCalculator.ts

/**
 * Haversine 공식을 사용하여 두 지점 간의 거리를 계산합니다.
 * @param lat1 첫 번째 지점의 위도
 * @param lon1 첫 번째 지점의 경도
 * @param lat2 두 번째 지점의 위도
 * @param lon2 두 번째 지점의 경도
 * @returns 두 지점 간의 거리 (km)
 */
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // 지구의 반지름 (km)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return Math.round(distance * 10) / 10; // 소수점 1자리까지 반올림
  };
  
  /**
   * 거리를 사용자 친화적인 문자열로 변환합니다.
   * @param distance 거리 (km)
   * @returns 포맷된 거리 문자열
   */
  export const formatDistance = (distance: number): string => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${distance.toFixed(1)}km`;
  };
  
  /**
   * 거리에 따른 색상을 반환합니다.
   * @param distance 거리 (km)
   * @returns Tailwind CSS 색상 클래스
   */
  export const getDistanceColor = (distance: number): string => {
    if (distance <= 5) return 'text-green-600';
    if (distance <= 15) return 'text-blue-600';
    if (distance <= 30) return 'text-yellow-600';
    return 'text-gray-600';
  };
  
  /**
   * 거리에 따른 배경색을 반환합니다.
   * @param distance 거리 (km)
   * @returns Tailwind CSS 배경색 클래스
   */
  export const getDistanceBgColor = (distance: number): string => {
    if (distance <= 5) return 'bg-green-50';
    if (distance <= 15) return 'bg-blue-50';
    if (distance <= 30) return 'bg-yellow-50';
    return 'bg-gray-50';
  };