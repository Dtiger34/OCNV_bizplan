# OCNV — Nền tảng Thương mại Điện tử Làng Nghề Việt Nam

Nền tảng thương mại điện tử kết hợp trải nghiệm văn hóa số, cho phép khám phá và mua sản phẩm thủ công từ 5 làng nghề truyền thống Hà Nội. Mỗi sản phẩm có mô hình 3D tương tác và trải nghiệm AR qua camera điện thoại.

---

## Tech Stack

| | |
|--|--|
| **Backend** | NestJS 11 · TypeScript 5.8 · MongoDB 7 · Mongoose 9 |
| **Frontend** | React 19 · Vite 8 · Tailwind CSS 4 · shadcn/ui |
| **State** | TanStack Query 5 · Zustand 5 |
| **Auth** | JWT httpOnly cookie · CSRF double-submit |
| **Payment** | VNPay sandbox (provider-agnostic payment helper) |
| **Package manager** | pnpm 11 (monorepo workspace) |

---

## Cấu trúc project

```
ocnv/
  apps/
    be/   # NestJS API — port 3001
    fe/   # React SPA — port 5173
  docs/
    requirement/   # PRD
    design/        # tech-stack, db-schema, architecture, api-contract, ui-screens
```

---

## Yêu cầu

- Node.js 22 LTS
- pnpm 11
- MongoDB 7 (local hoặc Atlas)

---

## Cài đặt

```bash
pnpm install
```

---

## Biến môi trường

Tạo file `apps/be/.env` từ template:

```env
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:5173

MONGODB_URI=mongodb://localhost:27017/ocnv

JWT_ACCESS_SECRET=change_me_access_secret_min_32_chars
JWT_REFRESH_SECRET=change_me_refresh_secret_min_32_chars
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=30d

COOKIE_SECRET=change_me_cookie_secret_min_32_chars

SENDGRID_API_KEY=SG.xxxxxx
EMAIL_FROM=noreply@ocnv.vn

PAYMENT_TMN_CODE=
PAYMENT_HASH_SECRET=
PAYMENT_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
PAYMENT_RETURN_URL=http://localhost:5173/checkout/payment-return

SHIPPING_FEE=30000

STATIC_FILES_PATH=./uploads
STATIC_FILES_URL=http://localhost:3001/static
```

---

## Chạy development

```bash
# Chạy cả BE và FE song song
pnpm dev

# Chỉ BE
pnpm be dev

# Chỉ FE
pnpm fe dev
```

- BE API: http://localhost:3001
- FE App: http://localhost:5173
- Swagger: http://localhost:3001/api/docs

---

## Seed dữ liệu

```bash
pnpm be seed
```

Tạo sẵn:
- Admin: `admin@ocnv.vn` / `Admin@123456`
- Customer: `customer1@test.com` / `Customer@123456`
- 5 làng nghề, 10 sản phẩm, đơn hàng và đánh giá mẫu

---

## Build production

```bash
pnpm build
```

---

## Ports

| Service | Port |
|---------|------|
| BE API | 3001 |
| FE App | 5173 |
| MongoDB | 27017 |
