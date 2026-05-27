# UI Screens

> Dự án: OCNV | Phiên bản: 1.0 — 26/05/2026 | Trạng thái: Approved

---

## Screen Index

| # | Màn hình | Route | Actor | Auth |
|---|----------|-------|-------|------|
| 1 | Trang chủ | `/` | Guest, Customer | No |
| 2 | Cửa hàng | `/shop` | Guest, Customer | No |
| 3 | Chi tiết sản phẩm | `/products/:id` | Guest, Customer | No |
| 4 | Trải nghiệm AR | `/ar/:id` | Guest, Customer | No |
| 5 | Trang làng nghề | `/villages/:slug` | Guest, Customer | No |
| 6 | Nội dung tĩnh | `/pages/:key` | Guest, Customer | No |
| 7 | Giỏ hàng | `/cart` | Guest, Customer | No |
| 8 | Thanh toán | `/checkout` | Guest, Customer | No |
| 9 | Kết quả thanh toán | `/checkout/payment-return` | Guest, Customer | No |
| 10 | Xác nhận đơn hàng | `/checkout/success` | Guest, Customer | No |
| 11 | Đăng nhập | `/login` | Guest | No |
| 12 | Đăng ký | `/register` | Guest | No |
| 13 | Quên mật khẩu | `/forgot-password` | Guest | No |
| 14 | Đặt lại mật khẩu | `/reset-password` | Guest | No |
| 15 | Thông tin cá nhân | `/profile` | Customer | Yes |
| 16 | Quản lý địa chỉ | `/profile/addresses` | Customer | Yes |
| 17 | Lịch sử đơn hàng | `/profile/orders` | Customer | Yes |
| 18 | Chi tiết đơn hàng | `/orders/:id` | Customer | Yes |
| 19 | Wishlist | `/profile/wishlist` | Customer | Yes |
| 20 | Admin — Dashboard | `/admin` | Admin | Yes |
| 21 | Admin — Danh sách sản phẩm | `/admin/products` | Admin | Yes |
| 22 | Admin — Thêm/Sửa sản phẩm | `/admin/products/new`, `/admin/products/:id/edit` | Admin | Yes |
| 23 | Admin — Quản lý Hotspot | `/admin/products/:id/hotspots` | Admin | Yes |
| 24 | Admin — Danh sách làng nghề | `/admin/villages` | Admin | Yes |
| 25 | Admin — Sửa làng nghề | `/admin/villages/:id/edit` | Admin | Yes |
| 26 | Admin — Danh sách đơn hàng | `/admin/orders` | Admin | Yes |
| 27 | Admin — Chi tiết đơn hàng | `/admin/orders/:id` | Admin | Yes |
| 28 | Admin — Quản lý đánh giá | `/admin/reviews` | Admin | Yes |
| 29 | Admin — Quản lý người dùng | `/admin/users` | Admin | Yes |
| 30 | Trang lỗi 404 | `*` (catch-all) | Guest, Customer, Admin | No |

---

## 1. Trang chủ — `/`

**Actor**: Guest, Customer | **Auth**: No

**Data hiển thị**:
- Hero video background: hardcoded asset URL (YouTube embed hoặc `/static/videos/hero.mp4`)
- Sản phẩm nổi bật: `GET /api/v1/products/featured` → `data[]` (name, price, mainImageUrl, village.name)
- Danh sách làng nghề: `GET /api/v1/villages` → `data[]` (name, tagline, shortDescription, coverImageUrl, slug)
- Section AR guide: static content (3 bước hardcoded, ảnh/GIF minh họa)

**Actions**:
- Card sản phẩm — nút "Thêm vào giỏ": Customer → `POST /api/v1/cart/items` với `{ productId, quantity: 1 }`
  → Success: toast "Đã thêm vào giỏ hàng", cập nhật badge giỏ hàng trên header
  → Error 400 INSUFFICIENT_STOCK: toast "Sản phẩm đã hết hàng"
  → Unauthenticated: lưu vào localStorage `cart`
- Card sản phẩm — click: navigate `/products/:id`
- Card làng nghề — click: navigate `/villages/:slug`
- Nút "Xem demo AR": navigate `/ar/:id` (dùng id sản phẩm featured đầu tiên)

