#!/bin/bash
# PreToolUse: Chặn lệnh install không dùng --ignore-scripts
# Ý nghĩa bảo mật:
# - Khi chạy install, package manager có thể tự động chạy lifecycle scripts
#   (preinstall/install/postinstall/prepare).
# - Các script này có thể thực thi lệnh tùy ý trên máy local/CI,
#   dẫn tới nguy cơ supply chain attack nếu dependency bị cài mã độc.
# - Bắt buộc --ignore-scripts giúp giảm bề mặt tấn công mặc định;
#   chỉ bật scripts khi thật sự cần và đã review nguồn phụ thuộc.

input=$(cat)
tool_name=$(echo "$input" | jq -r '.tool_name // ""')
command=$(echo "$input" | jq -r '.tool_input.command // ""')

if [ "$tool_name" != "Bash" ]; then
  exit 0
fi

# Chỉ check lệnh npm/yarn/pnpm install
if ! echo "$command" | grep -qE 'npm (install|i )|yarn add|pnpm (add|install)'; then
  exit 0
fi

# Cho phép nếu đã dùng --ignore-scripts hoặc --skip-builds (yarn berry)
if echo "$command" | grep -qE '\-\-ignore-scripts|\-\-skip-builds'; then
  exit 0
fi

# Cho phép npm ci (thường dùng trong CI, lockfile đã review)
if echo "$command" | grep -qE 'npm ci'; then
  exit 0
fi

echo '{"error": "BLOCKED: Package install without --ignore-scripts. Postinstall scripts are the #1 supply chain attack vector. Rerun with --ignore-scripts."}' >&2
exit 2
