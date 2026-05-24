---
name: fixbug
description: Fix bug từ biên bản review — đánh giá từng điểm review, xác nhận với user, rồi fix và update test liên quan.
user-invocable: true
---

# Skill: Fix Bug

## Mục tiêu

Xử lý các issue từ biên bản review một cách có kiểm soát: đánh giá đúng/sai từng điểm, confirm với user trước khi fix, cập nhật test liên quan sau khi sửa.

---

## Nguyên tắc quan trọng

**Không phải mọi điểm trong biên bản review đều đúng.** Reviewer có thể nhầm context, hiểu sai spec, hoặc đề xuất cách fix không phù hợp với kiến trúc hiện tại. Với mỗi issue, cần đánh giá độc lập và phản hồi rõ ràng trước khi hành động.

---

## Workflow

### Bước 1 — Xác định scope

Hỏi:

- "File biên bản review là gì? (path đến `docs/review-report/*.md`)"
- "Scope fix là BE, FE, hay cả hai?"

Đọc — tuỳ scope:

- File biên bản review được chỉ định
- Code file liên quan đến các issue được báo cáo
- `docs/design/api-contract.md` — nếu issue liên quan BE
- `docs/design/ui-screens.md` — nếu issue liên quan FE
- `docs/design/db-schema.md` — nếu issue liên quan DB / Prisma
- `.claude/rules/backend.md` — nếu scope có BE
- `.claude/rules/frontend.md` — nếu scope có FE
- `.claude/rules/testing.md` — nếu issue liên quan test

---

### Bước 2 — Phân tích và phản hồi từng điểm review

Với **mỗi issue** trong biên bản, đánh giá và phân loại:

- ✅ **Đúng — cần fix**: Issue hợp lệ, mô tả rõ vấn đề thực tế trong code.
- ⚠️ **Đúng một phần — cần clarify**: Issue có cơ sở nhưng cách fix đề xuất không phù hợp, hoặc cần thêm context từ user.
- ❌ **Không đúng — bỏ qua**: Issue dựa trên hiểu lầm spec, sai context, hoặc mâu thuẫn với design docs.

Trình bày bảng phân tích theo format:

```
## Phân tích biên bản review

| # | Issue (File:Line) | Đánh giá | Lý do |
|---|---|---|---|
| 1 | [mô tả ngắn] | ✅ Đúng | [lý do] |
| 2 | [mô tả ngắn] | ❌ Không đúng | [reviewer hiểu nhầm X vì...] |
| 3 | [mô tả ngắn] | ⚠️ Cần clarify | [điểm còn mơ hồ là...] |
```

Sau bảng, liệt kê riêng các câu hỏi clarify (nếu có) — hỏi từng nhóm, không dump hết một lúc.

---

### Bước 3 — Chờ user confirm

Sau khi trình bày phân tích → **dừng lại**, chờ user:

- Đồng ý / điều chỉnh đánh giá của từng issue
- Trả lời các câu hỏi clarify
- Xác nhận danh sách issue sẽ fix

Không tự ý bắt đầu fix trước khi có confirm từ user.

---

### Bước 4 — Confirm kỹ thuật (nếu cần)

Với mỗi issue được confirm là fix, nếu cách sửa yêu cầu kỹ thuật không hiển nhiên (ví dụ: thay đổi transaction scope, refactor layer, thêm index, thay state management approach...) → trình bày 2–3 phương án kèm tradeoff, đề xuất phương án cụ thể, chờ user chọn trước khi code.

---

### Bước 5 — Fix

Fix từng issue đã được confirm theo thứ tự ưu tiên: Critical trước, Normal sau.

Tuân thủ rules tương ứng trong suốt quá trình:

- BE: `.claude/rules/backend.md`
- FE: `.claude/rules/frontend.md`

**Yêu cầu:**

- Không fix quá scope issue được confirm — không refactor ngoài lề
- Không introduce thêm abstraction hoặc dependency mới mà không confirm
- Nếu khi fix phát hiện thêm issue liên quan → báo cáo riêng, không tự fix luôn

---

### Bước 6 — Update unit test liên quan

Sau khi fix xong, rà soát test liên quan đến code vừa thay đổi:

- Nếu fix thay đổi behavior → cập nhật test case cũ để phản ánh behavior mới
- Nếu fix cover thêm edge case → bổ sung test case mới
- Nếu fix xóa code → xóa luôn test case tương ứng (không để dead test)
- Kiểm tra test name vẫn mô tả đúng behavior sau fix

---

### Bước 7 — Verify

Chạy build + test, fix nếu fail.

---

### Bước 8 — Báo cáo kết quả

```
## Kết quả fix: [Tên feature / branch]

### Đã fix (X issue)
- [Issue 1 - File:Line]: [mô tả fix]
- [Issue 2 - File:Line]: [mô tả fix]

### Bỏ qua (X issue)
- [Issue N]: [lý do bỏ qua]

### Test đã cập nhật
- [File test]: [thêm / sửa / xóa case nào]

### Lưu ý
- [Điểm đặc biệt nếu technical review hỏi về quyết định kỹ thuật]
```

---

### Bước 9 — Commit

Gợi ý commit message theo conventional commits + `[AI-Assisted: Claude Code]`, hỏi: "Bạn muốn commit với message này không?"

Không tự commit — chờ user confirm.

---

## Nguyên tắc

- Đánh giá độc lập từng issue trước khi fix — không fix blindly theo biên bản
- Mỗi quyết định bỏ qua issue phải có lý do rõ ràng dựa trên spec hoặc design docs
- Kỹ thuật thay đổi phải confirm trước — không tự quyết định
- Fix xong phải có test xanh — không để test fail hoặc dead test
- Không mở rộng scope fix quá những gì đã confirm với user
