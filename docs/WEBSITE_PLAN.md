# Kế hoạch phát triển Website — OCNV (Nghề Xưa Nét Mới)

## 1. Tổng quan & Mục tiêu

**Website mục tiêu:** E-commerce kết hợp AR — bán mô hình tiểu cảnh làng nghề, đồng thời là nền tảng trải nghiệm văn hóa số.

**Ràng buộc:**
- Phục vụ đồ án tốt nghiệp nhóm GRP490-G46
- Chi phí tối ưu, dùng Azure B1/B2
- Ổn định đủ để demo đồ án & pitch

---

## 2. Tech Stack

| Layer | Công nghệ | Ghi chú |
|---|---|---|
| **Monorepo** | Turborepo | Quản lý chung FE + BE |
| **Frontend** | React + Vite + Tailwind CSS | SPA, build nhanh |
| **Backend** | NestJS | REST API, module hóa rõ ràng |
| **Database** | MongoDB Atlas (free 500MB) | Chỉ lưu text/URL, không lưu file |
| **Storage** | Azure Blob Storage | Lưu model 3D (.glb), ảnh, video ngắn, AR target files |
| **3D Viewer** | `model-viewer` (Google) | Trang sản phẩm, hỗ trợ hotspot click |
| **AR Engine** | AR.js NFT + Three.js | Trang `/ar/[id]`, image tracking mặt trước tiểu cảnh |
| **AR Animation** | Three.js GLTFLoader | Load file .glb, chạy animation clip, raycasting click |
| **Video ngắn (≤20s)** | Azure Blob → `<video>` tag | Lưu trực tiếp, load nhanh |
| **Video dài (>20s)** | YouTube embed `<iframe>` | Miễn phí, không tốn bandwidth |
| **Thanh toán** | COD + chuyển khoản | Đơn giản, không cần tích hợp gateway |
| **Deploy** | Azure App Service B1/B2 | FE + BE cùng server hoặc tách |
| **Auth** | JWT (NestJS Guards) | |

---

## 3. Cấu trúc Monorepo

```
ocnv/
├── apps/
│   ├── web/                  # React + Vite + Tailwind
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── Home.tsx
│   │   │   │   ├── ProductDetail.tsx
│   │   │   │   ├── ARView.tsx
│   │   │   │   ├── Village.tsx
│   │   │   │   ├── Shop.tsx
│   │   │   │   └── Checkout.tsx
│   │   │   ├── components/
│   │   │   │   ├── ModelViewer/
│   │   │   │   ├── ARScene/
│   │   │   │   ├── VideoPlayer/
│   │   │   │   ├── QRCode/
│   │   │   │   └── Cart/
│   │   │   ├── hooks/
│   │   │   ├── services/     # API calls
│   │   │   └── store/        # Zustand / Context
│   │   └── vite.config.ts
│   │
│   └── api/                  # NestJS
│       └── src/
│           ├── products/
│           ├── villages/
│           ├── orders/
│           ├── ar/           # Hotspot, marker data
│           ├── media/        # Azure Blob upload handler
│           └── auth/
│
├── packages/
│   ├── ui/                   # Shared UI components
│   ├── types/                # Shared TypeScript interfaces
│   └── utils/                # Shared helpers
│
├── turbo.json
├── package.json
└── .env.example
```

---

## 4. Kiến trúc hệ thống

```
┌─────────────────────────────────────────────┐
│                NGƯỜI DÙNG                   │
│  Điện thoại quét QR → mở URL sản phẩm      │
└──────────────┬──────────────────────────────┘
               │
┌──────────────▼──────────────────────────────┐
│         REACT + VITE (Azure B1/B2)          │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐  │
│  │ Trang    │  │ Trang    │  │  AR View  │  │
│  │ Sản phẩm │  │ Làng nghề│  │  /ar/:id  │  │
│  └──────────┘  └──────────┘  └───────────┘  │
└──────────────┬──────────────────────────────┘
               │ REST API
┌──────────────▼──────────────────────────────┐
│            NESTJS API (Azure B1/B2)         │
└──────────────┬──────────────────────────────┘
               │
       ┌───────┴────────┐
       ▼                ▼
  MongoDB Atlas    Azure Blob Storage
  (text, URLs)    (GLB, USDZ, ảnh, video)
```

---

## 5. Database Schema (MongoDB)

