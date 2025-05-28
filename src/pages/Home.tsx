import { Link } from 'react-router-dom'
import { ArrowRight, Coffee, Code, GraduationCap, Bug } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

export default function Home() {
  const services = [
    {
      icon: <Coffee className="w-8 h-8 text-primary" />,
      title: '커피챗',
      description: 'Google Calendar와 연동되는\n1:1 상담 서비스',
      link: '/services/coffee-chat'
    },
    {
      icon: <Code className="w-8 h-8 text-primary" />,
      title: 'CaseMaker',
      description: '테스트 케이스 자동 생성\n웹 서비스',
      link: '/services/casemaker'
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-primary" />,
      title: '교육 서비스',
      description: 'QA/SDET 전문 교육 프로그램',
      link: '/services/education'
    },
    {
      icon: <Bug className="w-8 h-8 text-primary" />,
      title: 'Bug Bounty Arena',
      description: '앱 출시 전 베타 테스트 서비스',
      link: '/services/bug-bounty'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            다양한 형태의 성장을 돕습니다
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            QA 자동화부터 교육, 컨설팅까지 James Company와 함께 <br />
            더 나은 소프트웨어 품질을 만들어가세요.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/services">
              <Button size="lg">서비스 둘러보기</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">문의하기</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">우리의 서비스</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link key={index} to={service.link}>
                <Card hoverable className="h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4 text-center max-w-[200px] mx-auto whitespace-pre-line">
                      {service.description}
                    </p>
                    <span className="text-primary flex items-center">
                      자세히 보기 <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            프로젝트를 시작할 준비가 되셨나요?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            전문가와 함께 최적의 솔루션을 찾아보세요
          </p>
          <Link to="/contact">
            <Button variant="secondary" size="lg">
              지금 상담 신청하기
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}