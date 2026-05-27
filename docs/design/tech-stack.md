# Tech Stack

> Dự án: OCNV | Phiên bản: 1.1 — 25/05/2026 | Trạng thái: Approved

---

## Backend

| Hạng mục | Tech | Version | Lý do |
|----------|------|---------|-------|
| Runtime | Node.js | 22 LTS | LTS ổn định, async I/O tốt, hệ sinh thái lớn |
| Framework | NestJS | 11.1.x | Opinionated structure, DI built-in, decorator-first, TypeScript native |
| Language | TypeScript | 5.8.x | Type safety, IDE support tốt, giảm runtime error |
| Database | MongoDB | 7.x | Document model phù hợp dữ liệu đa ngôn ngữ (VI/EN); flexible schema cho hotspot/village content |
| ODM | Mongoose | 9.6.x | Mature, schema validation, middleware hooks, populate |
| Auth | JWT (httpOnly cookie) | — | Stateless, httpOnly cookie chống XSS, refresh token rotation |
| JWT lib | @nestjs/jwt 11.x + passport-jwt 4.x | — | Tích hợp sẵn NestJS ecosystem |
| Password | bcryptjs | 3.0.x | bcrypt thuần JS, không cần native binding, ships own types |
| Email | Nodemailer | 8.0.x | Mature, ESM support, ships own types; synchronous gửi (user registration email ngay, no queue) |
| Email provider | SendGrid SMTP | — | Free tier 100 email/ngày, deliverability tốt |
| File upload | Multer (`@nestjs/platform-express` built-in) | — | Upload file lưu vào `uploads/`; serve static qua NestJS |
| Payment | Payment HTTP (tự implement) | — | Payment sandbox; không có official SDK ổn định |
| QR code | qrcode | 1.5.x | Sinh QR PNG cho sản phẩm |
| Config | @nestjs/config 4.x + joi 18.x | — | Validate env vars khi startup, fail fast nếu thiếu |
| Logger | nestjs-pino 4.x + pino-http 11.x | — | JSON structured log, request context tự động |
| Rate limit | @nestjs/throttler | 6.3.x | Chống brute force trên auth endpoints |
| API docs | @nestjs/swagger | 11.4.x | OpenAPI tự sinh từ decorator, mount tại `/api/docs` |
| Validation | class-validator 0.14.x + class-transformer 0.5.x | — | Tích hợp NestJS ValidationPipe |

---

## Frontend

| Hạng mục | Tech | Version | Lý do |
|----------|------|---------|-------|
| Framework | React + React DOM | 19.1.x | Component model mạnh, concurrent features, ecosystem lớn |
| Build tool | Vite | 8.0.x | Dev server nhanh (Rolldown), HMR tốt, bundle nhỏ |
| Language | TypeScript | 5.8.x | Đồng bộ với BE, type safety |
| Styling | Tailwind CSS | 4.1.x | Utility-first, responsive dễ, không đặt tên class |
| UI components | shadcn/ui | latest | Headless, accessible, customize dễ qua className |
| Server state | TanStack Query | 5.80.x | Cache, refetch, invalidate sau write; giảm boilerplate fetch |
| Global state | Zustand | 5.0.x | Nhẹ, đơn giản, chỉ dùng cho user session + ngôn ngữ |
| Forms | React Hook Form 7.57.x + Zod 4.4.x | — | Performant, schema validation client-side |
| Form resolvers | @hookform/resolvers | 5.4.x | Bridge RHF ↔ Zod 4 |
| HTTP client | Axios | 1.9.x | Interceptor CSRF + 401 refresh, withCredentials cookie |
| i18n | react-i18next 17.x + i18next 26.x | — | VI/EN switch, lazy load locale |
| i18n detector | i18next-browser-languagedetector | 8.2.x | Detect language từ localStorage |
| 3D viewer | `<model-viewer>` (Google) | 4.x | Web component chuẩn, hỗ trợ GLB, AR mode iOS/Android |
| AR | AR.js (NFT tracking) | 3.x | Image target tracking, chạy trên browser không cần app |
| 3D runtime AR | Three.js | 0.175.x | Load GLB + animation trong AR scene |
| Rich text editor | Tiptap | 2.x | Headless, React integration, dùng trong admin |
| QR display | qrcode.react | 4.x | Render QR từ URL, export PNG |
| Charts (admin) | Recharts | 3.8.x | React-native, declarative, đủ cho dashboard |
| Router | React Router | 7.15.x | SPA routing, nested routes, protected routes |
| Icons | lucide-react | 1.16.x | Tree-shakeable, consistent icon set |
| CSS utils | tailwind-merge 3.6.x + clsx 2.x | — | Merge Tailwind classes an toàn |

> **Import rule cho React Router 7:** luôn import từ `react-router-dom`, không phải `react-router`.

---

## File Storage

- Upload qua `Multer` (built-in NestJS/Express)
- File lưu vào thư mục `uploads/` trong source BE, phân loại theo type:
  ```
  uploads/
    images/       # ảnh sản phẩm, làng nghề, đánh giá
    models/       # file .glb, .usdz
    videos/       # video quy trình sản xuất
    ar-tracking/  # .fset, .fset3, .iset, target image
    avatars/      # ảnh đại diện user
  ```
- BE serve static qua `ServeStaticModule` tại `/static/*`
- URL trả về client: `http://localhost:3001/static/<path>`
- Giới hạn: ảnh ≤ 10MB, GLB ≤ 50MB, video ≤ 100MB

---

## DevOps & Infra

| Hạng mục | Tech | Version |
|----------|------|---------|
| Container | Docker + Docker Compose | 27.x |
| Package manager | pnpm (monorepo workspace) | 11.x |
| Linter | ESLint | 9.x |
| Formatter | Prettier | 3.x |
| Git hooks | Husky + lint-staged | 9.x / 15.x |

> **pnpm config:** `pnpm-workspace.yaml` cần `allowBuilds: { '@nestjs/core': true, esbuild: true, msgpackr-extract: true }` để build native modules.

---

## Testing

| Hạng mục | Tech | Version |
|----------|------|---------|
| BE unit | Jest 29.7.x + @nestjs/testing 11.x | — |
| BE integration | Jest 29.7.x + supertest 7.1.x | — |
| BE transformer | ts-jest | 29.3.x |
| FE component/hook | Vitest 4.1.x + React Testing Library 16.x | — |
| FE coverage | @vitest/coverage-v8 | 4.1.x |
| FE DOM | jsdom | 29.x |

---

## Ports (local dev)

| Service | Port |
|---------|------|
| BE API (NestJS) | 3001 |
| FE App (Vite) | 5173 |
| MongoDB | 27017 |

---

## Environment Variables

```env
# App
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:5173

# MongoDB
MONGODB_URI=mongodb://localhost:27017/ocnv

# JWT
JWT_ACCESS_SECRET=change_me_access_secret_min_32_chars
JWT_REFRESH_SECRET=change_me_refresh_secret_min_32_chars
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=30d

# Cookie
COOKIE_SECRET=change_me_cookie_secret_min_32_chars

# Email (SendGrid SMTP)
SENDGRID_API_KEY=SG.xxxxxx
EMAIL_FROM=noreply@ocnv.vn

# Payment (Payment)
PAYMENT_TMN_CODE=
PAYMENT_HASH_SECRET=
PAYMENT_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
PAYMENT_RETURN_URL=http://localhost:5173/checkout/payment-return

# Shipping
SHIPPING_FEE=30000

# Static files
STATIC_FILES_PATH=./uploads
STATIC_FILES_URL=http://localhost:3001/static
```
