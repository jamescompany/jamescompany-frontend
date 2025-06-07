// src/features/company/pages/CompanyRecruitmentDashboard.tsx

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Building,
  Eye,
  Users,
  Calendar,
  Edit,
  BarChart3,
  FileText,
  AlertCircle,
  Download,
  Shield,
  Search,
  MoreVertical,
  Pause,
  Play,
  TrendingUp,
  Bell,
  MessageSquare,
  Tag,
  Filter,
} from "lucide-react";
import {
  recruitmentAPI,
  type Job as ApiJob,
  type ApplicationSummary as ApiApplicationSummary,
} from "../../recruitment/services/recruitmentApi";
import { formatDate, getDaysUntil } from "../../../shared/utils/dateUtils";
import TagManager from "../../recruitment/components/TagManager";
import NoteManager from "../../recruitment/components/NoteManager";
import { useAuthStore } from "../../auth/stores/authStore";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import JamesScoreDisplay from "../../recruitment/components/JamesScoreDisplay";
import { Loader2, Calculator } from "lucide-react";

interface Tag {
  id: string;
  name: string;
  color: string;
  usage_count: number;
}

// recruitmentApi의 타입을 확장
interface ApplicationSummary extends Omit<ApiApplicationSummary, "tags"> {
  tags: Tag[];
  jamesScoreDetails?: any;
  jamesFeedback?: string;
}

interface Job extends Omit<ApiJob, "applications"> {
  applications: ApplicationSummary[];
}

interface CompanyStats {
  totalViews: number;
  totalApplications: number;
  activeJobs: number;
  avgApplicationsPerJob: number;
  weeklyGrowth: {
    views: number;
    applications: number;
  };
  conversionRate: number;
}

