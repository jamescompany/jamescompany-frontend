#!/bin/bash

# export-frontend.sh

OUTPUT_FILE="frontend-all.txt"

# 파일 헤더 추가
echo "===== FRONTEND CODE EXPORT =====" > $OUTPUT_FILE
echo "Generated at: $(date)" >> $OUTPUT_FILE
echo "================================" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# 프로젝트 구조 추가
echo "===== PROJECT STRUCTURE =====" >> $OUTPUT_FILE
tree -I 'node_modules|dist|build|coverage|.git' >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# 중요 파일들 내용 추가
find . -type f \( \
    -name "*.tsx" -o \
    -name "*.ts" -o \
    -name "*.jsx" -o \
    -name "*.js" -o \
    -name "*.json" -o \
    -name "*.css" -o \
    -name "*.md" \
    \) \
    -not -path "./node_modules/*" \
    -not -path "./dist/*" \
    -not -path "./build/*" \
    -not -path "./.git/*" \
    -not -path "./coverage/*" \
    | while read file; do
    echo "===== FILE: $file =====" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
    cat "$file" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
    echo "" >> $OUTPUT_FILE
done

echo "✅ Export complete! Check $OUTPUT_FILE"
echo "📁 File size: $(ls -lh $OUTPUT_FILE | awk '{print $5}')"