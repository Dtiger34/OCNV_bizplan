# Bake panel thông tin luôn hiện vào USDZ (không cần Mac)

## Bối cảnh

Trên iOS, AR thật (Quick Look) mở một app riêng của hệ điều hành — trang web (và mọi DOM
overlay) bị đẩy ra nền, nên không thể "vẽ đè" point/info-box lên trên như cách làm trên
Android (WebXR). Muốn thông tin hiện được ngay trong lúc đang AR trên iOS, nội dung phải
được "bake" (nhúng sẵn) vào chính file `.usdz`, không thể làm bằng React/DOM.

**Lịch sử — đã thử và bỏ**: ban đầu thử bake behavior "tap vào marker → hiện panel" bằng
schema `Preliminary_Behavior`/`Preliminary_Trigger`/`Preliminary_Action` (reverse-engineer
từ Reality Composer Pro, tài liệu chính thức của Apple cho phần này đã 404). Test trên
iPhone thật: **marker không tap được, không có phản hồi gì cả** — không xác nhận được là do
tên `info:id` sai hay do Quick Look không hỗ trợ chạy schema này khi mở qua Safari/web
(khác với mở trực tiếp trong app RealityKit native). Không có cách nào debug thêm vì Quick
Look là app đóng của Apple, không có console/log để quan sát.

**Giải pháp hiện tại**: bỏ hẳn phần tap-behavior, panel thông tin **luôn hiện sẵn** (visible
mặc định) ngay khi model được đặt vào AR — không cần tap, không phụ thuộc vào schema chưa
xác nhận được có hoạt động hay không. Đơn giản hơn và chắc chắn hiện ra (nếu Quick Look
render đúng mesh/material, đã verify các file mẫu công khai của Apple luôn hiển thị mesh có
material `UsdPreviewSurface` bình thường).

Đây không phải cách duy nhất có info trên iOS — `VillageArPage.tsx` cũng đã hỗ trợ tap-point
hiện info ở bước xem model inline TRƯỚC khi vào AR (hoạt động trên mọi nền tảng, dùng React
`onClick` thật, không phụ thuộc schema USD nào).

## Quy trình 2 bước

### Bước 1 — Tạo file usdz "nền" (chỉ hình khối + màu, chưa có panel)

Cần một công cụ convert glb -> usdz. Không dùng Reality Composer (không có Mac), dùng
**Blender** (miễn phí, chạy trên Windows, có sẵn USDZ exporter từ bản 4.x):

1. Cài Blender: https://www.blender.org/download/
2. Mở Blender -> File > Import > glTF 2.0 -> chọn file trong `apps/fe/public/models/*.glb`
3. File > Export > Universal Scene Description -> chọn định dạng `.usdz` -> lưu vào
   `apps/fe/scripts/ar-usdz/baseline/<ten-model>.usdz`

(Có thể tự động hoá bước này bằng Blender headless `--background --python export_usdz.py`
nếu cần làm nhiều model — chưa viết vì hiện chỉ có dữ liệu hotspot cho `bat-trang`.)

### Bước 2 — Bake panel thông tin, đóng gói usdz cuối

```bash
cd apps/fe/scripts/ar-usdz
pip install usd-core Pillow    # thuần Python, chạy được trên Windows

python build_interactive_usdz.py \
  --usdz baseline/lang-gom.usdz \
  --points points/bat-trang.json \
  --out ../../public/models/lang-gom.usdz
```

File `points/bat-trang.json` phải khớp với `position`/`normal`/`title`/`description` trong
`VILLAGE_AR_POINTS` (`apps/fe/src/features/ar/data/village-ar-points.ts`) — nếu sửa toạ độ ở
một chỗ (ví dụ sau khi calibrate bằng dev helper Alt+click trong `VillageArPage.tsx`), nhớ
sửa cả hai. Trường `actionId` trong file JSON (dùng để test các biến thể tap-behavior trước
đây) không còn tác dụng, có thể bỏ hoặc giữ lại tuỳ ý — script hiện tại không đọc field này.

### Bước 3 — Test trên iPhone thật

`village-ar-models.ts` đã sẵn sàng trỏ `usdz` tới `/models/lang-gom.usdz` cho `bat-trang`.
Mở trang trên Safari iOS, vào AR thật (Quick Look) — 3 panel thông tin (bàn xoay, lò nung,
hoa văn) sẽ hiện sẵn ngay tại vị trí đã calibrate trên model, không cần tap gì thêm.

Nếu panel không hiện: kiểm tra lại toạ độ `position`/`normal` trong `points/*.json` có nằm
trong không gian model không (build lại, dùng dev helper Alt+click trong `VillageArPage.tsx`
ở chế độ xem inline để lấy toạ độ chính xác), hoặc kiểm tra texture PNG có bị lỗi render
(dùng `usdcat`/trình xem USD trên Windows để mở thử file `.usdz` trước khi deploy).
