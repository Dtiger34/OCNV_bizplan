---
name: design-ui-screens
description: Dựa vào PRD và API contract, thiết kế danh sách màn hình đủ chi tiết để FE code độc lập mà không cần hỏi lại BE.
user-invocable: true
---

# Skill: Design UI Screens

## Mục tiêu

Đọc PRD + API contract → định nghĩa từng màn hình với đủ thông tin để FE implement ngay — không cần hỏi lại BE trong lúc code song song.

---

## Workflow

### Bước 1 — Đọc input

Đọc:
- `docs/requirement/PRD.md` — features, actors, user flows
- `docs/design/api-contract.md` — endpoints, request/response shape
- `docs/design/tech-stack.md` — UI library, routing

Nếu api-contract.md chưa có, dừng lại và báo: "Chạy skill `design-api-contract` trước."

---

### Bước 2 — Xác định danh sách màn hình

Liệt kê toàn bộ màn hình theo nhóm feature:

```
| # | Màn hình | Route | Actor | Auth |
|---|----------|-------|-------|------|
| 1 | Login | /login | All | No |
| 2 | ... | ... | ... | ... |
```

Hỏi confirm: "Danh sách màn hình này đủ chưa? Thiếu hay thừa màn hình nào không?"

Không tiếp tục đến Bước 3 khi chưa được confirm.

---

### Bước 3 — Draft chi tiết từng màn hình

Sau khi danh sách được confirm, draft chi tiết cho từng màn hình theo format sau — đủ để FE code mà không cần hỏi lại:

```
### [Tên màn hình] — [Route]
**Actor**: [role] | **Auth**: Yes/No

**Data hiển thị** (map về API response field):
- [Label trên UI]: `[endpoint]` → response.[field]
- Ví dụ: "Tên sự kiện": `GET /api/v1/events/:id` → response.data.name

**Actions** (map về endpoint cụ thể):
- [Button/Action]: gọi `[METHOD] [endpoint]` với body `{ field: value }`
  → Success: [kết quả — navigate đến đâu / toast gì]
  → Error [status]: [hiển thị gì]

**Edge cases bắt buộc xử lý**:
- Loading: [skeleton / spinner]
- Empty: [thông báo gì]
- Error: [thông báo gì, có retry không]
```

---

### Bước 4 — Ghi `docs/design/ui-screens.md`

Sau khi user confirm, ghi vào file theo template có sẵn.
