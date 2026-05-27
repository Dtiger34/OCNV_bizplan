# Product Requirements Document

> Dự án: OCNV — Nền tảng Thương mại Điện tử Làng Nghề Việt Nam
> Phiên bản: 1.0 — 25/05/2026 | Trạng thái: Approved

---

## 1. Tổng quan

OCNV là nền tảng thương mại điện tử kết hợp trải nghiệm văn hóa số, cho phép người dùng khám phá và mua sản phẩm thủ công từ 5 làng nghề truyền thống Hà Nội (Bát Tràng, Vạn Phúc, Nón Chuông, Phú Vinh, Quảng Phú Cầu). Điểm khác biệt cốt lõi: mỗi sản phẩm có mô hình 3D tương tác, trải nghiệm AR qua camera điện thoại, và nội dung văn hóa phong phú về từng làng nghề. Mục tiêu v1 là ra mắt đủ luồng mua hàng end-to-end và trải nghiệm AR hoạt động trên mobile.

---

## 2. Actors & Roles

| Role | Mô tả | Quyền hạn chính |
|------|-------|-----------------|
| Guest | Người dùng chưa đăng nhập | Duyệt sản phẩm, xem làng nghề, xem AR, xem giỏ hàng (localStorage) |
| Customer | Người dùng đã đăng ký bằng email | Mua hàng, theo dõi đơn, viết đánh giá, quản lý tài khoản & địa chỉ, wishlist |
| Admin | Quản trị viên hệ thống | Toàn quyền quản lý sản phẩm, làng nghề, đơn hàng, người dùng, đánh giá, thống kê |

---

## 3. Functional Requirements

### FR-01: Trang chủ

- **Mô tả**: Landing page giới thiệu nền tảng và dẫn dắt người dùng vào các luồng chính
- **Acceptance Criteria**:
  - AC1: Hero section phát video background (autoplay, muted, loop); mobile hiện ảnh tĩnh khi băng thông yếu
  - AC2: Grid sản phẩm nổi bật do admin chọn; mỗi card có ảnh, tên, giá, tên làng nghề, nút "Thêm vào giỏ" nhanh
  - AC3: 5 card làng nghề với ảnh, tên, mô tả ngắn; click → trang làng nghề
  - AC4: Section hướng dẫn AR 3 bước với ảnh/GIF minh họa và nút "Xem demo AR"
- **Priority**: Must
- **Actor**: Guest, Customer

---

### FR-02: Trang chi tiết sản phẩm

- **Mô tả**: Trang trung tâm hiển thị đầy đủ thông tin sản phẩm kèm trải nghiệm 3D/AR
- **Acceptance Criteria**:
  - AC1: `<model-viewer>` hiển thị file `.glb`; xoay, zoom bằng chuột/ngón tay; auto-rotate khi idle; loading skeleton
  - AC2: Hotspot click trên 3D model → tooltip với tên bộ phận, chất liệu, ý nghĩa văn hóa, ảnh minh họa
  - AC3: Gallery ảnh: ảnh chính lớn + thumbnail hàng ngang + lightbox
  - AC4: Thông tin sản phẩm: tên, giá, tên làng nghề (link), mô tả, tồn kho
  - AC5: Chọn số lượng (không vượt tồn kho) + nút "Thêm vào giỏ" + nút "Mua ngay"; toast xác nhận
  - AC6: Tab "Video": VideoPlayer tự động phân biệt YouTube iframe vs Azure Blob video HTML5; mô tả ngắn bên dưới
  - AC7: Hiển thị QR code trỏ `/ar/:id`; nút tải PNG; tooltip hướng dẫn quét
  - AC8: Nút "Xem AR" — desktop hiện hướng dẫn quét QR; mobile chuyển thẳng `/ar/:id`
  - AC9: Tab "Làng nghề": ảnh, tên, mô tả ngắn, link "Xem thêm"
  - AC10: Đánh giá: danh sách với tên, sao, nội dung, ảnh thực tế, ngày; phân trang; form viết đánh giá chỉ hiện với Customer đã mua và chưa đánh giá sản phẩm đó trong đơn hàng đó
  - AC11: Grid 4–6 sản phẩm cùng làng nghề / danh mục ở cuối trang
- **Priority**: Must
- **Actor**: Guest, Customer

---

### FR-03: Trải nghiệm AR

