// src/pages/services/coffee-chat/MentorRegistration.tsx

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../stores/authStore";
import {
  Calendar,
  Clock,
  DollarSign,
  Plus,
  Trash2,
  CheckCircle,
} from "lucide-react";
import { coffeeChatApi } from "./api";

interface AvailableHours {
  [key: string]: Array<{ start: string; end: string }>;
}

const MentorRegistration: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    bio: "",
    expertise: [""],
    hourlyRate: 50000,
    availableHours: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    } as AvailableHours,
  });

  const [calendarConnected, setCalendarConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // location state에서 캘린더 연동 상태 확인
    if (location.state?.calendarConnected) {
      setCalendarConnected(true);
    } else {
      checkCalendarStatus();
    }
  }, [isAuthenticated, location]);

  const checkCalendarStatus = async () => {
    try {
      const status = await coffeeChatApi.getCalendarStatus();
      setCalendarConnected(status.isConnected);
    } catch (error) {
      console.error("Failed to check calendar status:", error);
    }
  };

  const handleGoogleCalendarConnect = async () => {
    try {
      // Frontend URL 설정 (환경에 따라 다르게)
      const frontendUrl = window.location.origin;
      const redirectUri = `${frontendUrl}/auth/google-calendar/callback`;

      // Google OAuth URL 직접 구성
      const authUrl =
        `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${
          import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID"
        }` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&response_type=code` +
        `&scope=openid%20email%20profile%20https://www.googleapis.com/auth/calendar.events%20https://www.googleapis.com/auth/calendar.readonly` +
        `&access_type=offline` +
        `&prompt=consent` +
        `&state=mentor-registration`;

      window.location.href = authUrl;
    } catch (error) {
      console.error("Failed to initiate Google Calendar auth:", error);
      alert("Google Calendar 연동을 시작할 수 없습니다.");
    }
  };

  const handleExpertiseChange = (index: number, value: string) => {
    const newExpertise = [...formData.expertise];
    newExpertise[index] = value;
    setFormData({ ...formData, expertise: newExpertise });
  };

  const addExpertise = () => {
    setFormData({ ...formData, expertise: [...formData.expertise, ""] });
  };

  const removeExpertise = (index: number) => {
    const newExpertise = formData.expertise.filter((_, i) => i !== index);
    setFormData({ ...formData, expertise: newExpertise });
  };

  const addTimeSlot = (day: string) => {
    setFormData({
      ...formData,
      availableHours: {
        ...formData.availableHours,
        [day]: [
          ...formData.availableHours[day],
          { start: "09:00", end: "10:00" },
        ],
      },
    });
  };

  const updateTimeSlot = (
    day: string,
    index: number,
    field: "start" | "end",
    value: string
  ) => {
    const newSlots = [...formData.availableHours[day]];
    newSlots[index] = { ...newSlots[index], [field]: value };
    setFormData({
      ...formData,
      availableHours: {
        ...formData.availableHours,
        [day]: newSlots,
      },
    });
  };

  const removeTimeSlot = (day: string, index: number) => {
    const newSlots = formData.availableHours[day].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      availableHours: {
        ...formData.availableHours,
        [day]: newSlots,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 개발 환경에서는 캘린더 연동 체크 스킵
    const isDevelopment =
      import.meta.env.DEV || window.location.hostname === "localhost";

    if (!calendarConnected && !isDevelopment) {
      alert("멘토 등록을 위해서는 Google Calendar 연동이 필요합니다.");
      return;
    }

    setLoading(true);

    try {
      const filteredExpertise = formData.expertise.filter(
        (e) => e.trim() !== ""
      );

      await coffeeChatApi.registerAsMentor({
        ...formData,
        expertise: filteredExpertise,
      });

      alert("멘토 등록이 완료되었습니다!");
      navigate("/mentor/dashboard");
    } catch (error: any) {
      console.error("Registration failed:", error);
      const errorMessage =
        error.response?.data?.detail ||
        "멘토 등록에 실패했습니다. 다시 시도해주세요.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const dayNames = {
    monday: "월요일",
    tuesday: "화요일",
    wednesday: "수요일",
    thursday: "목요일",
    friday: "금요일",
    saturday: "토요일",
    sunday: "일요일",
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <h1 className="text-3xl font-bold">멘토 등록</h1>
            <p className="mt-2 text-blue-100">
              당신의 경험과 지식을 공유해주세요
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Google Calendar 연동 섹션 */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Google Calendar 연동
              </h3>

              {calendarConnected ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>Google Calendar가 연동되었습니다</span>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 mb-4">
                    멘토 활동을 위해서는 Google Calendar 연동이 필요합니다.
                    연동하면 예약된 시간이 자동으로 캘린더에 추가됩니다.
                  </p>
                  <button
                    type="button"
                    onClick={handleGoogleCalendarConnect}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Google Calendar 연동하기
                  </button>
                </div>
              )}
            </div>

            {/* 기본 정보 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                직함/포지션 *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="예: 시니어 QA 엔지니어"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                회사 *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                placeholder="예: JamesCompany"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                자기소개 *
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                rows={4}
                placeholder="멘티들에게 자신을 소개해주세요. 경력, 전문 분야, 도움을 줄 수 있는 내용 등을 작성해주세요."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* 전문 분야 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                전문 분야 *
              </label>
              {formData.expertise.map((skill, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) =>
                      handleExpertiseChange(index, e.target.value)
                    }
                    placeholder="예: 테스트 자동화"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formData.expertise.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExpertise(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addExpertise}
                className="mt-2 flex items-center text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4 mr-1" />
                전문 분야 추가
              </button>
            </div>

            {/* 시간당 요금 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="inline w-4 h-4" />
                세션 요금 (60분 기준) *
              </label>
              <input
                type="number"
                value={formData.hourlyRate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hourlyRate: parseInt(e.target.value),
                  })
                }
                step={10000}
                min={30000}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                추천 가격: ₩50,000 ~ ₩100,000
              </p>
            </div>

            {/* 가능한 시간대 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                <Clock className="inline w-4 h-4 mr-1" />
                멘토링 가능 시간
              </label>

              <div className="space-y-4">
                {Object.entries(dayNames).map(([day, dayName]) => (
                  <div key={day} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{dayName}</h4>
                      <button
                        type="button"
                        onClick={() => addTimeSlot(day)}
                        className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        시간 추가
                      </button>
                    </div>

                    {formData.availableHours[day].length === 0 ? (
                      <p className="text-sm text-gray-500">
                        가능한 시간이 없습니다
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {formData.availableHours[day].map((slot, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="time"
                              value={slot.start}
                              onChange={(e) =>
                                updateTimeSlot(
                                  day,
                                  index,
                                  "start",
                                  e.target.value
                                )
                              }
                              className="px-3 py-1 border border-gray-300 rounded"
                            />
                            <span>~</span>
                            <input
                              type="time"
                              value={slot.end}
                              onChange={(e) =>
                                updateTimeSlot(
                                  day,
                                  index,
                                  "end",
                                  e.target.value
                                )
                              }
                              className="px-3 py-1 border border-gray-300 rounded"
                            />
                            <button
                              type="button"
                              onClick={() => removeTimeSlot(day, index)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 제출 버튼 */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/services/coffee-chat")}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={
                  loading || (!calendarConnected && !import.meta.env.DEV)
                }
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "등록 중..." : "멘토 등록하기"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MentorRegistration;
