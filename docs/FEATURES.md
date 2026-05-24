# OCNV — Danh sách chức năng đầy đủ

## 1. Trang chủ (`/`)

### 1.1 Hero Section
- Phát video background tái hiện không khí làng nghề (autoplay, muted, loop)
- Overlay text: tagline + CTA chính ("Khám phá ngay", "Xem AR")
- Responsive: mobile hiện ảnh tĩnh thay video nếu băng thông yếu

### 1.2 Sản phẩm nổi bật
- Grid sản phẩm nổi bật (do admin chọn)
- Mỗi card: ảnh, tên, giá, tên làng nghề, nút "Thêm vào giỏ" nhanh
- Click card → chuyển sang trang chi tiết sản phẩm

### 1.3 Giới thiệu 5 làng nghề
- 5 card làng nghề: Bát Tràng, Vạn Phúc, Nón Chuông, Phú Vinh, Quảng Phú Cầu
- Mỗi card: ảnh đại diện, tên, mô tả ngắn 1–2 dòng
- Click → chuyển sang trang làng nghề tương ứng

### 1.4 Hướng dẫn AR
- Section giải thích luồng AR: Mua mô hình → Quét QR → Xem AR sống động
- Ảnh minh họa / GIF từng bước
- Nút "Xem demo AR" (mở video demo)

---

## 2. Trang sản phẩm (`/products/:id`)

### 2.1 Xem mô hình 3D tương tác
- Nhúng `<model-viewer>` hiển thị file `.glb`
- Xoay mô hình bằng chuột / ngón tay
- Phóng to, thu nhỏ (pinch-to-zoom / scroll)
- Auto-rotate khi không tương tác
- Loading skeleton trong khi tải model

### 2.2 Hotspot click trên 3D model
- Các điểm tương tác (hotspot) gắn vào bộ phận của mô hình
- Click hotspot → hiện tooltip/card với:
  - Tên bộ phận
  - Chất liệu
  - Ý nghĩa văn hóa
  - Ảnh minh họa (nếu có)
- Có thể có nhiều hotspot trên một sản phẩm

### 2.3 Gallery ảnh sản phẩm
- Ảnh chính lớn + thumbnail hàng ngang
- Click thumbnail → đổi ảnh chính
- Lightbox khi click ảnh chính

### 2.4 Thông tin sản phẩm
- Tên sản phẩm
- Giá bán
- Tên làng nghề (link sang trang làng nghề)
- Mô tả chi tiết
- Số lượng tồn kho

### 2.5 Chọn số lượng & thêm vào giỏ
- Input số lượng (tăng/giảm, không vượt tồn kho)
- Nút "Thêm vào giỏ hàng"
- Nút "Mua ngay" → thêm vào giỏ + chuyển thẳng sang checkout
- Toast thông báo thêm giỏ thành công

### 2.6 Video quy trình sản xuất
- Tab "Video" trong trang sản phẩm
- VideoPlayer tự động phân biệt:
  - URL YouTube → hiện `<iframe>` embed
  - URL Azure Blob → hiện `<video>` HTML5
- Mô tả ngắn bên dưới video

### 2.7 Mã QR sản phẩm
- Hiển thị QR code trực tiếp trên trang
- QR trỏ đến `/ar/:id` của sản phẩm
- Nút tải QR xuống (PNG) để in kèm hộp hàng
- Tooltip hướng dẫn: "Quét mã này bằng camera điện thoại để xem AR"

### 2.8 Nút "Xem AR"
- Nút lớn rõ ràng, mở `/ar/:id` trong tab mới hoặc cùng tab
- Trên desktop: hiện hướng dẫn "Dùng điện thoại quét QR bên dưới"
- Trên mobile: chuyển thẳng sang trang AR

### 2.9 Thông tin làng nghề tóm tắt
- Tab "Làng nghề" trong trang sản phẩm
- Ảnh, tên, mô tả ngắn về làng nghề
- Link "Xem thêm" → chuyển sang trang làng nghề đầy đủ

