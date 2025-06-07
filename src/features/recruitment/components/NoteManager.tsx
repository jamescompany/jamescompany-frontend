// src/features/recruitment/components/NoteManager.tsx

import { useState, useEffect } from 'react';
import { MessageSquare, Edit2, Trash2, Save, X } from 'lucide-react';
import api from '../../../shared/services/api';
import { formatDate } from '../../../shared/utils/dateUtils';

interface Note {
  id: string;
  content: string;
  author_name: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

interface NoteManagerProps {
  applicationId: string;
  currentUserId: string;
}

const NoteManager = ({ applicationId, currentUserId }: NoteManagerProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [showNotes, setShowNotes] = useState(false);

  useEffect(() => {
    if (showNotes) {
      fetchNotes();
    }
  }, [applicationId, showNotes]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/v1/applications/${applicationId}/notes`);
      setNotes(response.data);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const createNote = async () => {
    if (!newNote.trim()) return;

    try {
      const response = await api.post(`/api/v1/applications/${applicationId}/notes`, {
        content: newNote
      });
      
      setNotes([response.data, ...notes]);
      setNewNote('');
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  const updateNote = async (noteId: string) => {
    if (!editContent.trim()) return;

    try {
      const response = await api.put(`/api/v1/notes/${noteId}`, {
        content: editContent
      });
      
      setNotes(notes.map(note => 
        note.id === noteId ? response.data : note
      ));
      setEditingId(null);
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  };

  const deleteNote = async (noteId: string) => {
    if (!confirm('메모를 삭제하시겠습니까?')) return;

    try {
      await api.delete(`/api/v1/notes/${noteId}`);
      setNotes(notes.filter(note => note.id !== noteId));
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <button
        onClick={() => setShowNotes(!showNotes)}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="font-medium">메모 ({notes.length})</span>
      </button>

      {showNotes && (
        <div className="mt-4 space-y-4">
          {/* 새 메모 작성 */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="메모를 작성하세요..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
            <button
              onClick={createNote}
              disabled={!newNote.trim()}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              메모 추가
            </button>
          </div>

          {/* 메모 목록 */}
          {loading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : notes.length > 0 ? (
            <div className="space-y-3">
              {notes.map(note => (
                <div key={note.id} className="bg-white rounded-lg p-4 border border-gray-200">
                  {editingId === note.id ? (
                    <div>
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        autoFocus
                      />
                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={() => updateNote(note.id)}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="font-medium text-gray-900">{note.author_name}</span>
                          <span className="text-sm text-gray-500 ml-2">
                            {formatDate(note.created_at)}
                            {note.updated_at !== note.created_at && ' (수정됨)'}
                          </span>
                        </div>
                        
                        {note.user_id === currentUserId && (
                          <div className="flex gap-1">
                            <button
                              onClick={() => {
                                setEditingId(note.id);
                                setEditContent(note.content);
                              }}
                              className="p-1 text-gray-500 hover:text-gray-700"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteNote(note.id)}
                              className="p-1 text-gray-500 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">
              아직 작성된 메모가 없습니다
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default NoteManager;