**Edge cases**:
- Loading: skeleton grid 6 cards cho featured products, skeleton 5 cards cho villages
- Empty featured: không hiện section (ẩn hoàn toàn nếu `data.length === 0`)
- Error fetch: hiện section làng nghề tĩnh (5 làng cố định, dùng slug hardcoded)

---

## 2. Cửa hàng — `/shop`

**Actor**: Guest, Customer | **Auth**: No

**Data hiển thị**:
- Danh sách sản phẩm: `GET /api/v1/products?page&limit&search&villageId&minPrice&maxPrice&sort` → `data.items[]`, `data.total`
- Filter làng nghề: `GET /api/v1/villages` → `data[]` (dùng `_id` làm giá trị filter)
- Query params đồng bộ vào URL (search, villageId, minPrice, maxPrice, sort, page)

**Actions**:
- Tìm kiếm: debounce 300ms, cập nhật query param `search`, gọi lại API
- Lọc làng nghề (multi-select checkbox): cập nhật `villageId` (comma-separated)
- Lọc giá (range input): cập nhật `minPrice`, `maxPrice`
- Sắp xếp: `sort = newest | price_asc | price_desc | popular`
- Nút "Xóa bộ lọc": reset tất cả query params về mặc định
- Phân trang: cập nhật `page`
- Click card sản phẩm: navigate `/products/:id`
- Nút "Thêm vào giỏ" trên card: tương tự trang chủ

**Edge cases**:
- Loading: skeleton grid 12 cards
- Empty (0 kết quả): "Không tìm thấy sản phẩm phù hợp. Thử thay đổi bộ lọc."
- Error fetch: "Không thể tải sản phẩm. Vui lòng thử lại." + nút Retry

---

## 3. Chi tiết sản phẩm — `/products/:id`

**Actor**: Guest, Customer | **Auth**: No

**Data hiển thị**:
- Sản phẩm: `GET /api/v1/products/:id` → tất cả fields (name, description, price, stock, images, glbUrl, hotspots, village, averageRating, reviewCount, processVideoUrl)
- Đánh giá: `GET /api/v1/products/:id/reviews?page&limit` → `data.items[]`, `data.total`, `data.averageRating`
- Sản phẩm liên quan: `GET /api/v1/products/:id/related?limit=6` → `data[]`
- Wishlist status: `GET /api/v1/wishlist` (nếu đã login) → kiểm tra `productId` có trong list
- Có thể đánh giá: kiểm tra `GET /api/v1/orders?status=delivered` → tìm order có item `productId` và `isReviewed=false`

**Actions**:
- Nút "Thêm vào giỏ": `POST /api/v1/cart/items` với `{ productId, quantity }`
  → Success: toast "Đã thêm vào giỏ hàng"
  → Error 400 INSUFFICIENT_STOCK: toast "Chỉ còn X sản phẩm trong kho"
  → Unauthenticated: lưu localStorage
- Nút "Mua ngay": thêm vào giỏ rồi navigate `/checkout`
- Nút trái tim (wishlist): Customer → `POST /api/v1/wishlist/:productId` hoặc `DELETE /api/v1/wishlist/:productId`
  → Unauthenticated: navigate `/login`
- Nút "Xem AR" — mobile: navigate `/ar/:id`; desktop: hiện modal hướng dẫn quét QR
- Click hotspot trên `<model-viewer>`: hiện tooltip với `title[lang]`, `content[lang]`, `imageUrl`
- Tab Video: nếu `processVideoUrl` chứa `youtube.com` → YouTube iframe; ngược lại → HTML5 `<video>`
- Form đánh giá (chỉ hiện khi Customer đã mua, chưa đánh giá): `POST /api/v1/products/:id/reviews` với `{ orderId, rating, content, imageUrls }`
  → Success: toast "Đánh giá đã gửi, chờ kiểm duyệt", ẩn form
  → Error 409 ALREADY_REVIEWED: ẩn form ngay (data stale)

**Edge cases**:
- Loading: skeleton layout 2 cột (gallery trái, info phải)
- glbUrl null: ẩn `<model-viewer>`, hiện gallery ảnh full-width
- stock = 0: disable nút "Thêm vào giỏ" + "Mua ngay", hiện badge "Hết hàng"
- Đánh giá loading: skeleton 3 rows

---

## 4. Trải nghiệm AR — `/ar/:id`

**Actor**: Guest, Customer | **Auth**: No