- **Mô tả**: Trang AR mobile-first dùng AR.js NFT Image Tracking để hiển thị animation 3D đè lên camera
- **Acceptance Criteria**:
  - AC1: Màn hình khởi động hiện tên sản phẩm, ảnh preview, nút "Bắt đầu AR"
  - AC2: Xin quyền camera (`getUserMedia`); từ chối → hướng dẫn cấp quyền + fallback 3D viewer; không có camera → fallback ngay
  - AC3: Load tracking data (`.fset`, `.fset3`, `.iset`) từ Azure Blob với progress indicator
  - AC4: AR.js nhận diện image target → Three.js load `.glb` + chạy animation clip, loop liên tục
  - AC5: Mất dấu mô hình → animation dừng + overlay hướng dẫn; nhận diện lại → tự tiếp tục
  - AC6: Tap vào nhân vật → info card với tên, mô tả văn hóa; có thể scroll; nút đóng
  - AC7: Fallback 3D viewer (`<model-viewer>`) khi không hỗ trợ AR, kèm thông báo rõ
  - AC8: Nút "X" tắt camera, quay về trang sản phẩm
  - AC9: v1 dùng mock asset placeholder — tích hợp asset thật sau khi được cung cấp
- **Priority**: Must
- **Actor**: Guest, Customer

---

### FR-04: Trang Làng Nghề

- **Mô tả**: Landingpage tĩnh/CMS theo từng làng nghề — nội dung văn hóa phong phú, không cần approval flow
- **Acceptance Criteria**:
  - AC1: Hero với ảnh/video giới thiệu, tên làng nghề, tagline
  - AC2: Bài viết lịch sử & giới thiệu dài với ảnh minh họa xen kẽ
  - AC3: Section câu chuyện nghệ nhân: ảnh, đời sống, khó khăn, niềm tự hào, quote nổi bật
  - AC4: Timeline 4 giai đoạn sản xuất (Nguyên liệu → Chế tác → Xử lý → Thành phẩm); mỗi giai đoạn: tiêu đề, mô tả, VideoPlayer (YouTube/Azure), ảnh gallery
  - AC5: Grid sản phẩm thuộc làng nghề; mỗi card: ảnh, tên, giá, nút "Xem chi tiết"
  - AC6: Nội dung làng nghề do admin quản lý qua CMS (sửa text, upload ảnh/video, quản lý giai đoạn)
- **Priority**: Must
- **Actor**: Guest, Customer, Admin (CMS)

---

### FR-05: Cửa hàng (Shop)

- **Mô tả**: Trang duyệt toàn bộ sản phẩm với tìm kiếm và bộ lọc
- **Acceptance Criteria**:
  - AC1: Grid tất cả sản phẩm, mặc định mới nhất; phân trang hoặc infinite scroll
  - AC2: Tìm kiếm full-text theo tên sản phẩm và tên làng nghề; kết quả real-time debounce 300ms; hiện "Không tìm thấy" nếu rỗng
  - AC3: Lọc theo làng nghề (multi-select checkbox), khoảng giá (range input); sắp xếp: Mới nhất / Giá tăng / Giá giảm / Phổ biến; nút xóa bộ lọc
  - AC4: Section "Có thể bạn thích" cùng làng nghề khi đang xem sản phẩm
- **Priority**: Must
- **Actor**: Guest, Customer

---

### FR-06: Giỏ hàng

- **Mô tả**: Quản lý giỏ hàng với đồng bộ localStorage ↔ server
- **Acceptance Criteria**:
  - AC1: Danh sách sản phẩm: ảnh, tên, giá đơn vị, số lượng (không vượt tồn kho), thành tiền; xóa từng item; xóa toàn bộ
  - AC2: Tóm tắt: tổng số lượng, tổng tiền hàng, phí vận chuyển cố định, tổng thanh toán
  - AC3: Lưu vào `localStorage` — không mất khi đóng tab; khi đăng nhập: merge giỏ localStorage vào server
  - AC4: Nút "Tiếp tục mua sắm" → `/shop`; nút "Đặt hàng" → `/checkout`
  - AC5: Badge số lượng sản phẩm trong giỏ trên header, cập nhật real-time
- **Priority**: Must
- **Actor**: Guest (localStorage), Customer (sync server)

---

### FR-07: Đặt hàng & Thanh toán

