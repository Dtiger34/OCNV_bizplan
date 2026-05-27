---
name: scaffold-base
description: Khởi tạo project boilerplate ngay sau khi tech stack được chốt, không phụ thuộc vào design docs.
user-invocable: true
---

# Skill: Scaffold Base

## Mục tiêu

Đọc tech stack đã chốt → khởi tạo toàn bộ boilerplate cố định → verify build được trước khi DEV bắt đầu code.

---

## Workflow

### Bước 1 — Đọc input

Đọc `docs/design/tech-stack.md` và `docs/design/architecture.md`.

Nếu tech-stack.md chưa có, dừng lại và báo: "Chạy skill `design-tech-stack` trước."

---

### Bước 2 — Propose và confirm

Liệt kê ngắn gọn cấu trúc sẽ tạo dựa trên tech stack đã đọc. Hỏi confirm trước khi chạy.

---

### Bước 3 — Khởi tạo project

Dựa vào tech stack trong `tech-stack.md`, khởi tạo toàn bộ boilerplate. Đảm bảo đạt đủ các checklist sau:

**Monorepo / project root:**

- [ ] Package manager và workspace config
- [ ] `.env.example` với tất cả env vars cần thiết (bao gồm `DATABASE_URL_TEST` cho integration test)
- [ ] `.gitignore` phù hợp với stack
- [ ] Formatter config (Prettier hoặc tương đương theo tech-stack)
- [ ] Database local (Docker Compose hoặc tương đương)

**Backend:**

- [ ] Framework init theo tech-stack.md
- [ ] Global error handler — format response lỗi thống nhất
- [ ] Global response transformer — format response success thống nhất
- [ ] Auth middleware/guard skeleton (JWT hoặc method đã chốt)
- [ ] DB schema file rỗng (chờ `scaffold-feature` điền vào)
- [ ] API prefix và port theo architecture.md
- [ ] `GET /health` endpoint — response `{ status: 'ok' }` HTTP 200, không cần auth
- [ ] Logger setup — inject logger framework phù hợp với stack (NestJS → built-in `Logger` + pino hoặc winston), không dùng `console.log`
- [ ] API docs setup — mặc định dùng tool phù hợp với framework (NestJS → `@nestjs/swagger`, FastAPI → built-in OpenAPI, ...); nếu tech-stack hoặc architecture chỉ định tool khác thì dùng theo
- [ ] Test config: jest.config.ts, tsconfig.spec.json, coverage thresholds theo `testing.md`

**Frontend:**

- [ ] Framework init theo tech-stack.md
- [ ] HTTP client singleton với base URL từ env, interceptor gắn auth token tự động
- [ ] Router skeleton (public/private routes)
- [ ] Base layout skeleton
- [ ] i18n setup nếu tech-stack có (locale rỗng)
- [ ] Test config: vitest.config.ts, setupTests.ts, coverage thresholds theo `testing.md`

**Docker (bắt buộc):**

- [ ] `Dockerfile` cho BE và FE
- [ ] `docker-compose.yml` — app + DB chạy được bằng 1 lệnh `docker-compose up`, không cần config thủ công ngoài `.env`

---

### Bước 4 — Verify

- Backend build/start không lỗi
- Frontend build/start không lỗi
- DB container khởi động được

Nếu lỗi → fix trước khi báo done.