**Data hiển thị**:
- Tên sản phẩm, ảnh preview: `GET /api/v1/products/:id` → `data.name[lang]`, `data.images[0].url`
- AR tracking files: `data.arTrackingFsetUrl`, `data.arTrackingFset3Url`, `data.arTrackingIsetUrl`
- GLB model: `data.glbUrl`
- Hotspot info: `data.hotspots[]`

**Actions**:
- Nút "Bắt đầu AR": xin quyền camera (`getUserMedia`)
  → Từ chối: hiện hướng dẫn cấp quyền + fallback `<model-viewer>`
  → Không hỗ trợ: fallback `<model-viewer>` ngay
- Tap vào model trong AR: hiện `ArInfoCard` với tên, mô tả (từ hotspot đầu tiên hoặc thông tin sản phẩm)
- Nút "X": dừng camera, navigate `/products/:id`
- v1: nếu `arTrackingFsetUrl` null → bỏ qua tracking, hiển thị `<model-viewer>` với thông báo "Asset AR đang cập nhật"

**Edge cases**:
- Loading tracking data: progress indicator (% loaded)
- Mất dấu mô hình: overlay "Hướng camera vào ảnh target" + icon hướng dẫn
- Mobile-only: desktop → redirect về `/products/:id` với thông báo "AR chỉ hỗ trợ trên thiết bị di động"

---

## 5. Trang làng nghề — `/villages/:slug`

**Actor**: Guest, Customer | **Auth**: No

**Data hiển thị**:
- Village: `GET /api/v1/villages/:slug` → tất cả fields (name, tagline, fullHistory, coverImageUrl, introVideoUrl, artisanImageUrl, artisanStory, artisanQuote, stages[])
- Sản phẩm của làng: `GET /api/v1/products?villageId=:id&limit=8&sort=newest` → `data.items[]`

**Actions**:
- Click card sản phẩm: navigate `/products/:id`
- VideoPlayer: nếu `introVideoUrl` chứa `youtube.com` → YouTube iframe; ngược lại → `<video>`
- Stage VideoPlayer: tương tự theo `stages[i].videoUrl`

**Edge cases**:
- Loading: skeleton hero + skeleton sections
- coverImageUrl null: dùng gradient placeholder

---

## 6. Nội dung tĩnh — `/pages/:key`

**Actor**: Guest, Customer | **Auth**: No
**key**: `faq` | `return-policy` | `shipping-policy` | `contact`

**Data hiển thị**:
- `GET /api/v1/static-content/:key` → `data.content[lang]` (HTML), `data.updatedAt`
- Render HTML bằng `dangerouslySetInnerHTML` (nội dung do admin nhập, trusted source)

**Edge cases**:
- Loading: skeleton text block

---

## 7. Giỏ hàng — `/cart`

**Actor**: Guest, Customer | **Auth**: No

**Data hiển thị**:
- Guest: đọc từ Zustand `cartStore` (localStorage-backed) → tính subtotal, shippingFee, total client-side
- Customer: `GET /api/v1/cart` → `data.items[]`, `data.subtotal`, `data.shippingFee`, `data.total`
- Mỗi item: `product.name[lang]`, `product.price`, `product.mainImageUrl`, `quantity`, thành tiền

**Actions**:
- Tăng/giảm số lượng:
  - Customer: `PATCH /api/v1/cart/items/:productId` với `{ quantity }`
    → Error 400 INSUFFICIENT_STOCK: giữ nguyên quantity cũ + toast
  - Guest: cập nhật Zustand store
- Xóa item:
  - Customer: `DELETE /api/v1/cart/items/:productId`
  - Guest: remove khỏi Zustand store
- Xóa toàn bộ:
  - Customer: `DELETE /api/v1/cart`
  - Guest: reset Zustand store
- Nút "Tiếp tục mua sắm": navigate `/shop`
- Nút "Đặt hàng": navigate `/checkout`

**Edge cases**:
- Loading: skeleton list 3 items
- Empty cart: illustration + "Giỏ hàng trống" + nút "Khám phá sản phẩm" → `/shop`
- Stock thay đổi: nếu `quantity > stock` hiện badge "Chỉ còn X" và disable nút tăng

---

## 8. Thanh toán — `/checkout`

**Actor**: Guest, Customer | **Auth**: No

**Data hiển thị**:
- Items từ cart (Zustand hoặc server)
- Địa chỉ mặc định (Customer đã login): `GET /api/v1/addresses` → lấy `isDefault: true`
- Tóm tắt đơn: subtotal, shippingFee (từ env), total

