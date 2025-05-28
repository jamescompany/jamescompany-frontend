export default function About() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-12 text-center">
          James Company 소개
        </h1>

        {/* 비전 & 미션 */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              🎯 우리의 비전
            </h2>
            <p className="text-gray-700">
              모든 QA 엔지니어가 자신만의 도구와 기준으로 품질을 설계할 수 있는
              세상을 만듭니다.
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              🚀 우리의 미션
            </h2>
            <p className="text-gray-700">
              자동화와 AI를 활용해 반복적인 QA 업무를 줄이고, 더 전략적이고
              창의적인 품질 활동에 집중할 수 있도록 돕습니다.
            </p>
          </div>
        </div>

        {/* 해결하는 문제 */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            🧩 우리는 어떤 문제를 해결하나요?
          </h2>
          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <span className="text-red-500 mr-3">•</span>
              <p className="text-gray-700">
                QA 업무가 단순 반복 작업에 머무르는 현실
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-red-500 mr-3">•</span>
              <p className="text-gray-700">
                조직 내에서 QA의 영향력이 제한적인 구조
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-red-500 mr-3">•</span>
              <p className="text-gray-700">
                각 팀마다 다른 품질 기준과 커뮤니케이션의 어려움
              </p>
            </div>
          </div>
          <p className="text-lg font-semibold text-primary text-center">
            James Company는 이 문제를 해결하기 위한 도구와 문화적 대안을
            제시합니다.
          </p>
        </div>

        {/* 제품 소개 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">
              ✅ 체크리스트 자동 생성 플랫폼
            </h3>
            <p className="text-gray-600">CaseMaker (2025년 연말 출시 예정)</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">
              📄 문서 기반 체크리스트 항목 추출
            </h3>
            <p className="text-gray-600">
              CaseMaker 기능 확장 (2026년 상반기 예정)
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">
              🤖 테스트 자동화 플로우 추천
            </h3>
            <p className="text-gray-600">AutoQA (가칭, 2026년 하반기 예정)</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">
              📊 QA 지표 시각화 대시보드
            </h3>
            <p className="text-gray-600">QAlytics (가칭, 2026년 하반기 예정)</p>
          </div>
        </div>

        {/* 창업 스토리 */}
        <div className="mb-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-6">📖 창업 스토리</h2>
          <blockquote className="text-xl text-gray-700 italic mb-4">
            "테스트는 했는데, 왜 이런 문제가 또 발생하죠?"
          </blockquote>
          <p className="text-gray-700 mb-4">
            이 질문은 10년 넘게 QA 조직을 만들고 이끌어오며 수도 없이 들었던
            말입니다.
          </p>
          <p className="text-gray-700">
            James Company는 단순한 테스트 도구가 아닌,{" "}
            <span className="font-semibold text-primary">
              'QA의 위상을 재정의하는 전략적 품질 플랫폼'
            </span>
            으로 이 문제에 답하고자 합니다.
          </p>
        </div>

        {/* 대표 인사말 */}
        <div className="mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold mb-8 text-center">
              👋 대표 인사말
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                    {/* 실제 사진이 있을 경우: 
                    <img src="/path-to-image.jpg" alt="James" className="w-full h-full object-cover" />
                    */}
                    <img
                      src="/james.jpg"
                      alt="James"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-center font-semibold text-lg">James</p>
                    <p className="text-center text-gray-600 text-sm mb-3">
                      Founder & CEO
                    </p>
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>現 제임스컴퍼니 Founder</p>
                      <p>現 오픈엣지스퀘어 QA Lead</p>
                      <p>前 에이슬립 QA Lead</p>
                      <p>前 뤼이드 Head of QA</p>
                      <p className="pt-2 text-gray-600">
                        現 한국소프트웨어산업협회(정회원)
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 mb-4">
                    <br />
                    안녕하세요, James Company 대표 James입니다.
                  </p>
                  <p className="text-gray-700 mb-4">
                    저는 지난 15년간 다양한 IT 기업에서 QA 엔지니어로, 그리고 QA
                    조직의 리더로 일해왔습니다. 그 시간 동안 늘 고민했던 것은
                    "어떻게 하면 QA가 단순한 검증자가 아닌, 제품 품질의 설계자가
                    될 수 있을까?"였습니다.
                  </p>
                  <p className="text-gray-700 mb-4">
                    James Company는 이 고민에서 시작되었습니다. 우리는 QA
                    엔지니어들이 반복적인 작업에서 벗어나 더 창의적이고 전략적인
                    일에 집중할 수 있도록 돕고자 합니다.
                  </p>
                  <p className="text-gray-700 font-semibold">
                    여러분의 품질 여정에 James Company가 함께하겠습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 사용자 목소리 */}
        <div className="mb-16 bg-blue-50 rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-6">👥 사용자 목소리</h2>
          <blockquote className="text-lg text-gray-700 italic">
            "매번 테스트 케이스를 새로 만들기엔 시간이 부족하고, 항상 '이게 맞는
            방향일까' 고민했습니다. 이제 James Company가 도와줍니다."
          </blockquote>
        </div>

        {/* 문화와 철학 */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            💡 우리의 문화와 철학
          </h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <span className="text-2xl mr-4">🚀</span>
              <p className="text-lg text-gray-700">
                빠르게 시도하고, 투명하게 공유합니다.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-4">🎯</span>
              <p className="text-lg text-gray-700">
                품질은 단순한 '테스트'가 아니라 제품의 전략 그 자체라 믿습니다.
              </p>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-4">💪</span>
              <p className="text-lg text-gray-700">
                QA 엔지니어가 더 많은 영향을 끼칠 수 있도록 돕는 것이 우리의
                존재 이유입니다.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-primary text-white rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">🙌 함께해요</h2>
          <p className="text-xl mb-8">
            QA가 단순 테스트가 아닌, 전략의 중심이 되는 세상.
            <br />
            <span className="font-bold">
              James Company와 함께 만들어가세요.
            </span>
          </p>
          <a
            href="mailto:founder@jamescompany.kr"
            className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            👉 문의하기
          </a>
        </div>
      </div>
    </div>
  );
}
