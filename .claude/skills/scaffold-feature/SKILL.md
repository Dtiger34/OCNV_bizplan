---
name: scaffold-feature
description: Sinh code stub cho từng feature dựa vào db-schema, api-contract và ui-screens. Chạy sau khi toàn bộ design docs đã được confirm.
user-invocable: true
---

# Skill: Scaffold Feature

## Mục tiêu

Đọc design docs → sinh Prisma schema thực tế + BE module stubs + FE page stubs — đủ để FE và BE bắt đầu implement ngay mà không cần setup thêm.

---

## Workflow

### Bước 1 — Đọc input

Đọc:
- `docs/design/db-schema.md` — models, enums, relations
- `docs/design/api-contract.md` — endpoints theo feature group
- `docs/design/ui-screens.md` — screens, routes, API calls
- `docs/design/tech-stack.md` — ORM, framework, UI lib
- `docs/design/architecture.md` — folder structure, layer convention

Nếu thiếu bất kỳ file nào, dừng lại và báo file nào còn thiếu.

---

### Bước 2 — Propose danh sách sẽ gen

Liệt kê file sẽ tạo theo feature. Hỏi confirm trước khi chạy.

---

### Bước 3 — DB schema

Ghi schema đầy đủ từ `db-schema.md` vào file schema của ORM đã chốt trong tech-stack.md:
- Tất cả models/entities, enums, relations, indexes
- Chạy migration để tạo DB

---

### Bước 4 — BE stubs (mỗi feature group trong api-contract)

Với mỗi feature, tạo module theo layer convention trong `architecture.md`:
- Controller stub: route decorators + endpoint stubs, Swagger decorators từ api-contract — BE chỉ cần implement logic
- Service stub: method stubs tương ứng controller
- Repository stub: method stubs theo ORM đã chốt
- DTOs: fields từ api-contract request body
- Không implement business logic — chỉ tạo cấu trúc

---

### Bước 5 — FE stubs (mỗi screen trong ui-screens)

Với mỗi màn hình:
- Page stub: route khớp `ui-screens.md`, import layout đúng, TODO comment cho từng section
- API hook stub: đúng endpoint từ api-contract, response type từ api-contract response shape
- Không implement UI chi tiết — chỉ tạo cấu trúc với TODO comments

---

### Bước 6 — Seed data

Điền `seed.ts` (hoặc equivalent theo ORM) với fake data thực tế cho demo:
- Ít nhất 1 user mỗi role
- Ít nhất 3–5 records cho entity chính
- Data phải đủ để chạy happy path demo được

---

### Bước 7 — Verify

- BE build không lỗi type
- FE build không lỗi type
- Tất cả routes FE được đăng ký trong router
- Seed chạy được

Báo kết quả. Nếu lỗi → fix trước khi báo done.
