# Sprint Plan

> Dự án: OCNV | Phiên bản: 1.1 — 27/05/2026 | Trạng thái: In Progress

## Ghi chú kỹ thuật (cập nhật sau implement)

| Quyết định | Mô tả |
|------------|-------|
| Email queue | Dùng **nodemailer fire-and-forget** thay vì Bull+Redis (chưa cài `@nestjs/bull`). Email gửi async, không retry khi fail. |
| Payment | **Mock implementation** — `PaymentMethod.VNPAY` trả về dummy URL, `verifyReturn` kiểm tra `status=success` trong query. Thay bằng VNPay thật khi có merchant account. |
| Circular dep | Cart/Products/Orders tránh circular dependency bằng cách inject Mongoose Model trực tiếp thay vì import module lẫn nhau. |
| JWT config key | Dùng `JWT_ACCESS_SECRET` (theo config.schema), không phải `JWT_SECRET`. |

---

## Feature Overview

| # | Feature | Priority | Owner | Endpoints | Screens |
|---|---------|----------|-------|-----------|---------|
| 1 | Setup & Scaffold | — | Shared | — | — |
| 2 | Auth | Must | BE+FE | 8 | 5 |
| 3 | Products + Reviews | Must | BE+FE | 6 | 2 |
| 4 | Villages | Must | BE+FE | 2 | 1 |
| 5 | Cart | Must | BE+FE | 6 | 1 |
| 6 | Orders + Checkout + Payment | Must | BE+FE | 5 | 4 |
| 7 | User Profile + Addresses + Wishlist | Must | BE+FE | 8 | 5 |
| 8 | Email tự động | Must | BE | — | — |
| 9 | Upload | Must | BE | 1 | — |
| 10 | Admin — Products + Hotspots | Must | BE+FE | 12 | 3 |
| 11 | Admin — Villages + Stages | Must | BE+FE | 6 | 2 |
| 12 | Admin — Orders | Must | BE+FE | 3 | 2 |
| 13 | Admin — Reviews + Users | Must | BE+FE | 6 | 2 |
| 14 | Admin — Dashboard + Static Content | Must | BE+FE | 4 | 2 |
| 15 | AR Experience | Must | FE | — | 1 |
| 16 | i18n VI/EN | Must | FE | — | — |
| 17 | Testing | — | Shared | — | — |

---

## Sprint 0 — Setup

**Shared**
- Init monorepo pnpm workspace (`apps/be`, `apps/fe`)
- `docker-compose.yml`: MongoDB, Redis
- `.env.example`, `.gitignore`
- ESLint + Prettier + Husky + lint-staged

**BE**
- NestJS scaffold (`apps/be`)
- `MongooseModule.forRootAsync()` với `ConfigService`
- `@nestjs/config` + Joi env validation (fail fast nếu thiếu biến)
- `GlobalExceptionFilter` — format response lỗi thống nhất
- `ValidationPipe` global (class-validator + class-transformer)
- `nestjs-pino` logger
- `GET /health` endpoint
- `ServeStaticModule` tại `/static/*` → `uploads/`

**FE**
- Vite + React 19 + TypeScript scaffold (`apps/fe`)
- Tailwind CSS 4 + shadcn/ui init
- React Router 7 — routing skeleton (public + protected routes + admin routes)
- Axios singleton (`src/lib/api-client.ts`) với `withCredentials: true`, interceptor CSRF, interceptor 401 → refresh → retry
- Zustand stores: `authStore` (user, isAuthenticated), `cartStore` (localStorage-backed), `languageStore`
- TanStack Query setup (`QueryClientProvider`)
- i18next init — locale files `vi.json`, `en.json` (keys rỗng, điền dần)
- Layout components: `MainLayout` (Header + Footer), `AdminLayout` (sidebar), `ProtectedRoute`

---

## Sprint 1 — Auth + Products + Villages

> BE implement trước, FE implement sau khi endpoint tương ứng sẵn sàng.

**BE**
- `BE-01` ✅ Auth module:
  - `POST /auth/register` — bcrypt hash password, gửi email xác thực (fire-and-forget)
  - `POST /auth/login` — JWT access token (15m) + refresh token (30d) set httpOnly cookie + csrf-token cookie
  - `POST /auth/logout` — clear cookies
  - `POST /auth/refresh` — rotate access token từ refresh_token cookie
  - `GET /auth/me`
  - `POST /auth/forgot-password`
  - `POST /auth/reset-password`
  - `JwtAuthGuard`, `RolesGuard`, `@Roles()` decorator
  - `@nestjs/throttler` rate limit cho `/login`, `/register`
