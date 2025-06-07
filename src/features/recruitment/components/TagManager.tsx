// src/features/recruitment/components/TagManager.tsx

import { useState, useEffect } from 'react';
import { X, Plus, Tag as TagIcon } from 'lucide-react';
import api from '../../../shared/services/api';

interface Tag {
  id: string;
  name: string;
  color: string;
  usage_count: number;
}

interface TagManagerProps {
  applicationId: string;
  initialTags: Tag[];
  companyId: string;
  onTagsUpdate?: (tags: Tag[]) => void;
}

const TagManager = ({ applicationId, initialTags, companyId, onTagsUpdate }: TagManagerProps) => {
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchAvailableTags();
  }, [companyId]);

  const fetchAvailableTags = async () => {
    try {
      const response = await api.get(`/api/v1/tags?company_id=${companyId}`);
      setAvailableTags(response.data);
    } catch (error) {
      console.error('Failed to fetch tags:', error);
    }
  };

  const addTag = async (tagName: string) => {
    try {
      setIsCreating(true);
      const response = await api.post(`/api/v1/applications/${applicationId}/tags`, {
        tag_names: [tagName]
      });
      
      const newTags = [...tags, ...response.data.tags];
      setTags(newTags);
      onTagsUpdate?.(newTags);
      
      setSearchQuery('');
      setShowDropdown(false);
      
      // 사용 가능한 태그 목록 갱신
      await fetchAvailableTags();
    } catch (error) {
      console.error('Failed to add tag:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const removeTag = async (tagId: string) => {
    try {
      await api.delete(`/api/v1/applications/${applicationId}/tags/${tagId}`);
      
      const newTags = tags.filter(tag => tag.id !== tagId);
      setTags(newTags);
      onTagsUpdate?.(newTags);
    } catch (error) {
      console.error('Failed to remove tag:', error);
    }
  };

  const filteredTags = availableTags.filter(
    tag => 
      tag.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !tags.find(t => t.id === tag.id)
  );

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      // 기존 태그가 없으면 새로 생성
      const existingTag = filteredTags.find(
        tag => tag.name.toLowerCase() === searchQuery.toLowerCase()
      );
      
      if (existingTag) {
        addTag(existingTag.name);
      } else {
        addTag(searchQuery.trim());
      }
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center gap-2">
        {/* 현재 태그들 */}
        {tags.map(tag => (
          <span
            key={tag.id}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium"
            style={{ 
              backgroundColor: `${tag.color}20`,
              color: tag.color,
              border: `1px solid ${tag.color}40`
            }}
          >
            {tag.name}
            <button
              onClick={() => removeTag(tag.id)}
              className="hover:opacity-70 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}

        {/* 태그 추가 버튼 */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Plus className="w-3 h-3" />
            태그 추가
          </button>

          {/* 드롭다운 */}
          {showDropdown && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-3 border-b">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="태그 검색 또는 생성..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>

              <div className="max-h-48 overflow-y-auto">
                {filteredTags.length > 0 ? (
                  filteredTags.map(tag => (
                    <button
                      key={tag.id}
                      onClick={() => addTag(tag.name)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <TagIcon className="w-4 h-4" style={{ color: tag.color }} />
                        {tag.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {tag.usage_count}회 사용
                      </span>
                    </button>
                  ))
                ) : searchQuery ? (
                  <button
                    onClick={() => addTag(searchQuery.trim())}
                    disabled={isCreating}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-blue-600"
                  >
                    <Plus className="w-4 h-4" />
                    "{searchQuery}" 태그 생성
                  </button>
                ) : (
                  <div className="px-4 py-2 text-gray-500 text-sm">
                    태그를 검색하거나 새로 만드세요
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TagManager;