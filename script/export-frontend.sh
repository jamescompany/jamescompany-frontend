#!/bin/bash

OUTPUT_FILE="frontend-all.txt"

# 파일 초기화
echo "=== FRONTEND PROJECT EXPORT ===" > $OUTPUT_FILE
echo "=== Generated at: $(date) ===" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# 프로젝트 구조 출력
echo "=== PROJECT STRUCTURE ===" >> $OUTPUT_FILE
tree -I 'node_modules|dist|.git' >> $OUTPUT_FILE 2>/dev/null || find . -type f -name "*.tsx" -o -name "*.ts" -o -name "*.css" -o -name "*.json" | grep -v node_modules | sort >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# 설정 파일들
config_files=(
  "package.json"
  "tsconfig.json"
  "vite.config.ts"
  "tailwind.config.js"
  ".env"
  "index.html"
)

for file in "${config_files[@]}"; do
  if [ -f "$file" ]; then
    echo "" >> $OUTPUT_FILE
    echo "=== $file ===" >> $OUTPUT_FILE
    echo '```' >> $OUTPUT_FILE
    cat "$file" >> $OUTPUT_FILE
    echo '```' >> $OUTPUT_FILE
  fi
done

# src 디렉토리의 모든 파일
echo "" >> $OUTPUT_FILE
echo "=== SOURCE FILES ===" >> $OUTPUT_FILE

# 모든 .ts, .tsx, .css 파일 찾기
find src -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.css" \) | sort | while read -r file; do
  echo "" >> $OUTPUT_FILE
  echo "=== $file ===" >> $OUTPUT_FILE
  echo '```' >> $OUTPUT_FILE
  cat "$file" >> $OUTPUT_FILE
  echo '```' >> $OUTPUT_FILE
done

# public 디렉토리 파일들 (있다면)
if [ -d "public" ]; then
  echo "" >> $OUTPUT_FILE
  echo "=== PUBLIC FILES ===" >> $OUTPUT_FILE
  find public -type f ! -name "*.png" ! -name "*.jpg" ! -name "*.ico" | sort | while read -r file; do
    echo "" >> $OUTPUT_FILE
    echo "=== $file ===" >> $OUTPUT_FILE
    echo '```' >> $OUTPUT_FILE
    cat "$file" >> $OUTPUT_FILE
    echo '```' >> $OUTPUT_FILE
  done
fi

echo "" >> $OUTPUT_FILE
echo "=== END OF EXPORT ===" >> $OUTPUT_FILE

# 파일 크기 확인
FILE_SIZE=$(ls -lh $OUTPUT_FILE | awk '{print $5}')
echo "✅ Export complete!"
echo "📄 File: $OUTPUT_FILE"
echo "📊 Size: $FILE_SIZE"
echo "📁 Total files included: $(grep -c "^=== " $OUTPUT_FILE)"
