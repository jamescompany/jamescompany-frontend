// src/features/recruitment/components/MapJobCard.tsx

import { X, Building, MapPin, DollarSign } from 'lucide-react';
import type { JobPosting } from '../types/recruitment';

interface MapJobCardProps {
  job: JobPosting;
  onClose: () => void;
  onSelect: () => void;
}

const MapJobCard = ({ job, onClose, onSelect }: MapJobCardProps) => {
  return (
    <div className="absolute z-10 bg-white rounded-lg shadow-xl p-4 w-80">
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-gray-900 pr-2">{job.position}</h4>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Building className="w-4 h-4" />
          <span>{job.companyName}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <DollarSign className="w-4 h-4" />
          <span>{job.salaryRange.min / 10000}-{job.salaryRange.max / 10000}만원</span>
        </div>
      </div>
      
      <button
        onClick={onSelect}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
      >
        상세보기
      </button>
    </div>
  );
};

export default MapJobCard;