---
name: design-architecture
description: Dựa vào PRD và tech stack, thiết kế kiến trúc hệ thống phù hợp cho dự án.
user-invocable: true
---

# Skill: Design Architecture

## Mục tiêu

Đọc PRD + tech stack → thiết kế kiến trúc high-level → ghi `docs/design/architecture.md`.

---

## Workflow

### Bước 1 — Đọc input

Đọc:

- `docs/requirement/PRD.md` — features, actors, NFR
- `docs/design/tech-stack.md` — stack đã chốt

Nếu tech-stack.md chưa có, dừng lại và báo: "Chạy skill `design-tech-stack` trước."

---

### Bước 2 — Thiết kế và propose

Trình bày 3 phần để user confirm:

**1. System Overview** — 2–3 câu mô tả hệ thống, luồng chính.

**2. System Diagram** — cập nhật diagram với tech và port thực tế từ `tech-stack.md`:

```
[FE App :PORT] ──HTTP──► [BE API :PORT] ──► [Database :PORT]
                                │
                           [Auth Layer]
```

Thêm component nếu có trong tech stack (Cache, Queue, Storage, AI service, ...) — chỉ thêm những gì đã có trong tech stack.
Ưu tiên dùng mermaid.

> **Quan trọng**: dùng **tên folder/class/module thực tế** trong codebase khi đặt tên component trong diagram (ví dụ: `UsersService`, `OrdersRouter`, không phải label chung chung như `Business Logic`). Đảm bảo ≥ 80% tên trong diagram khớp với code.

**3. Key Design Decisions** — 3–5 quyết định kiến trúc quan trọng, mỗi cái 1 dòng lý do. Ví dụ:

- Repository pattern: tách DB client khỏi business logic, dễ test và swap
- Monorepo: chia sẻ type giữa FE/BE, dễ quản lý dependency

Hỏi confirm: "Bạn đồng ý với kiến trúc này chưa? Cần điều chỉnh gì không?"

---

### Bước 3 — Ghi `docs/design/architecture.md`

Sau khi user confirm:

1. Ghi nội dung vào `docs/design/architecture.md` (system overview + mermaid diagram + key decisions)

---

### Bước 4 — Kiểm tra đồng bộ (nếu có deviation)

Nếu kiến trúc vừa chốt **lệch khỏi pattern mặc định** trong rules (bỏ repository layer, thêm event bus, không dùng monorepo, ...) → cập nhật `.claude/rules/backend.md` tương ứng.

Nếu không có deviation → bỏ qua bước này.