- **Mô tả**: Luồng checkout end-to-end với 3 phương thức thanh toán
- **Acceptance Criteria**:
  - AC1: Form giao hàng: họ tên, số điện thoại, tỉnh/huyện/xã/địa chỉ cụ thể, ghi chú; Customer đã login tự điền từ địa chỉ mặc định
  - AC2: COD: chọn → xác nhận đơn ngay
  - AC3: Chuyển khoản ngân hàng: chọn → hiện thông tin tài khoản + QR ngân hàng + hướng dẫn
  - AC4: Payment sandbox: chọn → redirect sang cổng Payment; callback xử lý kết quả thành công/thất bại
  - AC5: Xem lại đơn (sản phẩm, số lượng, giá, địa chỉ, phương thức TT, tổng tiền) trước khi xác nhận
  - AC6: Sau đặt hàng: trang xác nhận với mã đơn; gửi email xác nhận kèm chi tiết đơn
- **Priority**: Must
- **Actor**: Guest (COD + điền địa chỉ thủ công), Customer

---

### FR-08: Theo dõi đơn hàng

- **Mô tả**: Trang chi tiết và trạng thái đơn hàng
- **Acceptance Criteria**:
  - AC1: Timeline trạng thái: Đang xử lý → Đang đóng gói → Đang giao → Đã nhận (→ Đã huỷ); hiện ngày giờ từng mốc
  - AC2: Mã vận đơn (nếu có) để tra cứu bên vận chuyển
  - AC3: Chi tiết: sản phẩm, số lượng, giá, địa chỉ, phương thức TT, tổng tiền
  - AC4: Nút "Liên hệ hỗ trợ" → form/email/Zalo kèm mã đơn tự động
- **Priority**: Must
- **Actor**: Customer, Guest (tra cứu bằng mã đơn nếu không đăng nhập)

---

### FR-09: Tài khoản người dùng

- **Mô tả**: Đăng ký, đăng nhập, quản lý thông tin cá nhân
- **Acceptance Criteria**:
  - AC1: Đăng ký: email, mật khẩu, xác nhận mật khẩu, họ tên; validate real-time; tài khoản active ngay lập tức
  - AC2: Đăng nhập: email + mật khẩu; Remember me (refresh token 30 ngày); thông báo lỗi cụ thể
  - AC3: Quên mật khẩu: nhập email → link reset qua email (hết hạn 1 giờ) → trang đặt mật khẩu mới
  - AC4: Trang profile: sửa họ tên, số điện thoại, ảnh đại diện; đổi mật khẩu (nhập mật khẩu cũ)
  - AC5: Quản lý địa chỉ: danh sách, thêm, sửa, xóa, đặt mặc định
  - AC6: Lịch sử đơn hàng: danh sách với mã đơn, ngày, tổng tiền, trạng thái; click → `/orders/:id`
  - AC7: Wishlist: nút trái tim trên mỗi sản phẩm; trang wishlist; thêm thẳng vào giỏ từ wishlist
- **Priority**: Must
- **Actor**: Customer

---

### FR-10: Đánh giá sản phẩm

- **Mô tả**: Hệ thống đánh giá từ người mua thực tế, có kiểm duyệt của admin
- **Acceptance Criteria**:
  - AC1: Chỉ Customer đã mua sản phẩm trong đơn đã giao mới được đánh giá; mỗi sản phẩm/đơn chỉ 1 lần
  - AC2: Form: chọn sao (1–5), nhập nội dung, upload ảnh thực tế (tối đa 3); upload video AR experience (tùy chọn)
  - AC3: Đánh giá mặc định ở trạng thái "chờ duyệt" — hiện lên trang sản phẩm sau khi admin duyệt
  - AC4: Danh sách đánh giá: tên người dùng, sao, nội dung, ảnh, ngày đăng; phân trang
- **Priority**: Must
- **Actor**: Customer (viết), Admin (duyệt/ẩn/xóa)

---

### FR-11: Email tự động

- **Mô tả**: Hệ thống email transactional cho các sự kiện quan trọng
- **Acceptance Criteria**:
  - AC1: Email đặt lại mật khẩu (link reset, hết hạn 1h)
  - AC2: Email xác nhận đơn hàng: tên sản phẩm, số lượng, giá, địa chỉ, tổng tiền, phương thức TT
  - AC3: Email cập nhật giao hàng khi admin thay đổi trạng thái đơn
- **Priority**: Must
- **Actor**: System → Customer

---

### FR-12: Admin — Quản lý sản phẩm & Hotspot

- **Mô tả**: CRUD sản phẩm đầy đủ bao gồm file 3D, AR, hotspot
- **Acceptance Criteria**:
  - AC1: Danh sách sản phẩm với tìm kiếm, lọc, trạng thái (hiển thị/ẩn)
  - AC2: Thêm/sửa sản phẩm: tên (VI/EN), mô tả (VI/EN), giá, tồn kho, làng nghề; upload ảnh (nhiều, kéo thả), GLB, USDZ, video/URL YouTube, ảnh target AR, file tracking AR; QR tự động tạo
  - AC3: Soft delete (ẩn khỏi shop); bật/tắt hiển thị
  - AC4: Quản lý hotspot: danh sách theo sản phẩm; thêm/sửa/xóa hotspot (slot name, position xyz, normal xyz, tiêu đề VI/EN, nội dung VI/EN, ảnh)
