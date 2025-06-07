#!/bin/bash

# extract-frontend-core.sh

OUTPUT_FILE="frontend-core.txt"

echo "===== FRONTEND CORE FOR BACKEND DESIGN =====" > $OUTPUT_FILE
echo "Generated at: $(date)" >> $OUTPUT_FILE
echo "============================================" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# 1. 프로젝트 구조 (컴팩트하게)
echo "===== PROJECT STRUCTURE =====" >> $OUTPUT_FILE
tree src -I 'assets|*.svg|*.css|*.png|*.jpg' -P '*.tsx|*.ts' --dirsfirst -L 3 >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# 2. 타입 정의 (백엔드 설계의 핵심)
echo "===== TYPE DEFINITIONS =====" >> $OUTPUT_FILE
if [ -d "src/types" ]; then
    find src/types -name "*.ts" -o -name "*.d.ts" | while read file; do
        echo "--- $file ---" >> $OUTPUT_FILE
        cat "$file" >> $OUTPUT_FILE
        echo "" >> $OUTPUT_FILE
    done
fi

# 3. API 서비스 (엔드포인트와 요청/응답 구조)
echo "===== API SERVICES =====" >> $OUTPUT_FILE
if [ -d "src/services" ]; then
    find src/services -name "*.ts" | while read file; do
        echo "--- $file ---" >> $OUTPUT_FILE
        # API 호출 부분만 추출
        grep -A 5 -B 2 "axios\|fetch\|api\." "$file" >> $OUTPUT_FILE
        echo "" >> $OUTPUT_FILE
    done
fi

# 4. 스토어 (상태 관리 - 데이터 구조 파악)
echo "===== STATE MANAGEMENT (Stores) =====" >> $OUTPUT_FILE
if [ -d "src/stores" ]; then
    find src/stores -name "*.ts" | while read file; do
        echo "--- $file ---" >> $OUTPUT_FILE
        # 인터페이스와 타입만 추출
        grep -A 10 "interface\|type\|export" "$file" >> $OUTPUT_FILE
        echo "" >> $OUTPUT_FILE
    done
fi

# 5. API 설정
echo "===== API CONFIGURATION =====" >> $OUTPUT_FILE
for dir in src/config src/utils; do
    if [ -d "$dir" ]; then
        find "$dir" -name "*api*.ts" -o -name "*config*.ts" | while read file; do
            echo "--- $file ---" >> $OUTPUT_FILE
            cat "$file" >> $OUTPUT_FILE
            echo "" >> $OUTPUT_FILE
        done
    fi
done

# 6. 각 서비스별 API 호출 요약
echo "===== SERVICE API CALLS SUMMARY =====" >> $OUTPUT_FILE
echo "Coffee Chat APIs:" >> $OUTPUT_FILE
find src/pages/services/coffee-chat -name "*.tsx" -o -name "*.ts" | xargs grep -h "api\.\|axios\.\|fetch(" | grep -v "import" | sort | uniq >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

echo "Recruitment APIs:" >> $OUTPUT_FILE
find src/pages/services/recruitment -name "*.tsx" -o -name "*.ts" 2>/dev/null | xargs grep -h "api\.\|axios\.\|fetch(" | grep -v "import" | sort | uniq >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# 7. 환경 변수 (API URLs)
echo "===== ENVIRONMENT VARIABLES =====" >> $OUTPUT_FILE
find . -name ".env*" -not -path "./node_modules/*" | while read file; do
    echo "From $file:" >> $OUTPUT_FILE
    grep -E "VITE_.*API|VITE_.*URL|REACT_APP.*API|REACT_APP.*URL" "$file" | sed 's/=.*/=***/' >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
done

# 8. 라우트 구조 (백엔드 엔드포인트 설계 참고)
echo "===== ROUTE STRUCTURE =====" >> $OUTPUT_FILE
if [ -f "src/App.tsx" ]; then
    echo "Routes from App.tsx:" >> $OUTPUT_FILE
    grep -E "path=|element=|Route" src/App.tsx | grep -v "import" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
fi

echo "✅ Frontend core extraction complete!"
echo "📁 Output file: $OUTPUT_FILE"
echo "📊 File size: $(ls -lh $OUTPUT_FILE | awk '{print $5}')"
echo ""
echo "This file contains:"
echo "  - Type definitions (for DB schema design)"
echo "  - API service calls (for endpoint design)"
echo "  - State structure (for response format)"
echo "  - Route structure (for API path design)"