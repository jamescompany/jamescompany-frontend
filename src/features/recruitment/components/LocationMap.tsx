// src/features/recruitment/components/LocationMap.tsx

import { MapPin } from 'lucide-react';

interface LocationMapProps {
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  companyName: string;
}

const LocationMap = ({ location, coordinates, companyName }: LocationMapProps) => {
  // OpenStreetMap iframe embed
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.lng-0.01}%2C${coordinates.lat-0.01}%2C${coordinates.lng+0.01}%2C${coordinates.lat+0.01}&layer=mapnik&marker=${coordinates.lat}%2C${coordinates.lng}`;
  
  return (
    <div className="space-y-2">
      <div className="h-64 w-full rounded-lg overflow-hidden border border-gray-200">
        <iframe
          width="100%"
          height="100%"
          src={mapUrl}
          style={{ border: 0 }}
          loading="lazy"
        />
      </div>
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>{location}</span>
        <a
          href={`https://www.openstreetmap.org/?mlat=${coordinates.lat}&mlon=${coordinates.lng}#map=17/${coordinates.lat}/${coordinates.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
        >
          <MapPin className="w-4 h-4" />
          큰 지도에서 보기
        </a>
      </div>
    </div>
  );
};

export default LocationMap;