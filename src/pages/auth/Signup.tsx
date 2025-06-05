// src/pages/auth/Signup.tsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import TermsModal from "../../components/PolicyModal";
import PrivacyModal from "../../components/PolicyModal";
import MarketingModal from "../../components/PolicyModal";
import { getLatestTerms } from "../../data/policies/terms";
import { getLatestPrivacy } from "../../data/policies/privacy";
import { getLatestMarketing } from "../../data/policies/marketing";

const latestTerms = getLatestTerms();
const latestPrivacy = getLatestPrivacy();
const latestMarketing = getLatestMarketing();

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });
  const [loading, setLoading] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isMarketingOpen, setIsMarketingOpen] = useState(false);

  const signup = useAuthStore((state) => state.signup);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreements({
      ...agreements,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!agreements.terms || !agreements.privacy) {
      alert("필수 약관에 동의해주세요.");
      return;
    }

    setLoading(true);

    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      
      console.log("Signup successful, redirecting to login...");
      
      // 회원가입 성공 메시지와 함께 로그인 페이지로 이동
      alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      
      // window.location을 사용하여 확실하게 이동
      window.location.href = "/login";
      
    } catch (error: any) {
      console.error("Signup failed:", error);
      // 구체적인 에러 메시지 표시
      if (error.message) {
        alert(error.message);
      } else {
        alert("회원가입에 실패했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">회원가입</h2>
            <p className="mt-2 text-gray-600">
              이미 계정이 있으신가요?{" "}
              <Link to="/login" className="text-primary hover:underline">
                로그인
              </Link>
            </p>
          </div>

          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="이름"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                placeholder="이름을 입력하세요"
              />

              <Input
                label="이메일"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder="이메일을 입력하세요"
              />

              <Input
                label="비밀번호"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요"
                required
                autoComplete="new-password" // 추가
                className="..."
              />

              <Input
                label="비밀번호 확인"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="비밀번호를 다시 입력하세요"
                required
                autoComplete="new-password" // 추가
                className="..."
              />

              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    checked={agreements.terms}
                    onChange={handleAgreementChange}
                    className="mr-2"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    <button
                      type="button"
                      onClick={() => setIsTermsOpen(true)}
                      className="text-primary hover:underline"
                    >
                      이용약관
                    </button>
                    에 동의합니다.
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    checked={agreements.privacy}
                    onChange={handleAgreementChange}
                    className="mr-2"
                    required
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    <button
                      type="button"
                      onClick={() => setIsPrivacyOpen(true)}
                      className="text-primary hover:underline"
                    >
                      개인정보처리방침
                    </button>
                    에 동의합니다.
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="marketing"
                    name="marketing"
                    checked={agreements.marketing}
                    onChange={handleAgreementChange}
                    className="mr-2"
                  />
                  <label htmlFor="marketing" className="text-sm text-gray-600">
                    <button
                      type="button"
                      onClick={() => setIsMarketingOpen(true)}
                      className="text-primary hover:underline"
                    >
                      마케팅 수신
                    </button>
                    에 동의합니다.
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading}
              >
                {loading ? "가입 중..." : "회원가입"}
              </Button>
            </form>
          </Card>
        </div>
      </div>

      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        title="이용약관"
        content={latestTerms.content}
        version={latestTerms.version}
        lastUpdated={latestTerms.date}
      />
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        title="개인정보처리방침"
        content={latestPrivacy.content}
        version={latestPrivacy.version}
        lastUpdated={latestPrivacy.date}
      />
      <MarketingModal
        isOpen={isMarketingOpen}
        onClose={() => setIsMarketingOpen(false)}
        title="마케팅 수신"
        content={latestMarketing.content}
        version={latestMarketing.version}
        lastUpdated={latestMarketing.date}
      />
    </>
  );
}