### 2.10 Đánh giá sản phẩm
- Danh sách đánh giá từ người mua
- Mỗi đánh giá: tên người dùng, số sao (1–5), nội dung, ảnh thực tế (nếu có), ngày đăng
- Phân trang hoặc "Xem thêm" đánh giá
- Form viết đánh giá (chỉ hiện với người đã mua sản phẩm, đã đăng nhập)
  - Chọn số sao
  - Nhập nội dung
  - Upload ảnh thực tế (tối đa 3 ảnh)

### 2.11 Sản phẩm liên quan
- Grid 4–6 sản phẩm cùng làng nghề hoặc cùng danh mục
- Mỗi card: ảnh, tên, giá

---

## 3. Trải nghiệm AR (`/ar/:id`)

### 3.1 Màn hình khởi động AR
- Hiển thị tên sản phẩm, ảnh preview
- Nút "Bắt đầu AR" → xin quyền camera

### 3.2 Xin quyền camera
- Gọi `getUserMedia()` xin quyền camera
- Nếu từ chối: hiện thông báo hướng dẫn cấp quyền + fallback 3D viewer
- Nếu thiết bị không có camera: chuyển thẳng sang fallback

### 3.3 Khởi tạo AR.js NFT Image Tracking
- Load file tracking data (`.fset`, `.fset3`, `.iset`) từ Azure Blob
- Camera bật, hình ảnh thực tế hiển thị trên màn hình
- Progress indicator trong khi khởi tạo AR engine

### 3.4 Nhận diện mô hình vật lý
- AR.js nhận diện mặt trước mô hình (image target)
- Xác định vị trí và góc độ trong không gian thực
- Trạng thái nhận diện: đang tìm / đã tìm thấy / mất dấu

### 3.5 Hiển thị animation 3D
- Khi nhận diện thành công: Three.js load file `.glb` và đè lên camera feed
- Chạy animation clip của làng nghề tương ứng
- Animation loop liên tục khi đang nhận diện

### 3.6 Mất dấu mô hình
- Khi camera lệch khỏi mặt trước: animation tạm dừng
- Hiển thị overlay: "Vui lòng hướng camera vào mô hình để tiếp tục"
- Khi nhận diện lại: animation tự động tiếp tục

### 3.7 Tương tác trong AR
- Tap vào nhân vật / chi tiết trên màn hình → hiện info card
- Info card: tên, mô tả văn hóa, có thể kéo xuống để đọc thêm
- Nút đóng info card

### 3.8 Fallback 3D Viewer
- Khi không hỗ trợ AR (desktop, quyền bị từ chối): hiện `<model-viewer>` thay thế
- Thông báo rõ: "Thiết bị không hỗ trợ AR — Xem mô hình 3D bên dưới"

### 3.9 Nút thoát AR
- Nút "X" góc trên để tắt camera, quay lại trang sản phẩm

---

## 4. Trang Làng Nghề (`/villages/:slug`)

### 4.1 Hero làng nghề
- Ảnh/video giới thiệu toàn cảnh làng nghề
- Tên làng nghề, tagline ngắn

### 4.2 Lịch sử & giới thiệu
- Bài viết dài: hình thành từ bao giờ, vị trí địa lý, nổi tiếng về điều gì
- Đóng góp với văn hóa Việt Nam
- Ảnh minh họa xen kẽ

### 4.3 Câu chuyện nghệ nhân
- Ảnh nghệ nhân
- Đời sống, công việc hàng ngày
- Khó khăn và niềm tự hào
- Quote nổi bật của nghệ nhân

### 4.4 Timeline 4 giai đoạn sản xuất
- Giai đoạn 1 — Nguyên liệu: lấy từ đâu, chọn lọc như thế nào, ảnh + video
- Giai đoạn 2 — Chế tác: người thợ làm gì, dụng cụ đặc trưng, ảnh + video
- Giai đoạn 3 — Xử lý: nung / phơi / nhuộm / hoàn thiện, ảnh + video
- Giai đoạn 4 — Thành phẩm: sản phẩm hoàn chỉnh, giá trị sử dụng, ảnh + video
- Mỗi giai đoạn: tiêu đề, mô tả, VideoPlayer (YouTube/Azure), ảnh gallery

