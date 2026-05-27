---
name: review-code
description: Review code sau khi implement một feature — kiểm tra correctness, security, convention và đối chiếu với design docs.
user-invocable: true
---

# Skill: Review Code

## Mục tiêu

Review nhanh code của 1 feature vừa implement — tập trung vào correctness và security, không nitpick style.

---

## Workflow

### Bước 1 — Xác định scope review

Hỏi: "Review feature nào / branch nào / PR nào? (BE, FE, hay cả hai?)"

Đọc — tuỳ scope:

- Code thay đổi (`git diff develop...HEAD` hoặc file cụ thể)
- `docs/design/api-contract.md` — đối chiếu BE implementation
- `docs/design/ui-screens.md` — đối chiếu FE implementation
- `.claude/rules/backend.md` — nếu scope có BE
- `.claude/rules/frontend.md` — nếu scope có FE

---

### Bước 2a — Review theo checklist

Kiểm tra theo thứ tự ưu tiên:

**Critical (phải fix trước merge):**

- [ ] Logic có đúng với spec trong api-contract / ui-screens không?
- [ ] Có lỗ hổng bảo mật không? (SQL injection, hardcode secret, expose stack trace, missing auth)
- [ ] Edge case quan trọng có được xử lý không? (null, empty, unauthorized)
- [ ] Test có cover happy path và error case chính không?
- [ ] Không còn mock data / TODO chưa giải quyết trong production code

**Rule coding:**

- [ ] Nếu scope có BE, code có tuân thủ toàn bộ quy tắc trong `.claude/rules/backend.md` không? (đọc file, đối chiếu trực tiếp)
- [ ] Nếu scope có FE, code có tuân thủ toàn bộ quy tắc trong `.claude/rules/frontend.md` không? (đọc file, đối chiếu trực tiếp)
- [ ] Nếu có `docs/design/architecture.md`: tên component trong diagram có khớp ≥ 80% với tên folder/class thực tế trong code không?

**Normal (nên fix, không block merge):**

- [ ] Tên biến/hàm tự mô tả — ≥ 80% identifier có ≥ 2 từ ý nghĩa (random pick 3 file business logic, đếm thô)
- [ ] Tên file đúng convention theo `CLAUDE.md`
- [ ] Không có duplicate logic > 20 dòng
- [ ] Không có magic number / hardcode string
- [ ] AI attribution header có đầy đủ không?

**Bỏ qua:**

- Style, formatting (Prettier đã xử lý)
- Nitpick về naming khi đã rõ nghĩa
- Refactor không liên quan feature hiện tại

---

### Bước 2b — Free-style review

Sau khi chạy xong checklist, đọc lại toàn bộ code diff một lần nữa với góc nhìn tự do — không bị ràng buộc bởi checklist. Tìm những vấn đề mà checklist không bắt được:

- Logic có "mùi" gì bất thường không? (flow kỳ lạ, điều kiện ngược, side effect ẩn)
- Có đoạn nào đọc xong vẫn thấy mơ hồ — không chắc nó đang làm gì không?
- Có assumption ngầm nào về data/state mà có thể sai trong production không?
- Có race condition, timing issue, hoặc ordering dependency tinh vi không?
- Nhìn tổng thể feature — người dùng thực sự dùng flow này có bị stuck ở đâu không?

Ghi nhận bất kỳ điều gì đáng chú ý, kể cả khi chưa chắc là bug. Phân loại vào Critical / Normal / Observation như bình thường.

---

### Bước 3 — Output review

Báo cáo vào folder `docs/review-report/<scope>_<tên_task>.md` theo format:

```
## Review: [Feature / Branch]

### ✅ Approved / ❌ Cần fix trước merge

**Critical issues** (X):
- [File:Line] [mô tả vấn đề + gợi ý fix]

**Normal issues** (X):
- [File:Line] [mô tả]

**Nhận xét kỹ thuật** (để dev trả lời reviewer):
- [Điểm kỹ thuật đáng chú ý trong implementation này]
```

Nếu không có Critical issue → **Approved**, Lead có thể merge.
Nếu có Critical issue → **Request changes**, list rõ cần fix gì.

---

### Bước 4 — Log lỗi AI (chỉ khi có Critical issue)

Với mỗi Critical issue, append vào `AI-Log/shared/detect-AI-error.md` theo template:

```markdown
## [Mô tả ngắn lỗi]

> Phát hiện bởi: /review-code
> File / Layer: [File]

### Output AI (sai)

[Tóm tắt đoạn code AI sinh ra — chỉ phần liên quan]

### Tại sao sai

[Root cause: thiếu constraint trong prompt? AI assume sai context? Edge case không cover?]

### Cách fix

[Mô tả cách sửa]

### Bài học

[Áp dụng cho loại task tương tự]
```

---

## Nguyên tắc

- Review tập trung vào **correctness và security** — không block merge vì style
- Mỗi critical issue phải có gợi ý fix cụ thể, không chỉ báo lỗi
- Không tự sửa code — chỉ comment, để dev tự fix và hiểu
