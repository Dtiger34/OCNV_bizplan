---
name: design-db-schema
description: Dựa vào PRD, thiết kế database schema phù hợp cho dự án.
user-invocable: true
---

# Skill: Design DB Schema

## Mục tiêu

Đọc PRD → xác định entities và quan hệ → draft schema theo ORM/DB đã chốt → ghi `docs/design/db-schema.md`.

---

## Workflow

### Bước 1 — Đọc input

Đọc:

- `docs/requirement/PRD.md` — entities, features, relationships (section Data Model)
- `docs/design/tech-stack.md` — ORM và DB đã chốt

Nếu PRD chưa có, dừng lại và báo: "Chạy skill `analyze-req` trước."
Nếu tech-stack.md chưa có, dừng lại và báo: "Chạy skill `design-tech-stack` trước."

---

### Bước 2 — Xác định entities và quan hệ

Trình bày bảng entities để confirm trước khi draft schema:

```
| Entity | Mô tả | Quan hệ chính |
|--------|-------|---------------|
| ...    | ...   | ...           |
```

Hỏi confirm: "Danh sách entities này đúng chưa? Thiếu hay thừa gì không?"

Không tiếp tục đến Bước 3 khi chưa được confirm.

---

### Bước 3 — Draft schema

Sau khi entities được confirm, draft schema theo ORM/DB đã chốt trong `tech-stack.md`:

- Mỗi entity có: id, createdAt, updatedAt, các field nghiệp vụ, relations
- Enum cho các status/type field
- Index cho field thường dùng trong WHERE / ORDER BY
- Soft delete chỉ thêm nếu PRD yêu cầu audit trail — mặc định hard delete
- Comment ngắn trên mỗi model nếu tên chưa tự mô tả

Nếu ORM là **Prisma** → viết Prisma schema syntax.
Nếu ORM là **SQLAlchemy** → viết Python model class.
Nếu ORM là **TypeORM** → viết TypeScript entity class.
Nếu ORM khác → viết theo syntax tương ứng.

Hỏi confirm: "Schema này ổn chưa? Cần điều chỉnh field hay relation nào không?"

---

### Bước 4 — Ghi `docs/design/db-schema.md`

Sau khi user confirm, ghi vào file theo template có sẵn gồm:

- Bảng entities
- Schema đầy đủ theo syntax ORM đã chốt
- Mô tả quan hệ quan trọng