### 4.5 Âm thanh môi trường làng nghề
- Nút bật/tắt âm thanh ambient (tiếng đất sét, tiếng khung cửi, tiếng đan tre...)
- Audio loop khi đang ở trang làng nghề

### 4.6 Danh sách sản phẩm của làng nghề
- Grid sản phẩm thuộc làng nghề đó
- Mỗi card: ảnh, tên, giá, nút "Xem chi tiết"

---

## 5. Cửa hàng (`/shop`)

### 5.1 Duyệt sản phẩm
- Grid tất cả sản phẩm, mặc định sắp xếp theo mới nhất
- Hiển thị: ảnh, tên, giá, tên làng nghề, số lượng còn lại
- Phân trang (pagination) hoặc infinite scroll

### 5.2 Tìm kiếm
- Ô tìm kiếm full-text theo tên sản phẩm và tên làng nghề
- Kết quả real-time khi gõ (debounce 300ms)
- Hiển thị "Không tìm thấy" nếu không có kết quả

### 5.3 Bộ lọc
- Lọc theo làng nghề (checkbox, chọn nhiều)
- Lọc theo khoảng giá (range slider hoặc input min–max)
- Sắp xếp: Mới nhất / Giá tăng dần / Giá giảm dần / Phổ biến nhất
- Xóa tất cả bộ lọc

### 5.4 Gợi ý sản phẩm liên quan
- Khi đang xem một sản phẩm: hiện sidebar hoặc section "Có thể bạn thích"
- Gợi ý dựa trên cùng làng nghề

---

## 6. Giỏ hàng (`/cart`)

### 6.1 Quản lý giỏ hàng
- Danh sách sản phẩm đã thêm: ảnh, tên, giá đơn vị, số lượng, thành tiền
- Thay đổi số lượng từng sản phẩm (không vượt tồn kho)
- Xóa từng sản phẩm khỏi giỏ
- Xóa toàn bộ giỏ hàng

### 6.2 Tóm tắt đơn hàng
- Tổng số lượng sản phẩm
- Tổng tiền hàng
- Phí vận chuyển (cố định hoặc tính theo địa chỉ)
- Tổng thanh toán

### 6.3 Lưu giỏ hàng
- Giỏ hàng lưu vào `localStorage` — không mất khi đóng tab/trình duyệt
- Nếu đã đăng nhập: đồng bộ giỏ hàng với server (merge khi đăng nhập)

### 6.4 Nút hành động
- Nút "Tiếp tục mua sắm" → quay về `/shop`
- Nút "Đặt hàng" → chuyển sang `/checkout`

---

## 7. Đặt hàng & Thanh toán (`/checkout`)

### 7.1 Form thông tin giao hàng
- Họ tên người nhận
- Số điện thoại
- Địa chỉ: tỉnh/thành, quận/huyện, phường/xã, địa chỉ cụ thể
- Ghi chú cho đơn hàng (tuỳ chọn)
- Nếu đã đăng nhập: tự điền từ địa chỉ đã lưu, có thể chọn địa chỉ khác

### 7.2 Chọn phương thức thanh toán
- **COD** (thanh toán khi nhận hàng): chọn → xác nhận đơn
- **Chuyển khoản ngân hàng**: chọn → hiện thông tin tài khoản + QR ngân hàng + hướng dẫn
- **Cổng thanh toán trực tuyến** (VNPay / Stripe): chọn → redirect sang cổng thanh toán

### 7.3 Xem lại đơn hàng trước khi xác nhận
- Danh sách sản phẩm, số lượng, giá
- Tổng tiền
- Địa chỉ giao hàng
- Phương thức thanh toán đã chọn

### 7.4 Xác nhận đơn hàng
- Nút "Đặt hàng"
- Sau khi đặt: hiện trang xác nhận với mã đơn hàng
- Gửi email xác nhận kèm chi tiết đơn (tên sản phẩm, địa chỉ, tổng tiền, phương thức TT)
- Gửi SMS xác nhận (nếu tích hợp)