```typescript
// Village
{
  _id, name, slug, description, history,
  video_url: string,        // YouTube link hoặc Azure Blob URL
  cover_image: string,      // Azure Blob URL
  created_at
}

// Product
{
  _id, village_id, name, slug, price, description,
  model_glb_url: string,    // Azure Blob (.glb — Android/Web)
  model_usdz_url: string,   // Azure Blob (.usdz — iOS Quick Look)
  qr_code_url: string,      // Azure Blob (ảnh QR)
  images: string[],         // Azure Blob URLs
  stock: number,
  created_at
}

// ProductHotspot (điểm click trên 3D model)
{
  _id, product_id,
  slot_name: string,        // e.g. "hotspot-1"
  position: string,         // e.g. "0.1 0.2 0.1"
  normal: string,           // e.g. "0 1 0"
  title: string,
  content: string,
  image_url: string
}

// ProductionStage (4 giai đoạn làm nghề)
{
  _id, village_id,
  stage_order: number,      // 1-4
  title: string,
  description: string,
  video_url: string,        // YouTube hoặc Azure Blob
  image_url: string
}

// Order
{
  _id, status, total,
  shipping_info: { name, phone, address },
  items: [{ product_id, quantity, price }],
  created_at
}
```

---

## 6. Tính năng từng trang

### 6.1 Trang chủ (`/`)
- Hero section: video background làng nghề
- Grid sản phẩm nổi bật
- Section giới thiệu 5 làng nghề
- CTA "Quét QR để trải nghiệm AR"

### 6.2 Trang sản phẩm (`/products/:id`)
```
┌─────────────────────────────────────────┐
│  [model-viewer: 3D model]               │
│  ← Xoay, zoom, click hotspot → tooltip │
│  [Nút: Xem AR] [Nút: Thêm vào giỏ]    │
├─────────────────────────────────────────┤
│  Tên sản phẩm + Giá + Mô tả            │
│  Tab: Chi tiết | Làng nghề | Video     │
├─────────────────────────────────────────┤
│  VideoPlayer (auto chọn Azure/<iframe>) │
├─────────────────────────────────────────┤
│  QR Code (quét để mở AR trên mobile)   │
└─────────────────────────────────────────┘
```

### 6.3 Trang AR (`/ar/:id`) — Core Feature
- Mở camera thực tế (xin quyền trình duyệt)
- **AR.js NFT Image Tracking**: dùng ảnh chụp mặt trước mô hình làm image target
- Camera nhận diện mặt trước mô hình vật lý → xác định vị trí và load animation `.glb` đè lên
- Nếu camera lệch khỏi mặt trước → animation tạm dừng, hiện thông báo hướng dẫn
- **Click vào model → modal thông tin** (fetch từ API)
- Fallback: thiết bị không hỗ trợ → hiển thị `model-viewer` 3D thường

**Luồng AR:**
```
Quét QR → /ar/:productId
→ Request camera permission
→ AR.js NFT init với ảnh mặt trước mô hình làm image target
→ Camera nhận diện mặt trước → xác định vị trí trong không gian
→ Three.js load file .glb + chạy animation đè lên mặt trước
→ User click model → fetch hotspot data → hiển thị info card
→ Camera lệch khỏi mặt trước → tạm dừng, hiện thông báo
```

**Yêu cầu chuẩn bị cho mỗi sản phẩm:**
| Asset | Mô tả |
|---|---|
| `[id].glb` | File 3D chứa animation làng nghề, lưu Azure Blob |
| `[id]-target.jpg` | Ảnh chụp mặt trước mô hình vật lý làm image target |
| `[id].fset / .fset3 / .iset` | File tracking data tạo từ ảnh target bằng AR.js NFT Creator |

**Phân biệt theo thiết bị:**
| Thiết bị | AR Engine |
|---|---|
| Android Chrome | AR.js NFT + Three.js |
| iOS Safari | AR.js NFT + Three.js |
| Desktop | Fallback: model-viewer 3D thường |

### 6.4 Trang Làng Nghề (`/villages/:slug`)
- Hero + video giới thiệu tổng quan
- Timeline 4 giai đoạn sản xuất (Nguyên liệu → Chế tác → Xử lý → Thành phẩm)
- Video + mô tả từng giai đoạn
- Grid sản phẩm thuộc làng nghề

### 6.5 Shop + Giỏ hàng + Checkout (`/shop`, `/cart`, `/checkout`)
- Lọc theo làng nghề, giá
- Giỏ hàng (localStorage)
- Checkout: form thông tin + xác nhận đơn COD/chuyển khoản

---

## 7. Video Player — Logic 2 phương án