- **Priority**: Must
- **Actor**: Admin

---

### FR-13: Admin — Quản lý Làng Nghề

- **Mô tả**: CMS quản lý nội dung trang làng nghề
- **Acceptance Criteria**:
  - AC1: Sửa nội dung làng nghề: tên (VI/EN), slug, mô tả ngắn (VI/EN), lịch sử đầy đủ (rich text, VI/EN), upload ảnh cover, upload/nhập URL video giới thiệu, câu chuyện nghệ nhân (rich text, VI/EN)
  - AC2: Quản lý 4 giai đoạn sản xuất: thêm/sửa/xóa từng giai đoạn (tiêu đề VI/EN, mô tả VI/EN, ảnh gallery, video/URL YouTube)
- **Priority**: Must
- **Actor**: Admin

---

### FR-14: Admin — Quản lý Đơn hàng

- **Mô tả**: Xem và cập nhật trạng thái toàn bộ đơn hàng
- **Acceptance Criteria**:
  - AC1: Danh sách đơn: mã đơn, tên khách, ngày, tổng tiền, trạng thái; tìm kiếm theo mã/tên/SĐT; lọc theo trạng thái
  - AC2: Xem chi tiết đơn: thông tin khách, sản phẩm, địa chỉ, phương thức TT
  - AC3: Cập nhật trạng thái (Đang xử lý → Đang đóng gói → Đang giao → Đã nhận → Đã huỷ); nhập mã vận đơn; ghi chú nội bộ
  - AC4: Thay đổi trạng thái trigger gửi email cập nhật giao hàng cho customer
- **Priority**: Must
- **Actor**: Admin

---

### FR-15: Admin — Quản lý Đánh giá & Người dùng

- **Mô tả**: Kiểm duyệt đánh giá và quản lý tài khoản người dùng
- **Acceptance Criteria**:
  - AC1: Danh sách đánh giá: tên user, sản phẩm, sao, nội dung, ngày, trạng thái; lọc theo trạng thái/sao/sản phẩm; duyệt / ẩn / xóa
  - AC2: Danh sách user: tên, email, ngày đăng ký, số đơn hàng; xem lịch sử mua; khoá/mở khoá tài khoản
- **Priority**: Must
- **Actor**: Admin

---

### FR-16: Admin — Dashboard & Thống kê

- **Mô tả**: Tổng quan hoạt động hệ thống và báo cáo
- **Acceptance Criteria**:
  - AC1: Dashboard: số đơn hàng hôm nay/tuần/tháng; doanh thu (line chart); top 5 sản phẩm bán chạy; lượt xem AR theo ngày; số user mới
  - AC2: Báo cáo chi tiết: doanh thu theo ngày/tuần/tháng/năm; sản phẩm bán chạy theo số lượng/doanh thu; lượt xem AR theo sản phẩm và ngày; trang được xem nhiều nhất
  - AC3: Xuất báo cáo CSV
- **Priority**: Must
- **Actor**: Admin

---

### FR-17: Admin — Nội dung tĩnh

- **Mô tả**: Quản lý các trang nội dung tĩnh
- **Acceptance Criteria**:
  - AC1: Rich text editor cho: FAQ, chính sách đổi trả, chính sách vận chuyển, thông tin liên hệ
  - AC2: Nội dung hỗ trợ VI/EN
- **Priority**: Must
- **Actor**: Admin

---

### FR-18: Đa ngôn ngữ (i18n)

- **Mô tả**: Toàn bộ nền tảng hỗ trợ tiếng Việt và tiếng Anh
- **Acceptance Criteria**:
  - AC1: Nút chuyển VI/EN trên header; lưu vào `localStorage`
  - AC2: Toàn bộ UI label, nút, thông báo, tiêu đề trang được dịch
  - AC3: Nội dung sản phẩm và làng nghề: admin nhập cả 2 ngôn ngữ; FE hiển thị theo ngôn ngữ đang chọn
  - AC4: Thông báo lỗi validation và hướng dẫn AR được dịch
- **Priority**: Must
- **Actor**: Guest, Customer, Admin

---

## 4. Non-functional Requirements

