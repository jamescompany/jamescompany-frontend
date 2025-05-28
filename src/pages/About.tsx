export default function About() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">회사 소개</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            James Company는 소프트웨어 품질 향상을 위한 다양한 솔루션을 제공하는 
            기술 기반 스타트업입니다.
          </p>
          
          <h2 className="text-2xl font-semibold mt-12 mb-4">우리의 미션</h2>
          <p className="text-gray-700">
            모든 개발팀이 더 나은 소프트웨어를 만들 수 있도록 지원하고, 
            QA 문화를 혁신하는 것이 우리의 목표입니다.
          </p>
          
          <h2 className="text-2xl font-semibold mt-12 mb-4">핵심 가치</h2>
          <ul className="space-y-4 text-gray-700">
            <li>
              <strong>혁신:</strong> 끊임없이 새로운 방법을 탐구합니다
            </li>
            <li>
              <strong>품질:</strong> 최고의 품질을 추구합니다
            </li>
            <li>
              <strong>성장:</strong> 고객과 함께 성장합니다
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}