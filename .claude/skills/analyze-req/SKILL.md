---
name: analyze-req
description: Phân tích đề bài, làm rõ requirements qua hội thoại từng nhóm chức năng, rồi tổng hợp ra PRD.md trước khi bắt đầu thiết kế.
user-invocable: true
---

# Skill: Analyze Requirements

## Mục tiêu

Đóng vai BA: làm rõ requirements qua hội thoại ngắn, rồi tổng hợp ra `docs/requirement/PRD.md`.

---

## Workflow

### Bước 1 — Đọc đề bài

Lấy nội dung từ `docs/requirement/challenge.md`. Nếu trống, hỏi user paste vào.

Xác định: tên bài toán, actors, tính năng được nêu, ràng buộc kỹ thuật.

---

### Bước 2 — Hỏi làm rõ (từng nhóm, không dump hết)

- Hỏi từng nhóm chức năng một. Sau khi user trả lời → tóm tắt đồng thuận → chuyển nhóm tiếp.
- Mỗi câu hỏi phải có gợi ý mặc định hợp lý.
- Điều đã rõ trong đề bài → ghi nhận, không hỏi lại.

---

### Bước 3 — Confirm tổng hợp

Trình bày tóm tắt: Actors, Must-have, Should-have, Won't have, NFR chính, Entities chính.

Hỏi confirm. **Không tạo file trước khi user confirm.**

---

### Bước 4 — Tạo `docs/requirement/PRD.md`

```markdown
# Product Requirements Document

> Dự án: [Tên] | Phiên bản: 1.0 — [Ngày] | Trạng thái: Approved

## 1. Tổng quan

[Mô tả bài toán, mục tiêu, 2–3 câu]

## 2. Actors & Roles

| Role | Mô tả | Quyền hạn chính |
| ---- | ----- | --------------- |

## 3. Functional Requirements

### FR-01: [Tên tính năng]

- **Mô tả**: ...
- **Acceptance Criteria**: AC1 / AC2
- **Priority**: Must / Should / Won't
- **Actor**: ...

## 4. Non-functional Requirements

| ID     | Loại        | Yêu cầu               |
| ------ | ----------- | --------------------- |
| NFR-01 | Performance | API ≤ 500ms P95       |
| NFR-02 | Security    | JWT, token expiry 24h |

## 5. Data Model (sơ bộ)

| Entity | Mô tả | Quan hệ chính |
| ------ | ----- | ------------- |

## 6. MoSCoW

| Must Have | Should Have | Won't Have |
| --------- | ----------- | ---------- |
```