| ID | Loại | Yêu cầu |
|----|------|---------|
| NFR-01 | Performance | API response ≤ 500ms P95 |
| NFR-02 | Performance | Lazy load ảnh và 3D model; code splitting theo route |
| NFR-03 | Performance | Compress GLB < 5MB bằng Draco (asset pipeline, ngoài scope dev) |
| NFR-04 | Security | JWT access token 15 phút + refresh token 30 ngày; lưu qua httpOnly cookie |
| NFR-05 | Security | HTTPS toàn bộ; CORS chỉ allow domain cụ thể ở production |
| NFR-06 | Security | Rate limiting trên `/login`, `/register` chống brute force |
| NFR-07 | Security | Hash mật khẩu bằng bcrypt; không lưu plain text |
| NFR-08 | Security | Input validation & sanitization toàn bộ API endpoint |
| NFR-09 | File | Upload: ảnh ≤ 10MB, GLB ≤ 50MB, video ≤ 100MB; lưu Azure Blob |
| NFR-10 | File | URL file trả về là Azure Blob public URL; presigned URL cho download nhạy cảm (TTL ≤ 15 phút) |
| NFR-11 | Compatibility | Mobile-first; AR chỉ mobile (Chrome Android, Safari iOS); desktop fallback 3D viewer |
| NFR-12 | Compatibility | Hoạt động trên Chrome Android, Safari iOS, Chrome desktop, Firefox desktop |
| NFR-13 | Payment | Payment sandbox tích hợp thực; xử lý callback thành công/thất bại |
| NFR-14 | Shipping | Phí vận chuyển cố định, cấu hình qua biến môi trường |

---

## 5. Data Model (sơ bộ)

| Entity | Mô tả | Quan hệ chính |
|--------|-------|---------------|
| User | Tài khoản người dùng (customer + admin) | 1-n Order, 1-n Address, 1-n Review, 1-n Wishlist |
| Product | Sản phẩm thủ công | n-1 Village, 1-n ProductImage, 1-n Hotspot, 1-n Review |
| ProductImage | Ảnh sản phẩm (URL Azure Blob) | n-1 Product |
| Hotspot | Điểm tương tác trên 3D model | n-1 Product |
| Village | Làng nghề (5 cố định) | 1-n Product, 1-n VillageStage |
| VillageStage | Giai đoạn sản xuất (4 giai đoạn/làng) | n-1 Village |
| Order | Đơn hàng | n-1 User, 1-n OrderItem, 1-1 Payment |
| OrderItem | Sản phẩm trong đơn hàng | n-1 Order, n-1 Product |
| Payment | Thông tin thanh toán (COD/Bank/Payment) | 1-1 Order |
| Address | Địa chỉ giao hàng | n-1 User |
| Review | Đánh giá sản phẩm | n-1 User, n-1 Product, n-1 OrderItem |
| Cart | Giỏ hàng server-side (khi đăng nhập) | n-1 User, 1-n CartItem |
| Wishlist | Sản phẩm yêu thích | n-1 User, n-1 Product |
| StaticContent | Nội dung tĩnh (FAQ, chính sách...) | — |

---

## 6. MoSCoW

| Must Have | Should Have | Won't Have |
|-----------|-------------|------------|
| Trang chủ (hero, sản phẩm nổi bật, làng nghề, AR guide) | Thống kê nâng cao (biểu đồ chi tiết) | AI Chatbot |
| Trang sản phẩm (3D, hotspot, gallery, QR, đánh giá, video) | Tải hóa đơn PDF | Google OAuth |
| AR experience (NFT tracking, fallback 3D, mock asset) | | Âm thanh ambient |
| Trang làng nghề (hero, lịch sử, nghệ nhân, timeline 4 giai đoạn) | | SMS xác nhận |
| Shop (duyệt, tìm kiếm, bộ lọc, sắp xếp) | | SEO SSR (Next.js) |
| Giỏ hàng (localStorage + sync server) | | |
| Checkout (COD + chuyển khoản + Payment sandbox) | | |
| Theo dõi đơn hàng (timeline trạng thái, chi tiết) | | |
| Tài khoản (đăng ký, đăng nhập, profile, địa chỉ, lịch sử, wishlist) | | |
| Đánh giá (mua mới được viết, kiểm duyệt) | | |
| Email tự động (xác thực, reset, đơn hàng, giao hàng) | | |
| Admin (dashboard, CRUD sản phẩm + hotspot + làng nghề, đơn hàng, đánh giá, user, CSV) | | |
| Đa ngôn ngữ VI/EN (UI + nội dung) | | |
