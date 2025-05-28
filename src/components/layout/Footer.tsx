export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">James Company</h3>
            <p className="text-gray-400">혁신적인 솔루션을 제공합니다</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">서비스</h4>
            <ul className="space-y-2 text-gray-400">
              <li>커피챗</li>
              <li>CaseMaker</li>
              <li>교육 서비스</li>
              <li>Bug Bounty Arena</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">회사</h4>
            <ul className="space-y-2 text-gray-400">
              <li>회사 소개</li>
              <li>인사이트</li>
              <li>문의하기</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">연락처</h4>
            <p className="text-gray-400">contact@jamescompany.com</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 James Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}