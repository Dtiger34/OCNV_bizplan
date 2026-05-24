---
name: generate-testcases
description: Dựa vào PRD, sinh test cases manual cho QA — tập trung vào happy path và các edge case quan trọng.
user-invocable: true
---

# Skill: Generate Test Cases

## Mục tiêu

Đọc PRD → sinh test cases đủ để QA test manual từng feature khi merge.

---

## Workflow

### Bước 1 — Đọc input

Đọc:

- `docs/requirement/PRD.md` — feature list với priority, acceptance criteria
  Nếu PRD chưa có, dừng lại và báo: "Chạy skill `analyze-req` trước."

---

### Bước 2 — Xác định phạm vi test

Từ PRD, xác định:

- **Test bắt buộc**: Must-have features + các edge case quan trọng
- **Test nên có**: Should-have features nếu còn thời gian
- **Bỏ qua**: bug cosmetic (UI pixel, typo nhỏ), case Won't-have

---

### Bước 3 — Sinh test cases

Với mỗi feature Must-have, sinh test cases theo format:

```
## [Tên feature]

| ID | Mô tả | Bước thực hiện | Kết quả mong đợi | Priority Notes | Priority |
|----|-------|---------------|-----------------|----------------|----------|
| TC-01 | Happy path: [action chính] | 1. ... / 2. ... / 3. ... | [expected] | ✓ (nếu có) | Critical |
| TC-02 | Sad path: [case lỗi chính] | 1. ... / 2. ... | [expected error] | | Normal |
```

**Nguyên tắc sinh test case:**

- Mỗi feature: 2–4 cases tối đa — 1 happy path chính, 1–2 sad path quan trọng
- Sad path chỉ test những lỗi user thực sự có thể gặp (form bỏ trống, sai quyền, data không tồn tại)
- **Không sinh**: test case cho validation chi tiết, UI style, performance — trừ khi có yêu cầu rõ ràng

---

### Bước 4 — Ghi `docs/test/testcases.md`

Ghi toàn bộ test cases vào file, nhóm theo feature, sắp xếp Must-have trước.

Thêm section tóm tắt đầu file:

```
## Tóm tắt
- Tổng số test cases: X
- Critical: X
- Normal: X
- Features covered: [danh sách]
```
