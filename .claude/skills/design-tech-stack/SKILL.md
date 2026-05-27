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

### Bước 2 — Hỏi định hướng stack (nếu chưa có chỉ định)

Nếu user chưa chỉ định tech stack, hỏi:

- "BE language/framework ưu tiên? (Node/NestJS, Python/FastAPI, Go/Gin, ...)"
- "FE framework ưu tiên? (React, Vue, Next.js, ...)"
- "Database ưu tiên? (MongoDB, PostgreSQL, MySQL, ...)"

Nếu user đã chỉ định → bỏ qua bước này, dùng stack được chỉ định.

---

### Bước 3 — Suy ra tech bổ sung từ PRD

Từ **PRD**: xác định các nhu cầu kỹ thuật đặc biệt ngoài stack cơ bản:

| Nhu cầu từ PRD                       | Tech bổ sung (gợi ý — chọn theo stack đã chốt) |
| ------------------------------------ | ----------------------------------------------- |
| Realtime (notification, live update) | WebSocket / SSE / Socket.IO                     |
| File upload / storage                | Local `uploads/` / S3-compatible / MinIO        |
| Email                                | Nodemailer (Node) / SMTP lib tương ứng          |
| AI / LLM                             | Anthropic SDK / OpenAI SDK                      |
| Export PDF/Excel                     | Library phù hợp với BE language                 |
| Background job / task queue          | @nestjs/bull + Bull (Node) / BullMQ / Celery    |
| Cache                                | Redis / Memcached                               |
| Payment                              | VNPay HTTP / Stripe SDK                         |
| QR code                              | qrcode (BE) / qrcode.react (FE)                 |

Chỉ thêm tech nếu PRD yêu cầu rõ ràng — không thêm phòng trường hợp.

---

### Bước 4 — Propose tech stack

Trình bày bảng tech stack đầy đủ với **version mới nhất** theo stack đã chốt. Dùng bảng version tham khảo dưới đây — đây là các version đã được verify build thành công cho dự án này:

#### Version tham khảo (verified tháng 05/2026)

**Backend — NestJS + MongoDB:**

| Package | Version |
|---------|---------|
| Node.js | 22 LTS |
| TypeScript | 5.8.x |
| NestJS (`@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`) | 11.1.x |
| `@nestjs/config` | 4.0.x |
| `@nestjs/jwt` | 11.0.x |
| `@nestjs/mongoose` | 11.0.x |
| `@nestjs/passport` | 11.0.x |
| `@nestjs/serve-static` | 5.0.x |
| `@nestjs/swagger` | 11.4.x |
| `@nestjs/throttler` | 6.3.x |
| `@nestjs/bull` | 11.0.x |
| `@nestjs/testing` (dev) | 11.1.x |
| `@nestjs/cli` (dev) | 11.0.x |
| MongoDB | 7.x |
| Mongoose | 9.6.x |
| passport-jwt | 4.0.x |
| bcryptjs | 3.0.x |
| nodemailer | 8.0.x |
| nestjs-pino | 4.3.x |
| pino-http | 11.0.x |
| joi | 18.2.x |
| bull | 4.x |
| class-validator | 0.14.x |
| class-transformer | 0.5.x |
| cookie-parser | 1.4.x |
| qrcode | 1.5.x |
| Jest | 29.7.x |
| ts-jest | 29.3.x |
| supertest | 7.1.x |
| ESLint | 9.x |

**Frontend — React + Vite + Tailwind:**

| Package | Version |
|---------|---------|
| React + React DOM | 19.1.x |
| TypeScript | 5.8.x |
| Vite | 8.0.x |
| `@vitejs/plugin-react` | 6.0.x |
| Tailwind CSS | 4.1.x |
| `@tailwindcss/vite` | 4.1.x |
| shadcn/ui | latest |
| TanStack Query (`@tanstack/react-query`) | 5.80.x |
| Zustand | 5.0.x |
| React Hook Form | 7.57.x |
| Zod | 4.4.x |
| `@hookform/resolvers` | 5.4.x |
| Axios | 1.9.x |
| react-router-dom | 7.15.x |
| react-i18next | 17.0.x |
| i18next | 26.2.x |
| i18next-browser-languagedetector | 8.2.x |
| Recharts | 3.8.x |
| lucide-react | 1.16.x |
| Tiptap | 2.x |
| tailwind-merge | 3.6.x |
| clsx | 2.x |
| Vitest | 4.1.x |
| `@vitest/coverage-v8` | 4.1.x |
| React Testing Library | 16.x |
| jsdom | 29.x |

**DevOps:**

| Package | Version |
|---------|---------|
| pnpm | 11.x |
| Docker Engine | 27.x |
| ESLint | 9.x |
| Prettier | 3.x |

> **Lưu ý quan trọng:**
> - React Router 7: import `createBrowserRouter`, `RouterProvider`, `Link`, `NavLink`, `Outlet`, `Navigate`, `useLocation` từ `react-router-dom` (không phải `react-router`)
> - Zod 4: `z.string()`, `z.number()`, v.v. API cơ bản không đổi; `@hookform/resolvers` 5.x tương thích zod 4
> - NestJS 11 yêu cầu Node.js ≥ 20; khuyến nghị Node 22 LTS
> - Mongoose 9: tương thích schema syntax của Mongoose 8; một số deprecated API đã bị bỏ
> - `pnpm-workspace.yaml` cần `allowBuilds: { '@nestjs/core': true, esbuild: true }` để build native modules

Với mỗi tech **quan trọng** (framework, database, ODM, auth), ghi 1 dòng lý do chọn.

Hỏi confirm: "Bạn đồng ý với stack này chưa? Cần thêm/bớt gì không?"

---

### Bước 5 — Ghi `docs/design/tech-stack.md`

Sau khi user confirm, ghi nội dung vào file bao gồm:
- Bảng BE / FE / DevOps / Testing với version cụ thể
- File Storage strategy
- Ports (local dev)
- Environment variables template

---

### Bước 6 — Cập nhật AI config files

So sánh tech stack vừa chốt với nội dung hiện tại của các file sau, cập nhật nếu có lệch:

- `CLAUDE.md` — section Tech Constraints, Architecture Constraints
- `.claude/rules/backend.md` — framework, ODM, exception handling convention
- `.claude/rules/frontend.md` — state management, HTTP client, UI library
- `.claude/rules/testing.md` — test framework, coverage tool

Chỉ sửa phần bị lệch — không xóa rule không liên quan đến tech stack.
