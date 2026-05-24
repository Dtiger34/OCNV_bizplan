---
name: design-tech-stack
description: Dựa vào PRD, xác định tech stack phù hợp cho dự án.
user-invocable: true
---

# Skill: Design Tech Stack

## Mục tiêu

Đọc PRD → suy ra tech cần thiết → propose stack cụ thể với version → ghi `docs/design/tech-stack.md`.

---

## Workflow

### Bước 1 — Đọc input

Đọc:

- `docs/requirement/PRD.md` — features, entities, NFR

Nếu PRD chưa có hoặc trống, dừng lại và báo: "Chạy skill `analyze-req` trước."

---

### Bước 2 — Suy ra tech cần thiết

Từ **PRD**: xác định các nhu cầu kỹ thuật đặc biệt ngoài stack mặc định:

| Nhu cầu từ PRD                       | Tech bổ sung                             |
| ------------------------------------ | ---------------------------------------- |
| Realtime (notification, live update) | Socket.IO hoặc SSE                       |
| File upload                          | Multer + local storage (hoặc S3 nếu cần) |
| Email                                | Nodemailer                               |
| AI / LLM                             | Anthropic SDK hoặc OpenAI SDK            |
| Export PDF/Excel                     | pdf-lib / exceljs                        |
| Background job                       | Bull + Redis                             |
| ...                                  | ...                                      |

Chỉ thêm tech nếu PRD yêu cầu rõ ràng — không thêm phòng trường hợp.

---

### Bước 3 — Propose tech stack

Trình bày bảng tech stack đầy đủ:

- Stack ưu tiên mặc định: NestJS + React + PostgreSQL + Prisma + JWT
- Bổ sung từ Bước 2 (nếu có)
- Version cụ thể cho từng package (verify npm/PyPI trước khi đề xuất)
- Dev tools: pnpm, Docker Compose, Prettier

Với mỗi tech **quan trọng** (framework, database, ORM, auth), ghi 1 dòng lý do chọn — đủ để trả lời nếu được ai đó hỏi. Ví dụ:

- NestJS: TypeScript-first, module hóa tốt, phù hợp team quen OOP
- PostgreSQL: ACID, relation phức tạp, Prisma hỗ trợ tốt
- Prisma: type-safe, migration tự động, DX tốt

Hỏi confirm: "Bạn đồng ý với stack này chưa? Cần thêm/bớt gì không?"

---

### Bước 4 — Ghi `docs/design/tech-stack.md`

Sau khi user confirm, ghi nội dung vào file theo template có sẵn.

---

### Bước 5 — Cập nhật AI config files

So sánh tech stack vừa chốt với nội dung hiện tại của các file sau, cập nhật nếu có lệch:

- `CLAUDE.md` — section Tech Constraints, Architecture Constraints
- `.claude/rules/backend.md` — framework, ORM, exception handling convention
- `.claude/rules/frontend.md` — state management, HTTP client, UI library
- `.claude/rules/testing.md` — test framework, coverage tool

Chỉ sửa phần bị lệch — không xóa rule không liên quan đến tech stack.