**Actions**:
- Customer đã login: tự điền form shipping từ địa chỉ mặc định (editable)
- Chọn phương thức thanh toán: COD | Chuyển khoản | Payment (radio)
- Chuyển khoản: hiện thông tin tài khoản ngân hàng + QR tĩnh (hardcoded)
- Nút "Xác nhận đặt hàng": `POST /api/v1/orders` với `{ shippingAddress, items, paymentMethod, customerNote }`
  - COD/bank_transfer → Success 201: navigate `/checkout/success?orderCode=...`
  - payment → Success 201: `data.paymentUrl` có giá trị → `window.location.href = paymentUrl` (redirect sang Payment)
  → Error 400 INSUFFICIENT_STOCK: toast từng sản phẩm hết hàng + highlight item trong order review
  → Error 400 EMPTY_CART: navigate `/cart`

**Form validation (Zod)**:
- `fullName`: required, min 2
- `phone`: required, regex Vietnam phone
- `province`, `district`, `ward`, `street`: required

**Edge cases**:
- Loading submit: disable nút, hiện spinner
- Cart trống khi vào `/checkout`: redirect `/cart`

---

## 9. Kết quả thanh toán — `/checkout/payment-return`

**Actor**: Guest, Customer | **Auth**: No

**Luồng**:
- Payment redirect về `PAYMENT_RETURN_URL` (BE xử lý, rồi redirect FE)
- FE đọc query params `result=success|failed` và `orderCode`

**Data hiển thị**:
- Success: icon check xanh + "Thanh toán thành công!" + `orderCode`
- Failed: icon X đỏ + "Thanh toán thất bại hoặc đã hủy" + `orderCode`

**Actions**:
- Success: nút "Xem chi tiết đơn hàng" → `/orders/:id` (resolve id từ orderCode nếu có, hoặc `/profile/orders`)
- Failed: nút "Thử lại" → `/checkout`; nút "Về trang chủ" → `/`

---

## 10. Xác nhận đơn hàng — `/checkout/success`

**Actor**: Guest, Customer | **Auth**: No

**Data hiển thị**:
- `orderCode` từ query param
- Thông báo "Đơn hàng đã được đặt thành công!"
- "Email xác nhận đã được gửi đến [email]" (nếu Customer đã login)

**Actions**:
- Customer: nút "Xem đơn hàng" → `/orders/:id`
- Guest: nút "Tiếp tục mua sắm" → `/shop`

---

## 11. Đăng nhập — `/login`

**Actor**: Guest | **Auth**: No

**Actions**:
- Submit form: `POST /api/v1/auth/login` với `{ email, password }`
  → Success: lưu user vào Zustand `authStore`, merge cart localStorage → `POST /api/v1/cart/merge`, navigate về trang trước hoặc `/`
  → Error 401 INVALID_CREDENTIALS: "Email hoặc mật khẩu không đúng"
  → Error 403 ACCOUNT_LOCKED: "Tài khoản đã bị khóa. Liên hệ hỗ trợ."
  → Error 403 EMAIL_NOT_VERIFIED: "Vui lòng xác thực email trước khi đăng nhập." + link "Gửi lại email xác thực"
- Link "Quên mật khẩu": navigate `/forgot-password`
- Link "Đăng ký": navigate `/register`

**Form validation (Zod)**:
- `email`: required, valid email
- `password`: required, min 1 (không validate strength ở login)

**Edge cases**:
- Loading submit: disable form, hiện spinner
- Đã đăng nhập → redirect `/`

---

## 12. Đăng ký — `/register`

**Actor**: Guest | **Auth**: No

**Actions**:
- Submit: `POST /api/v1/auth/register` với `{ fullName, email, password }`
  → Success 201: navigate `/register/success` (hoặc hiện inline message "Kiểm tra email để xác thực tài khoản")
  → Error 409 CONFLICT: "Email này đã được đăng ký"

**Form validation (Zod)**:
- `fullName`: required, min 2
- `email`: required, valid email
- `password`: required, min 8
- `confirmPassword`: phải khớp `password`

---

## 13. Quên mật khẩu — `/forgot-password`

**Actor**: Guest | **Auth**: No