```tsx
// components/VideoPlayer.tsx
const VideoPlayer = ({ url }: { url: string }) => {
  const isYoutube = url.includes('youtube.com') || url.includes('youtu.be')

  if (isYoutube) {
    return (
      <iframe
        src={url}
        className="w-full aspect-video rounded-lg"
        allowFullScreen
      />
    )
  }

  return (
    <video
      src={url}
      controls
      className="w-full aspect-video rounded-lg"
    />
  )
}
```

**Quy tắc chọn phương án:**
- Video ngắn ≤ 20s, file < 50MB → upload Azure Blob → dùng `<video>`
- Video dài hơn → upload YouTube → dùng `<iframe>`
- Chỉ cần lưu URL vào MongoDB, frontend tự xử lý

---

## 8. AR Implementation

### model-viewer (trang sản phẩm)
```html
<model-viewer
  src="/models/batrang.glb"
  ios-src="/models/batrang.usdz"
  ar
  ar-modes="webxr scene-viewer quick-look"
  camera-controls
  auto-rotate>

  <!-- Hotspot click -->
  <button slot="hotspot-1"
          data-position="0.1 0.2 0.1"
          data-normal="0 1 0"
          class="hotspot">
    <div class="annotation">Bàn xoay gốm</div>
  </button>
</model-viewer>
```

### AR.js (trang /ar/:id — camera thực tế)
```html
<a-scene embedded arjs="trackingMethod: best; debugUIEnabled: false;">
  <a-marker type="pattern" url="/markers/batrang.patt">
    <a-entity
      gltf-model="/models/batrang.glb"
      scale="0.1 0.1 0.1"
      click-handler>
    </a-entity>
  </a-marker>
  <a-entity camera></a-entity>
</a-scene>
```

---

## 9. Roadmap phát triển (10 tuần)

| Tuần | Milestone | Deliverable |
|---|---|---|
| 1 | Setup monorepo | Turborepo, React+Vite, NestJS, MongoDB kết nối, Azure Blob config |
| 2 | API cơ bản | CRUD products, villages, production stages |
| 3–4 | Trang sản phẩm | model-viewer, hotspot click, VideoPlayer 2 phương án |
| 5–6 | AR Feature | AR.js camera view, image tracking, click model → info |
| 7 | Trang Làng nghề | Timeline 4 giai đoạn, video từng bước |
| 8 | E-commerce | Giỏ hàng, checkout, quản lý đơn hàng |
| 9 | QR Flow + iOS | QR generation, test iOS Quick Look, end-to-end flow |
| 10 | Polish + Deploy | Bug fix, seed data 3 sản phẩm demo, deploy Azure |

---

## 10. Ước tính chi phí vận hành

| Dịch vụ | Plan | Chi phí/tháng |
|---|---|---|
| Azure App Service | B1 (~$13) hoặc B2 (~$55) | ~300k–1.3tr VND |
| Azure Blob Storage | ~1–5GB dùng thực tế | ~5k–25k VND |
| MongoDB Atlas | Free M0 (500MB) | $0 |
| YouTube embed | Free | $0 |
| Domain | ~200k/năm | ~17k VND |
| **Tổng (B1)** | | **~320k–350k VND/tháng** |

---

## 11. Rủi ro & Giải pháp

| Rủi ro | Giải pháp |
|---|---|
| iOS không hỗ trợ WebXR | model-viewer tự fallback sang Quick Look (.usdz) |
| 3D model quá nặng → chậm mobile | Compress GLB < 5MB, dùng Draco compression |
| AR.js tracking không ổn định | Dùng marker in rõ nét, cung cấp fallback 3D viewer |
| Không có 3D artist | Sketchfab free models + chỉnh Blender, hoặc dùng Spline |
| MongoDB 500MB hết quota | Chỉ lưu URL, không lưu binary. Dọn orders cũ định kỳ |

---

## 12. MVP Scope

**Bắt buộc (Must have):**
- [ ] 3 sản phẩm demo đầy đủ data (ưu tiên: Bát Tràng, Vạn Phúc, Chuông)
- [ ] Trang sản phẩm với 3D model viewer + hotspot click
- [ ] AR view qua camera (Android Chrome + iOS Quick Look)
- [ ] QR → mở trang AR
- [ ] Trang làng nghề + video 4 giai đoạn
- [ ] Giỏ hàng + form đặt hàng COD

**Để V2 (Nice to have):**
- AI chatbot hướng dẫn viên số
- Multi-language (EN/VI)
- Payment gateway thật (Stripe / VNPay)
- User account + lịch sử đơn hàng
- Admin CMS dashboard
