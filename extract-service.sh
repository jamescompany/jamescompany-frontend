#!/bin/bash

# extract-service.sh
# Usage: ./extract-service.sh [service-name]
# Example: ./extract-service.sh coffee-chat

SERVICE=$1

if [ -z "$SERVICE" ]; then
    echo "Usage: $0 [service-name]"
    echo "Available services:"
    echo "  - coffee-chat"
    echo "  - recruitment"
    echo "  - education"
    echo "  - bug-bounty"
    echo "  - auth"
    echo "  - insights"
    exit 1
fi

OUTPUT_FILE="service-${SERVICE}.txt"

echo "===== ${SERVICE^^} SERVICE EXTRACT =====" > $OUTPUT_FILE
echo "Generated at: $(date)" >> $OUTPUT_FILE
echo "======================================" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# 1. 관련 페이지 컴포넌트
echo "===== PAGE COMPONENTS =====" >> $OUTPUT_FILE
case $SERVICE in
    "coffee-chat")
        PATHS="src/pages/services/coffee-chat src/components/*Coffee* src/components/*Mentor*"
        ;;
    "recruitment")
        PATHS="src/pages/services/recruitment src/components/*Recruit* src/components/*Job* src/pages/company"
        ;;
    "education")
        PATHS="src/pages/services/education src/components/*Course* src/components/*Education*"
        ;;
    "bug-bounty")
        PATHS="src/pages/services/bug-bounty src/components/*Bug* src/components/*Bounty*"
        ;;
    "auth")
        PATHS="src/pages/auth src/components/auth src/services/auth* src/utils/oauth*"
        ;;
    "insights")
        PATHS="src/pages/insights src/components/*Insight* src/components/*Article*"
        ;;
esac

for path in $PATHS; do
    find $path -name "*.tsx" -o -name "*.ts" 2>/dev/null | while read file; do
        if [ -f "$file" ]; then
            echo "--- $file ---" >> $OUTPUT_FILE
            # 주요 부분만 추출 (import 제외, 함수와 JSX 위주)
            grep -v "^import\|^export.*from" "$file" | head -200 >> $OUTPUT_FILE
            echo "" >> $OUTPUT_FILE
        fi
    done
done

# 2. 관련 타입 정의
echo "===== RELATED TYPES =====" >> $OUTPUT_FILE
grep -r "interface\|type.*=\|enum" src/types --include="*.ts" | grep -i "$SERVICE" >> $OUTPUT_FILE 2>/dev/null
echo "" >> $OUTPUT_FILE

# 3. API 서비스 호출
echo "===== API CALLS =====" >> $OUTPUT_FILE
case $SERVICE in
    "coffee-chat")
        KEYWORDS="mentor\|booking\|calendar\|coffee"
        ;;
    "recruitment")
        KEYWORDS="job\|recruit\|company\|application"
        ;;
    "education")
        KEYWORDS="course\|lesson\|education\|module"
        ;;
    "bug-bounty")
        KEYWORDS="bug\|bounty\|report\|program"
        ;;
    "auth")
        KEYWORDS="auth\|login\|register\|oauth\|token"
        ;;
    "insights")
        KEYWORDS="insight\|article\|story\|notice"
        ;;
esac

grep -r "$KEYWORDS" src/services --include="*.ts" -A 5 -B 2 >> $OUTPUT_FILE 2>/dev/null
echo "" >> $OUTPUT_FILE

# 4. 관련 스토어 (상태 관리)
echo "===== STATE MANAGEMENT =====" >> $OUTPUT_FILE
if [ -d "src/stores" ]; then
    grep -r "$KEYWORDS" src/stores --include="*.ts" -A 10 -B 2 >> $OUTPUT_FILE 2>/dev/null
fi
echo "" >> $OUTPUT_FILE

# 5. 관련 설정
echo "===== CONFIGURATIONS =====" >> $OUTPUT_FILE
grep -r "$KEYWORDS" src/config --include="*.ts" >> $OUTPUT_FILE 2>/dev/null
echo "" >> $OUTPUT_FILE

# 6. 요약 정보
echo "===== SUMMARY =====" >> $OUTPUT_FILE
echo "Components found:" >> $OUTPUT_FILE
find $PATHS -name "*.tsx" 2>/dev/null | wc -l >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE
echo "API endpoints used:" >> $OUTPUT_FILE
grep -r "api\.\|axios\." $PATHS 2>/dev/null | grep -E "(get|post|put|delete)" | cut -d: -f2 | sort | uniq >> $OUTPUT_FILE

echo "✅ ${SERVICE} service extraction complete!"
echo "📁 Output file: $OUTPUT_FILE"
echo "📊 File size: $(ls -lh $OUTPUT_FILE | awk '{print $5}')"
echo ""
echo "Next step: Attach $OUTPUT_FILE to design ${SERVICE} backend APIs"