**Actions**:
- Submit: `POST /api/v1/auth/forgot-password` với `{ email }`
  → Success (luôn hiện): "Nếu email tồn tại, chúng tôi đã gửi hướng dẫn đặt lại mật khẩu."
- Link "Quay lại đăng nhập": navigate `/login`

---

## 14. Đặt lại mật khẩu — `/reset-password`

**Actor**: Guest | **Auth**: No
**Query param**: `token` (từ link email)

**Actions**:
- Submit: `POST /api/v1/auth/reset-password` với `{ token, password }`
  → Success: toast "Mật khẩu đã được cập nhật" + navigate `/login`
  → Error 400 INVALID_TOKEN: "Link đã hết hạn hoặc không hợp lệ. Vui lòng yêu cầu lại."

**Form validation (Zod)**:
- `password`: required, min 8
- `confirmPassword`: phải khớp

**Edge cases**:
- Không có `token` trong URL: navigate `/forgot-password`

---

## 15. Thông tin cá nhân — `/profile`

**Actor**: Customer | **Auth**: Yes

**Data hiển thị**:
- `GET /api/v1/auth/me` → `data` (fullName, email, phone, avatarUrl)

**Actions**:
- Sửa fullName, phone: `PATCH /api/v1/users/me` với `{ fullName, phone }`
  → Success: toast "Đã lưu", cập nhật authStore
- Upload avatar: `PATCH /api/v1/users/me/avatar` (multipart, field `avatar`)
  → Success: cập nhật `avatarUrl` trong authStore + hiện ảnh mới
  → Error 400 FILE_TOO_LARGE: "Ảnh tối đa 10MB"
- Đổi mật khẩu: `PATCH /api/v1/users/me/password` với `{ currentPassword, newPassword }`
  → Error 400 WRONG_PASSWORD: "Mật khẩu hiện tại không đúng"

**Tab navigation**: Profile | Địa chỉ | Lịch sử đơn | Wishlist (links đến các route tương ứng)

---

## 16. Quản lý địa chỉ — `/profile/addresses`

**Actor**: Customer | **Auth**: Yes

**Data hiển thị**:
- `GET /api/v1/addresses` → `data[]`

**Actions**:
- Thêm địa chỉ: `POST /api/v1/addresses`
  → Success: thêm vào list, toast "Đã thêm địa chỉ"
- Sửa địa chỉ: `PATCH /api/v1/addresses/:id`
- Xóa địa chỉ: `DELETE /api/v1/addresses/:id` + confirm dialog
- Đặt mặc định: `PATCH /api/v1/addresses/:id/default`
  → Success: badge "Mặc định" chuyển sang địa chỉ mới

**Edge cases**:
- Empty: "Chưa có địa chỉ nào. Thêm địa chỉ đầu tiên."
- Form validation: tất cả fields required

---

## 17. Lịch sử đơn hàng — `/profile/orders`

**Actor**: Customer | **Auth**: Yes

**Data hiển thị**:
- `GET /api/v1/orders?page&limit&status` → `data.items[]` (orderCode, status, total, paymentMethod, paymentStatus, itemCount, createdAt)
- Filter tabs: Tất cả | Đang xử lý | Đang giao | Đã nhận | Đã huỷ

**Actions**:
- Click đơn hàng: navigate `/orders/:id`

**Edge cases**:
- Loading: skeleton 5 rows
- Empty: "Chưa có đơn hàng nào"

---

## 18. Chi tiết đơn hàng — `/orders/:id`

**Actor**: Customer | **Auth**: Yes

**Data hiển thị**:
- `GET /api/v1/orders/:id` → tất cả fields (orderCode, status, statusHistory, shippingAddress, items[], subtotal, shippingFee, total, payment, trackingCode, customerNote)
- Timeline trạng thái: Đang xử lý → Đóng gói → Đang giao → Đã nhận (highlight current, grey out future)

**Actions**:
- Nút "Viết đánh giá" (chỉ hiện khi `status=delivered` và `item.isReviewed=false`): navigate `/products/:productId` với anchor `#reviews`
- Nút "Liên hệ hỗ trợ": mailto hoặc link Zalo với `orderCode` prefilled

**Edge cases**:
- 403: "Bạn không có quyền xem đơn hàng này"

---

## 19. Wishlist — `/profile/wishlist`

**Actor**: Customer | **Auth**: Yes

**Data hiển thị**:
- `GET /api/v1/wishlist` → `data[]` (name, price, mainImageUrl, stock)