const CompanyRecruitmentDashboard = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<
    "overview" | "applications" | "analytics" | "settings"
  >("overview");
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [companyData, setCompanyData] = useState<any>(null);
  const [stats, setStats] = useState<CompanyStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "score" | "name">("date");
  const [selectedApplications, setSelectedApplications] = useState<string[]>(
    []
  );
  const [expandedNotes, setExpandedNotes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [showTagFilter, setShowTagFilter] = useState(false);

  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [additionalEmails, setAdditionalEmails] = useState("");
  const [calculatingScores, setCalculatingScores] = useState<Set<string>>(
    new Set()
  );
  const [batchCalculating, setBatchCalculating] = useState(false);

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  useEffect(() => {
    if (companyData) {
      // 모든 태그 수집
      const allTags = new Map<string, Tag>();
      companyData.jobs.forEach((job: Job) => {
        job.applications.forEach((app: ApplicationSummary) => {
          app.tags.forEach((tag: Tag) => {
            if (!allTags.has(tag.id)) {
              allTags.set(tag.id, tag);
            }
          });
        });
      });
      setAvailableTags(Array.from(allTags.values()));
    }
  }, [companyData]);

  useEffect(() => {
    if (token && activeTab === "settings") {
      fetchSettings();
    }
  }, [token, activeTab]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await recruitmentAPI.getCompanyDashboard(token!);
  
      // API 데이터를 우리 타입으로 변환 (tags: string[] -> Tag[])
      const transformedData = {
        ...data,
        jobs: data.jobs.map((job: ApiJob) => ({
          ...job,
          applications: job.applications.map((app: ApiApplicationSummary) => ({
            ...app,
            tags: app.tags.map((tagName: string, index: number) => ({
              id: `temp-${tagName}-${index}`, // 임시 ID (실제로는 백엔드에서 제공해야 함)
              name: tagName,
              color: "#3B82F6", // 기본 색상
              usage_count: 1,
            })),
          })),
        })),
      };
  
      setCompanyData(transformedData);
  
      // 통계 계산
      const stats = calculateStats(transformedData.jobs);
      setStats(stats);
  
      // 첫 번째 채용공고 선택
      if (transformedData.jobs.length > 0) {
        setSelectedJob(transformedData.jobs[0].id);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      // 에러 메시지 추가
      alert("대시보드 데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && activeTab === "analytics") {
      fetchAnalyticsData();
    }
  }, [token, activeTab]);
  
  const fetchAnalyticsData = async () => {
    try {
      const data = await recruitmentAPI.getCompanyAnalytics(token!);
      setAnalyticsData(data);
    } catch (error) {
      console.error("Failed to fetch analytics data:", error);
    }
  };

  // 설정 불러오기 함수
  const fetchSettings = async () => {
    try {
      setSettingsLoading(true);
      const data = await recruitmentAPI.getCompanySettings(token!);
      setSettings(data);
      setAdditionalEmails(data.email_settings.additional_emails.join(", "));
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      setSettingsLoading(false);
    }
  };

  // 설정 저장 함수
  const handleSaveSettings = async () => {
    try {
      const additionalEmailsList = additionalEmails
        .split(",")
        .map((email) => email.trim())
        .filter((email) => email);

      await recruitmentAPI.updateCompanySettings(token!, {
        notification_settings: {
          new_applicant_alert:
            settings.notification_settings.new_applicant_alert,
          weekly_report: settings.notification_settings.weekly_report,
          deadline_reminder: settings.notification_settings.deadline_reminder,
        },
        email_settings: {
          primary_email: settings.email_settings.primary_email,
          additional_emails: additionalEmailsList,
        },
      });

      alert("설정이 저장되었습니다.");
    } catch (error) {
      console.error("Failed to save settings:", error);
      alert("설정 저장에 실패했습니다.");
    }
  };

  const handleScoreUpdate = (applicationId: string, newScore: number) => {
    // 로컬 상태 업데이트
    setCompanyData((prev: any) => ({
      ...prev,
      jobs: prev.jobs.map((job: Job) => ({
        ...job,
        applications: job.applications.map((app: ApplicationSummary) =>
          app.id === applicationId ? { ...app, jamesScore: newScore } : app
        ),
      })),
    }));
  };

  const calculateStats = (jobs: Job[]): CompanyStats => {
    const totalViews = jobs.reduce((sum, job) => sum + job.viewCount, 0);
    const totalApplications = jobs.reduce(
      (sum, job) => sum + job.applicationCount,
      0
    );
    const activeJobs = jobs.filter((job) => job.status === "active").length;

    // 주간 성장률 계산
    const weeklyGrowth = analyticsData?.weekly_growth || {
      views: 0,
      applications: 0,
    };

    return {
      totalViews,
      totalApplications,
      activeJobs,
      avgApplicationsPerJob:
        activeJobs > 0 ? Math.round(totalApplications / activeJobs) : 0,
      weeklyGrowth,
      conversionRate:
        totalViews > 0 ? (totalApplications / totalViews) * 100 : 0,
    };
  };

  const handleJobStatusToggle = async (
    jobId: string,
    currentStatus: string
  ) => {
    try {
      const newStatus = currentStatus === "active" ? "paused" : "active";
      await recruitmentAPI.updateJobStatus(jobId, newStatus);
      await fetchDashboardData(); // 데이터 새로고침
    } catch (error) {
      console.error("Failed to update job status:", error);
      alert("채용공고 상태 변경에 실패했습니다.");
    }
  };
  const handleApplicationStatusUpdate = async (
    applicationId: string,
    newStatus: string
  ) => {
    try {
      await recruitmentAPI.updateApplicationStatus(applicationId, newStatus);
      await fetchDashboardData();
    } catch (error) {
      console.error("Failed to update application status:", error);
    }
  };

  const handleBulkStatusUpdate = async (status: string) => {
    try {
      await Promise.all(
        selectedApplications.map((appId) =>
          recruitmentAPI.updateApplicationStatus(appId, status)
        )
      );
      setSelectedApplications([]);
      await fetchDashboardData();
    } catch (error) {
      console.error("Failed to update applications:", error);
    }
  };

  const handleTagsUpdate = (applicationId: string, tags: Tag[]) => {
    // 로컬 상태 업데이트
    setCompanyData((prev: any) => ({
      ...prev,
      jobs: prev.jobs.map((job: Job) => ({
        ...job,
        applications: job.applications.map((app: ApplicationSummary) =>
          app.id === applicationId ? { ...app, tags } : app
        ),
      })),
    }));
  };

  const toggleNoteExpansion = (applicationId: string) => {
    setExpandedNotes((prev) =>
      prev.includes(applicationId)
        ? prev.filter((id) => id !== applicationId)
        : [...prev, applicationId]
    );
  };

  const exportApplicationsToCSV = () => {
    const selectedJobData = companyData.jobs.find(
      (job: Job) => job.id === selectedJob
    );
    if (!selectedJobData) return;

    const csvContent = [
      ["이름", "이메일", "전화번호", "지원일", "상태", "점수", "태그"],
      ...selectedJobData.applications.map((app: ApplicationSummary) => [
        app.applicantName,
        app.applicantEmail,
        app.phoneNumber,
        formatDate(app.appliedDate),
        app.status,
        app.jamesScore || "",
        app.tags.map((t) => t.name).join(", "),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `지원자목록_${selectedJobData.position}_${
      new Date().toISOString().split("T")[0]
    }.csv`;
    link.click();
  };

  // James Score 계산 함수 수정
  const calculateJamesScore = async (applicationId: string) => {
    setCalculatingScores((prev) => new Set(prev).add(applicationId));
  
    try {
      // 단일 지원서는 calculateJamesScore 사용 (batchCalculateJamesScore가 아님)
      const response = await recruitmentAPI.calculateJamesScore(
        applicationId,
        { use_ai: true, recalculate: false }
      );
  
      // 로컬 상태 업데이트
      setCompanyData((prev: any) => ({
        ...prev,
        jobs: prev.jobs.map((job: Job) => ({
          ...job,
          applications: job.applications.map((app: ApplicationSummary) =>
            app.id === applicationId
              ? {
                  ...app,
                  jamesScore: response.james_score,
                  jamesScoreDetails: response.details,
                  jamesFeedback: response.feedback,
                }
              : app
          ),
        })),
      }));
  
      // 성공 메시지
      alert("James Score 계산이 완료되었습니다.");
    } catch (error) {
      console.error("James Score 계산 실패:", error);
      alert("점수 계산 중 오류가 발생했습니다.");
    } finally {
      setCalculatingScores((prev) => {
        const newSet = new Set(prev);
        newSet.delete(applicationId);
        return newSet;
      });
    }
  };

  const batchCalculateJamesScore = async () => {
    const selectedJobData = companyData.jobs.find(
      (job: Job) => job.id === selectedJob
    );
    if (!selectedJobData) return;
  
    setBatchCalculating(true);
  
    try {
      // 점수가 없는 지원서만 선택
      const applicationIds = selectedJobData.applications
        .filter((app: ApplicationSummary) => !app.jamesScore || app.jamesScore === 0)
        .map((app: ApplicationSummary) => app.id);
  
      if (applicationIds.length === 0) {
        alert("계산할 지원서가 없습니다.");
        return;
      }
  
      // recruitmentAPI 서비스 사용
      const response = await recruitmentAPI.batchCalculateJamesScore(
        selectedJob!,
        applicationIds
      );
  
      // 로컬 상태 업데이트
      const scoreMap = new Map(
        response.results.map((r: any) => [r.application_id, r.james_score])
      );
  
      setCompanyData((prev: any) => ({
        ...prev,
        jobs: prev.jobs.map((job: Job) =>
          job.id === selectedJob
            ? {
                ...job,
                applications: job.applications.map((app: ApplicationSummary) => {
                  const newScore = scoreMap.get(app.id);
                  return newScore !== undefined
                    ? { ...app, jamesScore: newScore }
                    : app;
                }),
              }
            : job
        ),
      }));
  
      alert(
        `${response.total_processed || response.success}개의 지원서 점수 계산이 완료되었습니다.`
      );
    } catch (error) {
      console.error("일괄 점수 계산 실패:", error);
      alert("일괄 점수 계산 중 오류가 발생했습니다.");
    } finally {
      setBatchCalculating(false);
    }
  };

  // 차트 데이터 준비
  const prepareChartData = () => {
    // analyticsData가 있으면 실제 데이터 사용
    if (analyticsData?.trend_data && analyticsData.trend_data.length > 0) {
      return analyticsData.trend_data.map((item: any) => ({
        date: item.date,
        views: item.views,
        applications: item.applications,
      }));
    }

    // analyticsData가 없으면 더미 데이터 반환
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return {
        date: date.toLocaleDateString("ko-KR", {
          month: "short",
          day: "numeric",
        }),
        views: Math.floor(Math.random() * 100) + 20,
        applications: Math.floor(Math.random() * 20) + 5,
      };
    });
    return last7Days;
  };

  const statusColors = {
    new: "bg-blue-100 text-blue-700",
    reviewed: "bg-yellow-100 text-yellow-700",
    shortlisted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    hired: "bg-purple-100 text-purple-700",
  };

  const statusLabels = {
    new: "신규",
    reviewed: "검토중",
    shortlisted: "서류합격",
    rejected: "불합격",
    hired: "최종합격",
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            접근 권한이 없습니다
          </h2>
          <p className="text-gray-600">
            이메일로 받은 링크를 통해 접속해주세요.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {companyData?.company.name}
                </h1>
                <p className="text-sm text-gray-600">채용 관리 대시보드</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
              </button>
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium flex items-center gap-2">
                <Shield className="w-4 h-4" />
                제임스 인증 기업
              </span>
              <button
                onClick={() => navigate("/services/recruitment/post")}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                새 채용공고 등록
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-6 border-b">
            {["overview", "applications", "analytics", "settings"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? "text-blue-600 border-blue-600"
                      : "text-gray-600 border-transparent hover:text-gray-900"
                  }`}
                >
                  {tab === "overview" && "개요"}
                  {tab === "applications" && "지원자 관리"}
                  {tab === "analytics" && "분석"}
                  {tab === "settings" && "설정"}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "overview" && stats && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">총 조회수</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {stats.totalViews}
                    </p>
                    <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />+
                      {stats.weeklyGrowth.views}%
                    </p>
                  </div>
                  <Eye className="w-8 h-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">총 지원자</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {stats.totalApplications}
                    </p>
                    <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />+
                      {stats.weeklyGrowth.applications}%
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">진행중 공고</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {stats.activeJobs}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      전체 {companyData.jobs.length}개
                    </p>
                  </div>
                  <FileText className="w-8 h-8 text-purple-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">전환율</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {stats.conversionRate.toFixed(1)}%
                    </p>
                    <p className="text-sm text-gray-500 mt-2">조회 → 지원</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-orange-500" />
                </div>
              </div>
            </div>

            {/* 최근 7일 트렌드 차트 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                최근 7일 트렌드
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={prepareChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#3B82F6"
                    name="조회수"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="applications"
                    stroke="#10B981"
                    name="지원자"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* 채용공고 목록 */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  채용공고 현황
                </h3>
              </div>
              <div className="divide-y">
                {companyData.jobs.map((job: Job) => (
                  <div key={job.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">
                            {job.position}
                          </h4>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              job.status === "active"
                                ? "bg-green-100 text-green-700"
                                : job.status === "paused"
                                ? "bg-yellow-100 text-yellow-700"
                                : job.status === "expired"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {job.status === "active"
                              ? "진행중"
                              : job.status === "paused"
                              ? "일시중지"
                              : job.status === "expired"
                              ? "마감"
                              : "대기중"}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              job.packageType === "premium"
                                ? "bg-purple-100 text-purple-700"
                                : job.packageType === "standard"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {job.packageType?.toUpperCase() || 'BASIC'}
                          </span>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            조회 {job.viewCount}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            지원 {job.applicationCount}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            D-{getDaysUntil(job.expiryDate)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleJobStatusToggle(job.id, job.status)
                          }
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {job.status === "active" ? (
                            <Pause className="w-5 h-5 text-gray-600" />
                          ) : (
                            <Play className="w-5 h-5 text-gray-600" />
                          )}
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/company/job/${job.id}/edit`)
                          }
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Edit className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "applications" && (
          <div className="space-y-6">
            {/* 채용공고 선택 */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <select
                value={selectedJob || ""}
                onChange={(e) => setSelectedJob(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {companyData.jobs.map((job: Job) => (
                  <option key={job.id} value={job.id}>
                    {job.position} ({job.applicationCount}명)
                  </option>
                ))}
              </select>
            </div>

            {/* 필터 및 검색 */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="이름, 이메일로 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">모든 상태</option>
                  <option value="new">신규</option>
                  <option value="reviewed">검토중</option>
                  <option value="shortlisted">서류합격</option>
                  <option value="rejected">불합격</option>
                  <option value="hired">최종합격</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="date">지원일순</option>
                  <option value="score">점수순</option>
                  <option value="name">이름순</option>
                </select>

                {/* 태그 필터 버튼 */}
                <button
                  onClick={() => setShowTagFilter(!showTagFilter)}
                  className={`px-4 py-2 border rounded-lg transition-colors flex items-center gap-2 ${
                    selectedTags.length > 0
                      ? "bg-blue-50 border-blue-300 text-blue-700"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <Filter className="w-5 h-5" />
                  태그 필터
                  {selectedTags.length > 0 && (
                    <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs">
                      {selectedTags.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={exportApplicationsToCSV}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  내보내기
                </button>

                <button
                  onClick={batchCalculateJamesScore}
                  disabled={batchCalculating}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {batchCalculating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      계산 중...
                    </>
                  ) : (
                    <>
                      <Calculator className="w-4 h-4" />
                      일괄 점수 계산
                    </>
                  )}
                </button>
              </div>

              {/* 태그 필터 드롭다운 */}
              {showTagFilter && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-700">태그로 필터링</h4>
                    {selectedTags.length > 0 && (
                      <button
                        onClick={() => setSelectedTags([])}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        모두 지우기
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => (
                      <button
                        key={tag.id}
                        onClick={() => {
                          if (selectedTags.includes(tag.id)) {
                            setSelectedTags(
                              selectedTags.filter((id) => id !== tag.id)
                            );
                          } else {
                            setSelectedTags([...selectedTags, tag.id]);
                          }
                        }}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                          selectedTags.includes(tag.id)
                            ? "bg-blue-600 text-white"
                            : "bg-white border border-gray-300 hover:bg-gray-50"
                        }`}
                        style={
                          !selectedTags.includes(tag.id)
                            ? {
                                borderColor: `${tag.color}40`,
                                color: tag.color,
                              }
                            : {}
                        }
                      >
                        {tag.name}
                        <span className="ml-1 text-xs opacity-70">
                          ({tag.usage_count})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 벌크 액션 */}
              {selectedApplications.length > 0 && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg flex items-center justify-between">
                  <span className="text-sm text-blue-700">
                    {selectedApplications.length}명 선택됨
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleBulkStatusUpdate("reviewed")}
                      className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700"
                    >
                      검토중으로 변경
                    </button>
                    <button
                      onClick={() => handleBulkStatusUpdate("shortlisted")}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                    >
                      서류합격 처리
                    </button>
                    <button
                      onClick={() => handleBulkStatusUpdate("rejected")}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                    >
                      불합격 처리
                    </button>
                    <button
                      onClick={batchCalculateJamesScore}
                      className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
                    >
                      점수 일괄 계산
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 지원자 목록 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            const selectedJobData = companyData.jobs.find(
                              (job: Job) => job.id === selectedJob
                            );
                            if (selectedJobData) {
                              setSelectedApplications(
                                selectedJobData.applications.map(
                                  (app: ApplicationSummary) => app.id
                                )
                              );
                            }
                          } else {
                            setSelectedApplications([]);
                          }
                        }}
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      지원자
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      지원일
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      상태
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      점수
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      태그
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      액션
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {companyData.jobs
                    .find((job: Job) => job.id === selectedJob)
                    ?.applications.filter((app: ApplicationSummary) => {
                      const matchesSearch =
                        searchQuery === "" ||
                        app.applicantName
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        app.applicantEmail
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase());

                      const matchesStatus =
                        filterStatus === "all" || app.status === filterStatus;

                      const matchesTags =
                        selectedTags.length === 0 ||
                        selectedTags.some((tagId) =>
                          app.tags.some((tag) => tag.id === tagId)
                        );

                      return matchesSearch && matchesStatus && matchesTags;
                    })
                    .sort((a: ApplicationSummary, b: ApplicationSummary) => {
                      if (sortBy === "date") {
                        return (
                          new Date(b.appliedDate).getTime() -
                          new Date(a.appliedDate).getTime()
                        );
                      } else if (sortBy === "score") {
                        return (b.jamesScore || 0) - (a.jamesScore || 0);
                      } else {
                        return a.applicantName.localeCompare(b.applicantName);
                      }
                    })
                    .map((app: ApplicationSummary) => (
                      <tr key={app.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedApplications.includes(app.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedApplications([
                                  ...selectedApplications,
                                  app.id,
                                ]);
                              } else {
                                setSelectedApplications(
                                  selectedApplications.filter(
                                    (id) => id !== app.id
                                  )
                                );
                              }
                            }}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {app.applicantName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {app.applicantEmail}
                            </div>
                            <div className="text-sm text-gray-500">
                              {app.phoneNumber}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDate(app.appliedDate)}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={app.status}
                            onChange={(e) =>
                              handleApplicationStatusUpdate(
                                app.id,
                                e.target.value
                              )
                            }
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              statusColors[app.status]
                            }`}
                          >
                            {Object.entries(statusLabels).map(
                              ([value, label]) => (
                                <option key={value} value={value}>
                                  {label}
                                </option>
                              )
                            )}
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          {app.jamesScore ? (
                            <JamesScoreDisplay
                              applicationId={app.id}
                              initialScore={app.jamesScore}
                              details={app.jamesScoreDetails}
                              feedback={app.jamesFeedback}
                              editable={true}
                              onScoreUpdate={(score) =>
                                handleScoreUpdate(app.id, score)
                              }
                            />
                          ) : (
                            <button
                              onClick={() => calculateJamesScore(app.id)}
                              disabled={calculatingScores.has(app.id)}
                              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 text-sm"
                            >
                              {calculatingScores.has(app.id) ? (
                                <>
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                  계산 중
                                </>
                              ) : (
                                <>
                                  <Calculator className="w-3 h-3" />
                                  점수 계산
                                </>
                              )}
                            </button>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <TagManager
                            applicationId={app.id}
                            initialTags={app.tags}
                            companyId={companyData.company.id}
                            onTagsUpdate={(tags) =>
                              handleTagsUpdate(app.id, tags)
                            }
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                window.open(app.resumeUrl, "_blank")
                              }
                              className="text-blue-600 hover:text-blue-700"
                            >
                              이력서
                            </button>
                            <button
                              onClick={() => toggleNoteExpansion(app.id)}
                              className="text-gray-600 hover:text-gray-700"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-700">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              {/* 확장된 노트 섹션 */}
              {companyData.jobs
                .find((job: Job) => job.id === selectedJob)
                ?.applications.map((app: ApplicationSummary) =>
                  expandedNotes.includes(app.id) ? (
                    <div
                      key={`note-${app.id}`}
                      className="border-t bg-gray-50 p-6"
                    >
                      <div className="max-w-4xl">
                        <NoteManager
                          applicationId={app.id}
                          currentUserId={user?.id || ""}
                        />
                      </div>
                    </div>
                  ) : null
                )}
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-6">
            {/* 상태별 지원자 분포 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  지원자 상태 분포
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={
                        analyticsData?.status_distribution || [
                          { name: "신규", value: 12, color: "#3B82F6" },
                          { name: "검토중", value: 8, color: "#EAB308" },
                          { name: "서류합격", value: 5, color: "#10B981" },
                          { name: "불합격", value: 3, color: "#EF4444" },
                          { name: "최종합격", value: 2, color: "#8B5CF6" },
                        ]
                      }
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }: any) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {(
                        analyticsData?.status_distribution || [
                          { color: "#3B82F6" },
                          { color: "#EAB308" },
                          { color: "#10B981" },
                          { color: "#EF4444" },
                          { color: "#8B5CF6" },
                        ]
                      ).map((entry: { color: string }, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  포지션별 성과
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={companyData.jobs.map((job: Job) => ({
                      position:
                        job.position.length > 15
                          ? job.position.substring(0, 15) + "..."
                          : job.position,
                      views: job.viewCount,
                      applications: job.applicationCount,
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="position"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="views" fill="#3B82F6" name="조회수" />
                    <Bar dataKey="applications" fill="#10B981" name="지원자" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 주요 지표 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                주요 채용 지표
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">3.2일</div>
                  <div className="text-sm text-gray-600 mt-1">
                    평균 서류 검토 시간
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">23.5%</div>
                  <div className="text-sm text-gray-600 mt-1">서류 합격률</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">15일</div>
                  <div className="text-sm text-gray-600 mt-1">
                    평균 채용 소요 기간
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6">
            {/* 알림 설정 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                알림 설정
              </h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">
                      새로운 지원자 알림
                    </div>
                    <div className="text-sm text-gray-600">
                      지원자가 발생하면 즉시 이메일로 알림을 받습니다
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings?.notification_settings?.new_applicant_alert || false}
                    onChange={(e) =>
                      setSettings((prev: any) => ({
                        ...prev,
                        notification_settings: {
                          ...prev.notification_settings,
                          new_applicant_alert: e.target.checked,
                        },
                      }))
                    }
                    className="toggle"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">주간 리포트</div>
                    <div className="text-sm text-gray-600">
                      매주 월요일 채용 현황 리포트를 받습니다
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings?.notification_settings?.weekly_report || false}
                    onChange={(e) =>
                      setSettings((prev: any) => ({
                        ...prev,
                        notification_settings: {
                          ...prev.notification_settings,
                          weekly_report: e.target.checked,
                        },
                      }))
                    }
                    className="toggle"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">
                      마감 임박 알림
                    </div>
                    <div className="text-sm text-gray-600">
                      채용공고 마감 3일 전 알림을 받습니다
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings?.notification_settings?.deadline_reminder || false}
                    onChange={(e) =>
                      setSettings((prev: any) => ({
                        ...prev,
                        notification_settings: {
                          ...prev.notification_settings,
                          deadline_reminder: e.target.checked,
                        },
                      }))
                    }
                    className="toggle"
                  />
                </label>
              </div>
            </div>

            {/* 수신 이메일 설정 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                수신 이메일 설정
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    주 담당자 이메일
                  </label>
                  <input
                    type="email"
                    value={settings?.email_settings?.primary_email || companyData?.company.email || ""}
                    onChange={(e) =>
                      setSettings((prev: any) => ({
                        ...prev,
                        email_settings: {
                          ...prev.email_settings,
                          primary_email: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    추가 수신자 (콤마로 구분)
                  </label>
                  <input
                    type="text"
                    value={additionalEmails}
                    onChange={(e) => setAdditionalEmails(e.target.value)}
                    placeholder="hr@company.com, manager@company.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                onClick={handleSaveSettings}
                disabled={settingsLoading}
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {settingsLoading ? "저장 중..." : "설정 저장"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyRecruitmentDashboard;