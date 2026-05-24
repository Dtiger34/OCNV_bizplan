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

**2. System Diagram** — cập nhật diagram với port/URL thực tế từ tech stack:

```
[React App :5173] ──HTTP──► [NestJS API :3000] ──► [PostgreSQL :5432]
                                    │
                               [JWT Auth]
```

Thêm component nếu có (Redis, Socket.IO, S3, ...) — chỉ thêm những gì đã có trong tech stack.
Ưu tiên dùng mermaid.

> **Quan trọng**: dùng **tên folder/class thực tế** trong codebase khi đặt tên component trong diagram (ví dụ: `EventsModule`, `RegistrationsService`, không phải label chung chung như `Business Logic`). Đảm bảo ≥ 80% tên trong diagram khớp với code.

**3. Key Design Decisions** — 3–5 quyết định kiến trúc quan trọng, mỗi cái 1 dòng lý do. Ví dụ:

- Monorepo: chia sẻ type giữa FE/BE, dễ quản lý
- Repository pattern: tách Prisma khỏi business logic, dễ test

Hỏi confirm: "Bạn đồng ý với kiến trúc này chưa? Cần điều chỉnh gì không?"

---

### Bước 3 — Ghi `docs/design/architecture.md`

Sau khi user confirm:

1. Ghi nội dung vào `docs/design/architecture.md` (system overview + mermaid diagram + key decisions)

---

### Bước 4 — Kiểm tra đồng bộ (nếu có deviation)

Nếu kiến trúc vừa chốt **lệch khỏi pattern mặc định** trong rules (bỏ repository layer, thêm event bus, không dùng monorepo, ...) → cập nhật `.claude/rules/backend.md` tương ứng.

Nếu không có deviation → bỏ qua bước này.