**Actions**:
- Nút "Thêm vào giỏ": `POST /api/v1/cart/items` với `{ productId, quantity: 1 }`
- Nút xóa khỏi wishlist: `DELETE /api/v1/wishlist/:productId`
- Click card: navigate `/products/:id`

**Edge cases**:
- Loading: skeleton grid 4 cards
- Empty: "Wishlist trống. Thêm sản phẩm bạn yêu thích."

---

## 20. Admin — Dashboard — `/admin`

**Actor**: Admin | **Auth**: Yes

**Data hiển thị**:
- `GET /api/v1/admin/dashboard/stats?period=month` → `data` (orders.total/pending/delivered/cancelled, revenue, revenueChart[], topProducts[], newUsers, arViews)
- Selector period: Today | Week | Month | Year (re-fetch khi thay đổi)
- Charts: Recharts `LineChart` cho doanh thu, `BarChart` / table cho top products

**Actions**:
- Period selector: cập nhật query `period`, refetch stats
- Click row top product: navigate `/admin/products/:id/edit`

**Edge cases**:
- Loading: skeleton stats cards + skeleton chart

---

## 21. Admin — Danh sách sản phẩm — `/admin/products`

**Actor**: Admin | **Auth**: Yes

**Data hiển thị**:
- `GET /api/v1/admin/products?page&limit&search&villageId&isVisible` → paginated list (name.vi, price, stock, isVisible, isFeatured, village.name.vi, createdAt)

**Actions**:
- Tìm kiếm: debounce 300ms
- Toggle visibility: `PATCH /api/v1/admin/products/:id/visibility`
- Toggle featured: `PATCH /api/v1/admin/products/:id/featured`
- Soft delete: `DELETE /api/v1/admin/products/:id` + confirm dialog
- Nút "Thêm sản phẩm": navigate `/admin/products/new`
- Click "Sửa": navigate `/admin/products/:id/edit`
- Click "Hotspot": navigate `/admin/products/:id/hotspots`

---

## 22. Admin — Thêm/Sửa sản phẩm — `/admin/products/new` và `/admin/products/:id/edit`

**Actor**: Admin | **Auth**: Yes

**Data hiển thị** (edit only):
- `GET /api/v1/admin/products/:id` → prefill form
- `GET /api/v1/admin/villages` → options cho dropdown làng nghề

**Actions**:
- Upload ảnh: `POST /api/v1/upload` với `type=image` → nhận URL → thêm vào `images[]`
- Upload GLB: `POST /api/v1/upload` với `type=model`
- Upload USDZ: `POST /api/v1/upload` với `type=model`
- Upload video: `POST /api/v1/upload` với `type=video`
- Upload AR files: `POST /api/v1/upload` với `type=ar-tracking`
- Submit (new): `POST /api/v1/admin/products`
  → Success 201: navigate `/admin/products`, toast "Đã tạo sản phẩm"
- Submit (edit): `PATCH /api/v1/admin/products/:id`
  → Success: toast "Đã lưu"

**Form validation (Zod)**:
- `name.vi`, `name.en`: required
- `description.vi`, `description.en`: required
- `price`: required, min 0
- `stock`: required, min 0
- `villageId`: required

---

## 23. Admin — Quản lý Hotspot — `/admin/products/:id/hotspots`

**Actor**: Admin | **Auth**: Yes

**Data hiển thị**:
- `GET /api/v1/admin/products/:productId/hotspots` → `data[]` (slotName, position, normal, title, content, imageUrl)

**Actions**:
- Thêm hotspot: `POST /api/v1/admin/products/:productId/hotspots`
- Sửa hotspot: `PATCH /api/v1/admin/hotspots/:id`
- Xóa hotspot: `DELETE /api/v1/admin/hotspots/:id` + confirm dialog
- Upload ảnh hotspot: `POST /api/v1/upload` với `type=image`

---

## 24. Admin — Danh sách làng nghề — `/admin/villages`

**Actor**: Admin | **Auth**: Yes

**Data hiển thị**:
- `GET /api/v1/admin/villages` → `data[]` (name.vi, slug, coverImageUrl)
- 5 làng nghề cố định, không có thêm/xóa

**Actions**:
- Click "Sửa": navigate `/admin/villages/:id/edit`

---

## 25. Admin — Sửa làng nghề — `/admin/villages/:id/edit`

