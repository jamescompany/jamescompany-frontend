// src/components/profile/LocationSettings.tsx

import React, { useState, useEffect } from 'react';
import { useLocationStore } from '../../stores/locationStore';
import { locationData, getCoordinatesFromAddress, getNearbyStations } from '../../data/locationData';
import { Train, MapPin, Save } from 'lucide-react';

const LocationSettings: React.FC = () => {
  const { userLocation, preferredDistance, setUserLocation, setPreferredDistance } = useLocationStore();
  
  const [selectedCity, setSelectedCity] = useState(userLocation?.city || '');
  const [selectedDistrict, setSelectedDistrict] = useState(userLocation?.district || '');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(userLocation?.neighborhood || '');
  const [selectedStation, setSelectedStation] = useState(userLocation?.nearbyStation || '');
  const [nearbyStations, setNearbyStations] = useState<string[]>([]);
  const [selectedDistance, setSelectedDistance] = useState(preferredDistance);

  useEffect(() => {
    if (selectedCity && selectedDistrict && selectedNeighborhood) {
      const stations = getNearbyStations(selectedCity, selectedDistrict, selectedNeighborhood);
      setNearbyStations(stations || []);
      if (!stations?.includes(selectedStation)) {
        setSelectedStation('');
      }
    } else {
      setNearbyStations([]);
      setSelectedStation('');
    }
  }, [selectedCity, selectedDistrict, selectedNeighborhood]);

  const handleLocationSave = () => {
    if (selectedCity && selectedDistrict && selectedNeighborhood && selectedStation) {
      const coordinates = getCoordinatesFromAddress(selectedCity, selectedDistrict, selectedNeighborhood);
      
      setUserLocation({
        city: selectedCity,
        district: selectedDistrict,
        neighborhood: selectedNeighborhood,
        nearbyStation: selectedStation,
        coordinates: coordinates || undefined
      });
      
      setPreferredDistance(selectedDistance);
      
      alert('위치 정보가 저장되었습니다.');
    } else {
      alert('모든 위치 정보를 선택해주세요.');
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
    setSelectedDistrict('');
    setSelectedNeighborhood('');
    setSelectedStation('');
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
    setSelectedNeighborhood('');
    setSelectedStation('');
  };

  const handleNeighborhoodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedNeighborhood(e.target.value);
    setSelectedStation('');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          <MapPin className="inline w-5 h-5 mr-2" />
          거주지/활동지역 설정
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          설정한 위치와 인근 지하철역을 기반으로 채용공고까지의 거리를 표시합니다.
        </p>
        
        {userLocation && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">현재 설정된 위치:</span> {userLocation.city} {userLocation.district} {userLocation.neighborhood}
            </p>
            {userLocation.nearbyStation && (
              <p className="text-sm text-blue-800 mt-1">
                <span className="font-semibold">인근 지하철역:</span> {userLocation.nearbyStation}
              </p>
            )}
            <p className="text-sm text-blue-800 mt-1">
              <span className="font-semibold">선호 거리:</span> {preferredDistance}km 이내
            </p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              시/도
            </label>
            <select
              value={selectedCity}
              onChange={handleCityChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="">선택하세요</option>
              {Object.keys(locationData).map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              구/군
            </label>
            <select
              value={selectedDistrict}
              onChange={handleDistrictChange}
              disabled={!selectedCity}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
              <option value="">선택하세요</option>
              {selectedCity && Object.keys(locationData[selectedCity] || {}).map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              동/읍/면
            </label>
            <select
              value={selectedNeighborhood}
              onChange={handleNeighborhoodChange}
              disabled={!selectedDistrict}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
              <option value="">선택하세요</option>
              {selectedCity && selectedDistrict && 
                (locationData[selectedCity]?.[selectedDistrict] || []).map((neighborhood: string) => (
                  <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
                ))
              }
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Train className="inline w-4 h-4 mr-1" />
              인근 지하철역
            </label>
            <select
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
              disabled={!selectedNeighborhood || nearbyStations.length === 0}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
              <option value="">선택하세요</option>
              {nearbyStations.map((station) => (
                <option key={station} value={station}>{station}</option>
              ))}
            </select>
            {selectedNeighborhood && nearbyStations.length === 0 && (
              <p className="mt-1 text-xs text-amber-600">
                해당 지역의 지하철역 정보가 아직 등록되지 않았습니다.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              선호 거리
            </label>
            <select
              value={selectedDistance}
              onChange={(e) => setSelectedDistance(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value={5}>5km 이내</option>
              <option value={10}>10km 이내</option>
              <option value={20}>20km 이내</option>
              <option value={30}>30km 이내</option>
              <option value={50}>50km 이내</option>
              <option value={100}>100km 이내</option>
              <option value={999}>거리 무관</option>
            </select>
            <p className="mt-1 text-xs text-gray-500">
              선택한 거리 내의 채용공고를 우선적으로 보여드립니다.
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={handleLocationSave}
              disabled={!selectedCity || !selectedDistrict || !selectedNeighborhood || !selectedStation}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4 mr-2" />
              위치 정보 저장
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">💡 위치 설정 팁</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• 정확한 위치 설정으로 더 나은 채용 정보를 받아보세요</li>
          <li>• 지하철역 정보는 출퇴근 시간 계산에 활용됩니다</li>
          <li>• 위치 정보는 언제든지 수정할 수 있습니다</li>
        </ul>
      </div>
    </div>
  );
};

export default LocationSettings;