---

## 8. Theo dõi đơn hàng (`/orders/:id`)

### 8.1 Trạng thái đơn hàng
- Timeline trạng thái: Đang xử lý → Đang đóng gói → Đang giao → Đã nhận
- Ngày giờ cập nhật từng trạng thái
- Mã vận đơn (nếu có) để tra cứu bên đơn vị vận chuyển

### 8.2 Chi tiết đơn hàng
- Danh sách sản phẩm đã mua, số lượng, giá
- Địa chỉ giao hàng
- Phương thức thanh toán
- Tổng tiền

### 8.3 Liên hệ hỗ trợ đơn hàng
- Nút "Liên hệ hỗ trợ" → mở form/email/Zalo hỗ trợ
- Hiển thị mã đơn hàng tự động trong nội dung liên hệ

---

## 9. Tài khoản người dùng

### 9.1 Đăng ký (`/register`)
- Form: email, mật khẩu, xác nhận mật khẩu, họ tên
- Validate real-time: định dạng email, độ dài mật khẩu tối thiểu, trùng khớp mật khẩu
- Gửi email xác thực sau đăng ký
- Đăng ký bằng Google OAuth

### 9.2 Đăng nhập (`/login`)
- Form: email + mật khẩu
- Remember me (lưu token 30 ngày)
- Quên mật khẩu → nhập email → gửi link đặt lại mật khẩu
- Đăng nhập bằng Google OAuth
- Thông báo lỗi cụ thể (sai email, sai mật khẩu, chưa xác thực email)

### 9.3 Đặt lại mật khẩu
- Nhập email → gửi link reset qua email (hết hạn sau 1 giờ)
- Trang đặt lại: nhập mật khẩu mới + xác nhận

### 9.4 Trang hồ sơ (`/profile`)
- Chỉnh sửa: họ tên, số điện thoại, ảnh đại diện
- Đổi mật khẩu (nhập mật khẩu cũ + mật khẩu mới)

### 9.5 Quản lý địa chỉ giao hàng
- Danh sách địa chỉ đã lưu
- Thêm địa chỉ mới
- Sửa / Xóa địa chỉ
- Đặt địa chỉ mặc định

### 9.6 Lịch sử mua hàng (`/profile/orders`)
- Danh sách tất cả đơn hàng đã đặt
- Mỗi đơn: mã đơn, ngày đặt, tổng tiền, trạng thái hiện tại
- Click → xem chi tiết đơn hàng (`/orders/:id`)
- Tải hóa đơn (PDF)

### 9.7 Danh sách yêu thích (`/profile/wishlist`)
- Nút trái tim trên mỗi sản phẩm để thêm/bỏ yêu thích
- Trang danh sách yêu thích: hiện toàn bộ sản phẩm đã lưu
- Thêm thẳng vào giỏ từ trang yêu thích

### 9.8 Viết đánh giá sản phẩm
- Từ trang lịch sử đơn hàng: nút "Đánh giá" cho từng sản phẩm đã mua
- Form: chọn số sao (1–5), nhập nội dung, upload ảnh (tối đa 3), upload video ngắn AR experience (tùy chọn)
- Chỉ được đánh giá 1 lần mỗi sản phẩm trong mỗi đơn hàng

---

## 10. AI Chatbot — Hướng dẫn viên số

### 10.1 Widget chatbot
- Nút chat cố định góc dưới phải trên mọi trang
- Mở popup chat khi click

### 10.2 Kể chuyện làng nghề
- Người dùng hỏi về lịch sử, quy trình, nghệ nhân → AI trả lời bằng ngôn ngữ tự nhiên
- Có thể hỏi theo ngữ cảnh đang xem (trang sản phẩm / trang làng nghề)

### 10.3 Cá nhân hóa theo đối tượng
- AI nhận diện ngôn ngữ câu hỏi → trả lời tiếng Việt hoặc tiếng Anh
- Điều chỉnh mức độ giải thích theo câu hỏi (đơn giản cho trẻ em, chi tiết cho người muốn tìm hiểu sâu)

