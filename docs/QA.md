# Q&A — Các vấn đề cần làm rõ

---

## AR — Trải nghiệm thực tế ảo

### Q1: Khi camera hướng vào sản phẩm, AR hiển thị như thế nào?

AR không nhận diện hình dạng 3D của mô hình rồi overlay lên đó. Thực tế hoạt động theo 2 bước:

1. Camera nhận diện **một điểm neo** (ảnh, pattern trang trí trên đế) trên hoặc gần mô hình
2. Dùng điểm neo đó làm tọa độ gốc để **đặt model 3D vào đúng vị trí** trong không gian thực

Người dùng thấy **mô hình vật lý thật** qua camera, và **model 3D động** (người thợ xoay gốm, khung cửi dệt...) xuất hiện chồng lên hoặc nổi ra từ mô hình đó.

**Cần làm rõ: AR hiển thị theo hướng nào?**

| Lựa chọn | Mô tả |
|---|---|
| **A** | Model 3D nổi lên **từ mô hình vật lý** — người thợ nhỏ đứng trên đế mô hình và bắt đầu làm việc |
| **B** | Model 3D hiện ra **bên cạnh** mô hình — cảnh làng nghề thu nhỏ xuất hiện trên mặt bàn cạnh sản phẩm |
| **C** | Model 3D **bao phủ toàn bộ** — camera thấy mô hình vật lý biến thành phiên bản 3D động hoàn toàn |

> Quyết định: ______

---

### Q2: Các website AR khác làm như thế nào và OCNV nên chọn hướng nào?

Hầu hết website/app AR thương mại chia làm 2 trường phái:

**Trường phái 1 — Surface Detection**
- Camera quét mặt phẳng xung quanh (mặt bàn, sàn nhà)
- Người dùng chạm màn hình để đặt model 3D lên mặt phẳng đó
- Model xuất hiện như đang đứng thật trong phòng
- Ví dụ: IKEA Place, Amazon AR, Shopify AR

**Trường phái 2 — Image Tracking**
- Camera nhận diện một hình ảnh cụ thể (tranh, bao bì, poster)
- Model 3D hoặc video nổi ra từ hình ảnh đó
- Ví dụ: Artivive (soi vào tranh → tranh chuyển động), Zappar, 8thWall

**Áp dụng cho OCNV:**

| | Cách làm | Trải nghiệm người dùng | Độ phức tạp |
|---|---|---|---|
| **Option A — Image Tracking** | Pattern tích hợp vào thẻ kèm hộp hoặc đế mô hình, camera nhận diện → load đúng cảnh AR | Soi camera vào pattern → cảnh AR nổi ra gắn với mô hình | Trung bình, cần thiết kế và in thẻ pattern |
| **Option B — Full Replacement** | Camera bật → cảnh 3D animation đè hoàn toàn lên camera feed, không cần nhận diện gì | Nhấn "Xem AR" → toàn màn hình là cảnh làng nghề 3D, mô hình vật lý bị che khuất | Đơn giản nhất, không cần phối hợp thiết kế vật lý |

- Option A: cảnh AR gắn với mô hình vật lý, trải nghiệm tự nhiên hơn, cần thiết kế thêm thẻ pattern
- Option B: đơn giản về kỹ thuật, hoàn toàn chủ động nội dung, nhưng người dùng không thấy mô hình thật khi xem AR

**Cần làm rõ: OCNV chọn Option A hay Option B?**

> Quyết định: ______

---
