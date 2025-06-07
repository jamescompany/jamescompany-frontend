#!/bin/bash

echo "🚀 Updating Frontend to connect with Backend API..."

# 1. axios 설치
echo "📦 Installing axios..."
yarn add axios

# 2. API 서비스 파일 생성
echo "📁 Creating API service files..."
mkdir -p src/services

# 3. 환경변수 파일 생성
echo "📝 Creating environment files..."
cat > .env.example << 'EOF'
# API URL
VITE_API_URL=http://localhost:8000

# OAuth
VITE_IMWEB_CLIENT_ID=your-imweb-client-id
VITE_IMWEB_REDIRECT_URI=http://localhost:5173/auth/callback/imweb
EOF

# .env 파일이 없으면 복사
if [ ! -f .env ]; then
  cp .env.example .env
  echo "✅ Created .env file from .env.example"
fi

echo "✅ Frontend update complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update the store files (authStore.ts, serviceStore.ts) with the updated versions"
echo "2. Update the API service files (qaMentorApi.ts, worrySolverApi.ts)"
echo "3. Update Login.tsx and App.tsx components"
echo "4. Configure your .env file with actual values"
echo "5. Make sure your backend is running on http://localhost:8000"
echo ""
echo "🎯 To run the frontend:"
echo "   yarn dev"