### 10.4 Gợi ý sản phẩm qua chat
- AI đề xuất sản phẩm phù hợp khi người dùng hỏi "tôi muốn mua quà", "sản phẩm nào phù hợp với..."
- Hiện card sản phẩm inline trong chat

### 10.5 Trả lời câu hỏi về đơn hàng
- Hỏi "đơn hàng của tôi ở đâu" → AI hướng dẫn kiểm tra trang theo dõi đơn hàng
- Hỏi về chính sách đổi trả, vận chuyển → AI trả lời từ nội dung đã cấu hình

### 10.6 Đa ngôn ngữ
- Hỗ trợ tiếng Việt và tiếng Anh

---

## 11. Đa ngôn ngữ

### 11.1 Chuyển đổi ngôn ngữ
- Nút chuyển Tiếng Việt / English trên header
- Lưu lựa chọn vào `localStorage`

### 11.2 Nội dung được dịch
- Toàn bộ UI: label, nút, thông báo, tiêu đề trang
- Nội dung làng nghề, sản phẩm (nếu admin nhập cả 2 ngôn ngữ)
- Thông báo lỗi, hướng dẫn AR

---

## 12. Admin — Quản trị hệ thống (`/admin`)

### 12.1 Xác thực admin
- Đăng nhập riêng bằng tài khoản admin
- Route `/admin/*` bảo vệ bằng JWT + role guard
- Không hiển thị với khách hàng thông thường

### 12.2 Dashboard tổng quan
- Số đơn hàng hôm nay / tuần này / tháng này
- Doanh thu hôm nay / tuần / tháng (biểu đồ line chart)
- Top 5 sản phẩm bán chạy
- Số lượt xem AR theo ngày (biểu đồ)
- Số trang được xem nhiều nhất
- Số người dùng mới đăng ký

### 12.3 Quản lý sản phẩm
- Danh sách sản phẩm: tên, làng nghề, giá, tồn kho, trạng thái (hiển thị / ẩn)
- Tìm kiếm và lọc sản phẩm
- **Thêm sản phẩm mới:**
  - Nhập tên, mô tả, giá, số lượng tồn kho
  - Chọn làng nghề
  - Upload ảnh sản phẩm (nhiều ảnh, kéo thả)
  - Upload file 3D `.glb` (Android/Web)
  - Upload file `.usdz` (iOS Quick Look)
  - Upload video quy trình (hoặc nhập URL YouTube)
  - Upload ảnh target AR (`[id]-target.jpg`)
  - Upload file tracking AR (`.fset`, `.fset3`, `.iset`)
  - Tạo và hiển thị QR code tự động
- **Sửa sản phẩm:** chỉnh sửa toàn bộ thông tin trên
- **Xóa sản phẩm** (soft delete — ẩn khỏi shop, không xóa dữ liệu)
- **Bật/tắt hiển thị** sản phẩm trên shop

### 12.4 Quản lý hotspot 3D
- Với mỗi sản phẩm: danh sách hotspot (slot name, vị trí, tiêu đề, nội dung)
- Thêm hotspot mới: nhập slot name, position (x y z), normal (x y z), tiêu đề, nội dung, ảnh
- Sửa / Xóa hotspot

### 12.5 Quản lý làng nghề
- Danh sách 5 làng nghề
- **Sửa nội dung làng nghề:**
  - Tên, slug, mô tả ngắn, lịch sử đầy đủ
  - Upload ảnh cover
  - Upload/nhập URL video giới thiệu tổng quan
  - Câu chuyện nghệ nhân (rich text)
  - Upload âm thanh ambient
- **Quản lý 4 giai đoạn sản xuất** của mỗi làng nghề:
  - Thêm / Sửa / Xóa từng giai đoạn
  - Mỗi giai đoạn: tiêu đề, mô tả, upload ảnh, upload/nhập URL video

