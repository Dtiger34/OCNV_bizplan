---
name: design-api-contract
description: Dựa vào PRD và DB schema, thiết kế API contract đầy đủ để FE và BE có thể code song song mà không conflict.
user-invocable: true
---

# Skill: Design API Contract

## Mục tiêu

Đọc PRD + DB schema → xác định toàn bộ endpoints → draft request/response chi tiết → ghi `docs/design/api-contract.md`.

Đây là **tài liệu sync quan trọng nhất** giữa FE và BE: sau khi confirm, FE có thể mock API và code UI ngay, BE implement song song.

---

## Workflow

### Bước 1 — Đọc input

Đọc:

- `docs/requirement/PRD.md` — features, actors, use cases
- `docs/design/db-schema.md` — entities, fields, enums (để xác định response shape)
- `docs/design/tech-stack.md` — auth method đã chốt

Nếu db-schema.md chưa có, dừng lại và báo: "Chạy skill `design-db-schema` trước."

---

### Bước 2 — Xác định danh sách endpoints

Liệt kê toàn bộ endpoints theo nhóm feature, để user confirm trước khi draft chi tiết:

```
Auth:
  POST /api/v1/auth/login
  POST /api/v1/auth/register
  GET  /api/v1/auth/me

[Feature A]:
  GET    /api/v1/[resources]
  GET    /api/v1/[resources]/:id
  POST   /api/v1/[resources]
  PATCH  /api/v1/[resources]/:id
  DELETE /api/v1/[resources]/:id

[Feature B]:
  ...
```

Với mỗi endpoint, ghi rõ: auth required (Yes/No) và actor được phép gọi.

Hỏi confirm: "Danh sách endpoints này đủ chưa? Thiếu hay thừa endpoint nào không?"

Không tiếp tục đến Bước 3 khi chưa được confirm.

---

### Bước 3 — Draft request/response chi tiết

Sau khi endpoint list được confirm, draft chi tiết cho **từng endpoint**:

- HTTP method + path + mô tả ngắn
- Auth: Yes/No + role nếu có RBAC
- Request body (với POST/PATCH): các field, type, required/optional
- Response success: status code + response shape lấy từ DB schema
- Response error: các error case thường gặp (400, 401, 403, 404, 409)
  - Mọi endpoint có request body **bắt buộc** định nghĩa case `400` cho input rỗng/sai format — đảm bảo không bao giờ trả 500 khi user nhập sai

Ưu tiên viết đầy đủ các endpoint Must-have trước, Should-have sau.

---

### Bước 4 — Ghi `docs/design/api-contract.md`

Sau khi user confirm, ghi vào file theo template có sẵn, bao gồm:

- Common response format (success + error + pagination)
- Toàn bộ endpoints với request/response đầy đủ