**Actor**: Admin | **Auth**: Yes

**Data hiển thị**:
- `GET /api/v1/admin/villages/:id` → prefill form (bao gồm `stages[]`)

**Actions**:
- Sửa thông tin làng: `PATCH /api/v1/admin/villages/:id`
- Upload ảnh cover: `POST /api/v1/upload` với `type=image`
- Nhập `introVideoUrl` (URL YouTube hoặc local path)
- Upload ảnh nghệ nhân: `POST /api/v1/upload` với `type=image`
- Rich text editor (Tiptap) cho `fullHistory.vi`, `fullHistory.en`, `artisanStory.vi`, `artisanStory.en`
- Thêm giai đoạn: `POST /api/v1/admin/villages/:villageId/stages`
- Sửa giai đoạn: `PATCH /api/v1/admin/stages/:id`
- Xóa giai đoạn: `DELETE /api/v1/admin/stages/:id` + confirm dialog
- Upload ảnh gallery cho từng stage: `POST /api/v1/upload` với `type=image`

---

## 26. Admin — Danh sách đơn hàng — `/admin/orders`

**Actor**: Admin | **Auth**: Yes

**Data hiển thị**:
- `GET /api/v1/admin/orders?page&limit&status&search` → paginated list (orderCode, customer.fullName, total, status, paymentMethod, paymentStatus, createdAt)
- Filter tabs: Tất cả | Pending | Packing | Shipping | Delivered | Cancelled

**Actions**:
- Tìm kiếm (mã đơn / tên / SĐT): debounce 300ms
- Click row: navigate `/admin/orders/:id`

---

## 27. Admin — Chi tiết đơn hàng — `/admin/orders/:id`

**Actor**: Admin | **Auth**: Yes

**Data hiển thị**:
- `GET /api/v1/admin/orders/:id` → full order (kèm adminNote, trackingCode)

**Actions**:
- Cập nhật trạng thái: `PATCH /api/v1/admin/orders/:id/status` với `{ status, trackingCode, note }`
  → Error 400 INVALID_STATUS_TRANSITION: hiện lỗi inline "Không thể chuyển từ X sang Y"
  → Success: reload order, toast "Đã cập nhật trạng thái"


---

## 28. Admin — Quản lý đánh giá — `/admin/reviews`

**Actor**: Admin | **Auth**: Yes

**Data hiển thị**:
- `GET /api/v1/admin/reviews?page&limit&status&productId&rating` → paginated list (user.fullName, product.name.vi, rating, content, imageUrls[], status, createdAt)
- Filter: status (Chờ duyệt | Đã duyệt | Đã ẩn), rating (1–5)

**Actions**:
- Duyệt: `PATCH /api/v1/admin/reviews/:id/status` với `{ status: "approved" }`
- Ẩn: `PATCH /api/v1/admin/reviews/:id/status` với `{ status: "hidden" }`
- Xóa: `DELETE /api/v1/admin/reviews/:id` + confirm dialog

---

## 29. Admin — Quản lý người dùng — `/admin/users`

**Actor**: Admin | **Auth**: Yes

**Data hiển thị**:
- `GET /api/v1/admin/users?page&limit&search&status` → paginated list (fullName, email, role, status, orderCount, createdAt)

**Actions**:
- Tìm kiếm (tên / email): debounce 300ms
- Khoá tài khoản: `PATCH /api/v1/admin/users/:id/status` với `{ status: "locked" }` + confirm dialog
  → Error 400 CANNOT_LOCK_SELF: toast "Không thể tự khoá tài khoản của mình"
- Mở khoá: `PATCH /api/v1/admin/users/:id/status` với `{ status: "active" }`
- Click row: navigate `/admin/users/:id` (xem lịch sử mua — có thể là modal hoặc page riêng)

---

## 30. Trang lỗi 404 — `*`

**Actor**: Guest, Customer, Admin | **Auth**: No
**Route**: catch-all — React Router render khi không khớp bất kỳ route nào, hoặc khi API trả về 404 và màn hình tương ứng navigate đến route này.

**Data hiển thị**:
- Illustration lỗi 404
- Tiêu đề: "Trang không tìm thấy"
- Mô tả: "Trang bạn tìm kiếm không tồn tại hoặc đã bị xóa."

**Actions**:
- Nút "Về trang chủ": navigate `/`
- Nút "Về cửa hàng": navigate `/shop`