- `BE-02` ✅ Email module (nodemailer fire-and-forget):
  - `sendVerificationEmail`, `sendPasswordResetEmail`, `sendOrderConfirmationEmail`, `sendDeliveryUpdateEmail`
  - Config: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM`, `FE_URL`
- `BE-03` ✅ Products module (public):
  - `GET /products` — full-text search, filter villageId/price, sort, pagination
  - `GET /products/featured`
  - `GET /products/:id`
  - `GET /products/:id/related`
  - `GET /products/:id/reviews` (paginated, chỉ APPROVED)
  - `POST /products/:id/reviews` — validate đã mua (DELIVERED order) + chưa review
- `BE-04` ✅ Villages module (public):
  - `GET /villages`
  - `GET /villages/:slug`
- `BE-05` ⚠️ Static Content module:
  - `GET /static-content/:key` — ✅ implemented
  - Seed 4 records — **chưa implement** (cần tạo seed script)

**FE**
- `FE-01` Auth screens:
  - `/login`, `/register`, `/forgot-password`, `/reset-password`
  - Zod schemas cho mỗi form
  - Sau login: merge cart localStorage → `POST /cart/merge`, update authStore, redirect
- `FE-02` Trang chủ `/`:
  - Hero video background (autoplay, muted, loop; mobile: ảnh tĩnh)
  - Featured products grid — skeleton loading, empty state ẩn section
  - Villages grid (5 cards) — fallback slug hardcoded nếu fetch lỗi
  - AR guide section 3 bước (static)
- `FE-03` Shop `/shop`:
  - Product grid, skeleton 12 cards
  - Tìm kiếm debounce 300ms
  - Filter làng nghề multi-select, filter giá range, sort dropdown
  - Nút "Xóa bộ lọc"
  - Pagination, sync query params vào URL
  - Empty state + Error state + Retry
- `FE-04` Chi tiết sản phẩm `/products/:id`:
  - `<model-viewer>` GLB, hotspot tooltip, loading skeleton; glbUrl null → gallery full-width
  - Gallery ảnh + lightbox
  - Chọn số lượng, "Thêm vào giỏ", "Mua ngay", wishlist button
  - Tab Video (YouTube iframe vs HTML5 `<video>`)
  - QR code (`qrcode.react`), nút tải PNG
  - Tab Làng nghề (info + link)
  - Review list + phân trang + form đánh giá (chỉ hiện khi đủ điều kiện)
  - Related products grid
  - stock=0 → disable CTA + badge "Hết hàng"
- `FE-05` Trang làng nghề `/villages/:slug`:
  - Hero (video/ảnh), fullHistory HTML, artisan story + quote nổi bật
  - Timeline 4 giai đoạn: VideoPlayer + gallery
  - Products grid
  - 404 state, loading skeleton
- `FE-06` Nội dung tĩnh `/pages/:key`:
  - Render `dangerouslySetInnerHTML` nội dung từ API

---

## Sprint 2 — Cart + Orders + User Profile

**BE**
- `BE-06` ✅ Upload module:
  - `POST /upload` — Multer buffer, validate type/size (50MB max), lưu vào `uploads/<type>/`, trả về URL
- `BE-07` ✅ Cart module:
  - `GET /cart`, `POST /cart/items`, `PATCH /cart/items/:productId`, `DELETE /cart/items/:productId`, `DELETE /cart`, `POST /cart/merge`
  - Validate stock khi add/update; merge guest items vào server cart
- `BE-08` ✅ Orders module:
  - `POST /orders` — guest + customer, validate stock, sinh `orderCode`, mock Payment URL nếu `paymentMethod=vnpay`, clear cart sau khi tạo
  - `GET /orders` (customer — lịch sử), `GET /orders/:id`
- `BE-09` ✅ Payments module (mock):
  - `GET /payments/return` — verify mock signature, cập nhật payment.status
  - `POST /payments/ipn` — cập nhật payment.status, trả `{RspCode, Message}`
- `BE-10` ✅ Email jobs bổ sung (included in BE-02):
  - `sendOrderConfirmationEmail`, `sendDeliveryUpdateEmail` — đã implement trong EmailService
- `BE-11` ✅ Addresses module:
  - `GET /addresses`, `POST /addresses`, `PATCH /addresses/:id`, `DELETE /addresses/:id` (soft delete), `PATCH /addresses/:id/default`
- `BE-12` ✅ Wishlist module (repository đã implement đủ):
  - `GET /wishlist`, `POST /wishlist/:productId`, `DELETE /wishlist/:productId`
- `BE-13` ✅ Users/Profile module:
  - `PATCH /users/me`, `PATCH /users/me/password`, `PATCH /users/me/avatar` (lưu file vào `uploads/avatars/`)

**FE**
- `FE-07` Giỏ hàng `/cart`:
  - Guest: đọc/ghi cartStore (Zustand)
  - Customer: sync server, tăng/giảm số lượng, xóa item/toàn bộ
  - Badge real-time trên header
  - Empty state + loading skeleton
- `FE-08` Checkout `/checkout`:
  - Items từ cart (Zustand hoặc server)
  - Form shipping với Zod validation; Customer đã login tự điền từ địa chỉ mặc định
  - Radio: COD | Chuyển khoản (hiện thông tin tài khoản + QR tĩnh) | Payment
  - Order review (sản phẩm, địa chỉ, tổng) trước khi submit
  - Redirect cart trống
- `FE-09` Payment return `/checkout/payment-return` + Order success `/checkout/success`
- `FE-10` Profile `/profile`:
  - Sửa fullName, phone; upload avatar; đổi mật khẩu
- `FE-11` Quản lý địa chỉ `/profile/addresses`:
  - CRUD + set default; form validation; empty state
- `FE-12` Lịch sử đơn hàng `/profile/orders` + Chi tiết đơn `/orders/:id`:
  - Filter tabs theo status
  - Timeline trạng thái, trackingCode, danh sách sản phẩm, nút "Viết đánh giá"
- `FE-13` Wishlist `/profile/wishlist`:
  - Grid sản phẩm, "Thêm vào giỏ", xóa khỏi wishlist

---

## Sprint 3 — Admin + AR + i18n

**BE**
- `BE-14` ✅ Admin — Products:
  - `GET /admin/products`, `POST /admin/products`, `GET /admin/products/:id`, `PATCH /admin/products/:id`, `DELETE /admin/products/:id` (soft delete)
  - `PATCH /admin/products/:id/visibility`, `PATCH /admin/products/:id/featured`
- `BE-15` ✅ Admin — Hotspots:
  - `GET /admin/products/:productId/hotspots`, `POST /admin/products/:productId/hotspots`, `PATCH /admin/hotspots/:id`, `DELETE /admin/hotspots/:id`
- `BE-16` ✅ Admin — Villages:
  - `GET /admin/villages`, `GET /admin/villages/:id`, `PATCH /admin/villages/:id`
  - `POST /admin/villages/:villageId/stages`, `PATCH /admin/stages/:id`, `DELETE /admin/stages/:id`
- `BE-17` ✅ Admin — Orders:
  - `GET /admin/orders`, `GET /admin/orders/:id`
  - `PATCH /admin/orders/:id/status` — state machine validation (PENDING→PACKING→SHIPPING→DELIVERED, hoặc CANCELLED từ PENDING/PACKING), trigger `sendDeliveryUpdateEmail`
- `BE-18` ✅ Admin — Reviews:
  - `GET /admin/reviews`, `PATCH /admin/reviews/:id/status`, `DELETE /admin/reviews/:id`
- `BE-19` ✅ Admin — Users:
  - `GET /admin/users`, `GET /admin/users/:id`, `PATCH /admin/users/:id/status`
- `BE-20` ✅ Admin — Dashboard:
  - `GET /admin/dashboard/stats` — aggregate orders/revenue/newUsers/totalProducts theo period (today/week/month/year)
  - ⚠️ CSV export — **chưa implement**
- `BE-21` ✅ Admin — Static Content:
  - `GET /admin/static-content`, `PATCH /admin/static-content/:key`

**FE**
- `FE-14` Admin — Dashboard `/admin`:
  - Stats cards (đơn hàng, doanh thu, user mới, AR views)
  - Recharts `LineChart` doanh thu, `BarChart` top products
  - Period selector (Today/Week/Month/Year)
- `FE-15` Admin — Danh sách sản phẩm `/admin/products`:
  - Bảng có search, filter, toggle visibility/featured, soft delete, link đến Edit + Hotspot
- `FE-16` Admin — Thêm/Sửa sản phẩm `/admin/products/new` + `/admin/products/:id/edit`:
  - Form Zod đầy đủ (name VI/EN, description VI/EN, price, stock, villageId)
  - Multi-upload ảnh (kéo thả), upload GLB/USDZ/video/AR-tracking files qua `POST /upload`
  - QR tự động hiển thị sau khi sản phẩm tạo xong
- `FE-17` Admin — Hotspots `/admin/products/:id/hotspots`:
  - List + form thêm/sửa/xóa hotspot, upload ảnh
- `FE-18` Admin — Villages `/admin/villages` + `/admin/villages/:id/edit`:
  - Tiptap rich text cho fullHistory VI/EN, artisanStory VI/EN
  - Stages CRUD trong cùng trang edit
- `FE-19` Admin — Orders `/admin/orders` + `/admin/orders/:id`:
  - List có filter tabs + search
  - Detail: cập nhật status (dropdown → validate transition), nhập trackingCode, ghi chú nội bộ
- `FE-20` Admin — Reviews `/admin/reviews`:
  - List có filter status/rating; actions: duyệt, ẩn, xóa
- `FE-21` Admin — Users `/admin/users`:
  - List có search; lock/unlock với confirm dialog
- `FE-22` Admin — Static Content `/admin/static-content`:
  - 4 tabs (FAQ, đổi trả, vận chuyển, liên hệ); Tiptap VI/EN tabs mỗi tab
- `FE-23` AR Experience `/ar/:id`:
  - Màn hình khởi động (tên SP, ảnh preview, nút "Bắt đầu AR")
  - Xin quyền camera (`getUserMedia`); từ chối → fallback `<model-viewer>` + hướng dẫn
  - Load tracking files với progress indicator
  - AR.js NFT tracking → Three.js load GLB + animation loop
  - Mất dấu → overlay hướng dẫn; nhận lại → tự tiếp tục
  - Tap model → info card (hotspot đầu tiên)
  - arTrackingFsetUrl null → skip tracking, hiện `<model-viewer>` + thông báo "Asset AR đang cập nhật"
  - Desktop → redirect `/products/:id` với thông báo
  - Nút "X" → navigate về `/products/:id`
- `FE-24` i18n hoàn thiện:
  - Điền đầy đủ tất cả keys trong `vi.json` và `en.json`
  - Kiểm tra toàn bộ UI label, error message, validation message, AR guide
  - Language switch trên header lưu vào localStorage

---

## Sprint 4 — Integration + Testing + Polish

**Smoke test luồng chính**
- Guest: duyệt shop → xem sản phẩm → thêm vào giỏ → checkout COD → xem order success
- Customer: đăng ký → verify email → đăng nhập → merge cart → checkout Payment → theo dõi đơn → viết đánh giá
- Admin: login → tạo sản phẩm (upload ảnh/GLB) → cập nhật trạng thái đơn → duyệt đánh giá → xem dashboard
- AR: mobile Chrome Android + Safari iOS — camera permission, tracking, fallback

**Testing BE** (target: Service layer ≥ 70%, tổng BE ≥ 65%)
- Unit tests (`*.spec.ts`) cho toàn bộ Service: Auth, Products, Reviews, Cart, Orders, Payments, Wishlist, Admin modules
- Edge cases bắt buộc: race condition add-to-cart cùng lúc, order với stock = 0, review duplicate
- Prompt injection: NoSQL injection trong search params, template syntax trong text fields
- Integration test (`*.e2e-spec.ts`): Auth flow (register → verify → login → refresh → logout) dùng `MONGODB_URI_TEST`
- Export coverage report → `docs/coverage/`

**Testing FE** (target: component ≥ 50%)
- Component tests (`*.test.tsx`) cho: LoginForm, RegisterForm, CheckoutForm, CartItem, ProductCard, OrderTimeline, AdminOrderStatusForm
- Hook tests: `useCart`, `useAuth` (mock Axios)
- Export coverage report → `docs/coverage/`

**Polish**
- Seed script demo: 5 làng nghề, 10+ sản phẩm (có ảnh placeholder), 1 admin account, 1 customer account
- README: hướng dẫn setup + chạy local (docker-compose up + pnpm dev)
- Kiểm tra responsive mobile (375px) cho toàn bộ public screens
- Kiểm tra 404/403/500 error states trên mọi trang

---

## Nguyên tắc thực hiện

- BE implement endpoint trước FE implement screen tương ứng — tránh FE bị block
- Must-have hoàn thành trước khi làm AR và i18n chi tiết
- Mỗi feature BE phải có response đúng contract trước khi FE gọi — dùng Swagger `/api/docs` để verify
- Không skip test khi fail — fix root cause
- Không commit `.env` thật, chỉ commit `.env.example`
