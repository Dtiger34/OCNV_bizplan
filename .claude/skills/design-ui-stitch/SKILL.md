---
name: design-ui-stitch
description: Bóc tách file PRD dự án thành các file spec màn hình riêng biệt. Dùng khi người dùng có file PRD và muốn tách ra từng màn hình để thiết kế UI.
---

# PRD to Screens Skill

Bóc tách file PRD thành các file spec màn hình chuẩn, sẵn sàng dùng cho Stitch MCP và convert sang Next.js.

## Quy trình

### Bước 1 — Đọc PRD

Đọc `docs/requirement/PRD.md` — features, actors, user flows và thu thập:

- Tên dự án / app
- Mục đích app
- Vai trò người dùng / actor (nếu có)
- Các tính năng, luồng nghiệp vụ, user flow được mô tả

---

### Bước 2 — Xác nhận danh sách màn hình

Từ features, user flows và actors trong PRD, xác định danh sách màn hình cần thiết:

- Mỗi nhóm tính năng / luồng người dùng độc lập → ít nhất 1 màn hình
- Vai trò khác nhau có giao diện riêng → màn hình riêng
- Form tạo/chỉnh sửa phức tạp → có thể tách thành màn hình riêng hoặc modal
- Đặt tên theo chức năng, kebab-case (`event-list`, `registration-form`)

Liệt kê theo bảng, nhóm theo module:

```
| # | Màn hình | Route | Actor |
|---|----------|-------|-------|
| 1 | Login | /login | All |
| 2 | Event List | /events | User |
| 3 | ... | ... | ... |
```

Hỏi confirm: "Danh sách màn hình này đủ chưa? Thiếu hay thừa màn hình nào không?"

**Không tiếp tục đến Bước 3 khi chưa được confirm.**

---

### Bước 3 — Tạo file spec từng màn hình

Sau khi danh sách được confirm, với mỗi màn hình tạo file `/stitch/screens/[tên-màn-hình]-screen.md` theo format sau.

## Format file spec

```markdown
# Màn hình: [Tên màn hình]

## Route: /[route]

## Actor: [vai trò người dùng]

## Mục đích

[1-2 câu mô tả màn hình dùng để làm gì, ai dùng]

## Bố cục

### [Khu vực 1 — ví dụ: Thanh công cụ]

- [Thành phần 1]: [mô tả, ví dụ: ô tìm kiếm, placeholder "Tìm theo tên..."]
- [Thành phần 2]: [mô tả]
- Nút "[Tên nút]" — [vị trí], [icon nếu có]

### [Khu vực 2 — ví dụ: Bảng dữ liệu]

Các cột:

- [Tên cột]: [kiểu dữ liệu, ví dụ: text / badge / date / avatar+text]
- ...

Hành động mỗi dòng: [icon xem / sửa / xóa / ...]

### [Khu vực 3 — ví dụ: Form / Panel]

- Field "[Tên field]": [kiểu input: text / dropdown / date / toggle]
- ...
- Nút "[Lưu/Hủy]"

## Trạng thái màn hình

- Rỗng: [hiển thị gì khi không có dữ liệu]
- Loading: [skeleton / spinner]
- Lỗi: [thông báo lỗi]

## Điều hướng

- Sidebar active: [tên mục]
- Từ màn hình này đến: [màn hình nào khi thực hiện action nào]
```

## Quy tắc bóc tách

- Mỗi màn hình = 1 file riêng
- Tên file: kebab-case, thêm `-screen.md` cuối (`dashboard-screen.md`, `employee-detail-screen.md`)
- Chỉ mô tả chức năng và layout — KHÔNG đề cập màu sắc, font, spacing (phần đó do DESIGN-SYSTEM.md xử lý)
- Modal / popup / drawer → ghi luôn vào file màn hình cha, không tạo file riêng

## Sau khi tạo xong

Báo cáo:

```
Đã tạo X file trong /stitch/screens/:
- dashboard-screen.md
- ...
```