### 12.6 Quản lý đơn hàng
- Danh sách tất cả đơn hàng: mã đơn, tên khách, ngày đặt, tổng tiền, trạng thái
- Tìm kiếm theo mã đơn / tên / số điện thoại
- Lọc theo trạng thái
- **Xem chi tiết đơn:** thông tin khách, sản phẩm, địa chỉ, phương thức TT
- **Cập nhật trạng thái:** Đang xử lý → Đang đóng gói → Đang giao → Đã nhận → Đã huỷ
- Nhập mã vận đơn
- Ghi chú nội bộ cho đơn hàng

### 12.7 Quản lý đánh giá
- Danh sách tất cả đánh giá: tên người dùng, sản phẩm, số sao, nội dung, ngày đăng, trạng thái
- **Duyệt đánh giá:** hiển thị lên trang sản phẩm
- **Ẩn đánh giá:** không hiển thị với khách hàng
- **Xóa đánh giá**
- Lọc theo: trạng thái (chờ duyệt / đã duyệt / đã ẩn), số sao, sản phẩm

### 12.8 Quản lý người dùng
- Danh sách tài khoản người dùng: tên, email, ngày đăng ký, số đơn hàng
- Xem lịch sử mua hàng của từng người dùng
- Khoá / mở khoá tài khoản

### 12.9 Quản lý nội dung tĩnh
- Chỉnh sửa nội dung trang: FAQ, chính sách đổi trả, chính sách vận chuyển, thông tin liên hệ
- Rich text editor

### 12.10 Thống kê & Báo cáo
- **Doanh thu:** theo ngày / tuần / tháng / năm (biểu đồ + bảng)
- **Sản phẩm bán chạy:** top N sản phẩm theo số lượng / doanh thu
- **Lượt xem AR:** theo sản phẩm, theo ngày
- **Trang được xem nhiều nhất:** home, shop, village pages
- **Người dùng mới:** đăng ký theo ngày
- Xuất báo cáo CSV

---

## 13. Hệ thống thông báo & Email

### 13.1 Email tự động
- Email xác thực tài khoản (sau đăng ký)
- Email đặt lại mật khẩu (link reset)
- Email xác nhận đơn hàng (kèm chi tiết đơn)
- Email cập nhật trạng thái giao hàng (khi admin thay đổi trạng thái)

### 13.2 Thông báo trong app
- Toast notification cho các hành động: thêm giỏ, đặt hàng thành công, lỗi
- Badge số lượng sản phẩm trong giỏ hàng trên header

---

## 14. Hệ thống kỹ thuật & Non-functional

### 14.1 Xác thực & Phân quyền
- JWT access token (15 phút) + refresh token (30 ngày)
- Role: `user`, `admin`
- NestJS Guards bảo vệ route theo role
- Google OAuth 2.0

### 14.2 Upload & Lưu trữ file
- Upload ảnh, video, file 3D lên Azure Blob Storage
- Trả về URL công khai để lưu vào MongoDB
- Giới hạn kích thước: ảnh ≤ 10MB, GLB ≤ 50MB, video ≤ 100MB
- Hỗ trợ kéo thả upload trong admin

### 14.3 Hiệu năng
- Lazy load ảnh và 3D model
- Code splitting theo route
- Cache API response (SWR / React Query)
- Compress GLB < 5MB bằng Draco (yêu cầu asset pipeline)
- CDN qua Azure Blob public endpoint

### 14.4 SEO & Meta
- Server-side meta tags cho trang sản phẩm và làng nghề (title, description, og:image)
- Sitemap tự động

### 14.5 Responsive & Cross-platform
- Mobile-first design
- Hoạt động trên Chrome Android, Safari iOS, Chrome desktop, Firefox desktop
- AR chỉ hoạt động trên mobile (Chrome Android, Safari iOS)
- Desktop: fallback sang 3D viewer

### 14.6 Bảo mật
- HTTPS toàn bộ
- CORS cấu hình chặt theo domain
- Input validation & sanitization toàn bộ API endpoint
- Rate limiting trên auth endpoint (chống brute force)
- Không lưu mật khẩu plain text (bcrypt)
