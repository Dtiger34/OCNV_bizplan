#!/bin/bash
# PostToolUse: Tự động audit sau mỗi lệnh install
# Ý nghĩa bảo mật:
# - Sau khi thêm/cập nhật dependency, chạy audit ngay để phát hiện sớm
#   các lỗ hổng đã biết (theo cơ sở dữ liệu advisory/CVE).
# - Cơ chế này giúp cảnh báo nhanh mức độ rủi ro (high/critical)
#   để team quyết định rollback, pin version hoặc nâng cấp gói.
# - Lưu ý: audit không thay thế việc review source và lockfile,
#   đồng thời không phát hiện mọi zero-day hoặc mã độc chưa được công bố.

input=$(cat)
tool_name=$(echo "$input" | jq -r '.tool_name // ""')
command=$(echo "$input" | jq -r '.tool_input.command // ""')

# Chỉ xử lý khi hook được gọi từ Bash tool.
# Mục tiêu: tránh chạy audit cho các tool không liên quan.
if [ "$tool_name" != "Bash" ]; then
  exit 0
fi

# Cơ chế phát hiện lệnh cài package:
# - Dùng regex để match các lệnh phổ biến: npm install/i, yarn add, pnpm add/install.
# - Nếu không phải lệnh cài package thì bỏ qua để giảm nhiễu.
if ! echo "$command" | grep -qE 'npm (install|i )|yarn add|pnpm (add|install)'; then
  exit 0
fi

echo "🔍 Running dependency audit..."

# npm
if [ -f package-lock.json ]; then
  # Cách phát hiện:
  # - Chạy `npm audit --json` để lấy dữ liệu lỗ hổng ở dạng máy đọc được.
  # - Parse tổng số lỗ hổng từ metadata.vulnerabilities.total bằng jq.
  audit_output=$(npm audit --json 2>/dev/null)
  vuln_count=$(echo "$audit_output" | jq -r '.metadata.vulnerabilities.total // 0')

  # Cách cảnh báo:
  # - Nếu tổng số lỗ hổng > 0 thì in cảnh báo tổng quan.
  # - Tách riêng high/critical để team ưu tiên xử lý đúng mức độ.
  if [ "$vuln_count" -gt 0 ]; then
    high=$(echo "$audit_output" | jq -r '.metadata.vulnerabilities.high // 0')
    critical=$(echo "$audit_output" | jq -r '.metadata.vulnerabilities.critical // 0')
    echo "⚠️  npm audit: $vuln_count vulnerabilities ($critical critical, $high high)"
    echo "   Run 'npm audit' for details."

    # Nếu có critical thì đẩy mức cảnh báo mạnh hơn.
    if [ "$critical" -gt 0 ]; then
      echo "🔴 CRITICAL vulnerabilities detected! Review before proceeding."
    fi
  else
    # Không có advisory nào được ghi nhận tại thời điểm kiểm tra.
    echo "✅ No known vulnerabilities found."
  fi

# yarn
elif [ -f yarn.lock ]; then
  # yarn audit trả exit code != 0 khi có issue theo ngưỡng --level high.
  # Dùng OR để in thông báo cảnh báo thân thiện thay vì fail hook.
  yarn audit --level high 2>/dev/null || echo "⚠️  Vulnerabilities found! Run 'yarn audit' for details."

# pnpm
elif [ -f pnpm-lock.yaml ]; then
  # pnpm audit tương tự: cảnh báo khi có lỗ hổng từ mức high trở lên.
  pnpm audit --audit-level high 2>/dev/null || echo "⚠️  Vulnerabilities found! Run 'pnpm audit' for details."
fi

exit 0
