# Database Schema

> Dự án: OCNV | ORM: Mongoose 8.x | DB: MongoDB 7.x | Phiên bản: 1.0 — 25/05/2026

---

## Entities Overview

| Entity | Collection | Mô tả |
|--------|------------|-------|
| User | `users` | Tài khoản người dùng (customer + admin) |
| Address | `addresses` | Địa chỉ giao hàng, thuộc về User |
| Village | `villages` | 5 làng nghề cố định, có CMS content |
| VillageStage | `village_stages` | 4 giai đoạn sản xuất của mỗi làng nghề |
| Product | `products` | Sản phẩm thủ công, thuộc về Village |
| ProductImage | `product_images` | Ảnh sản phẩm (embed trong Product) |
| Hotspot | `hotspots` | Điểm tương tác 3D trên Product |
| Cart | `carts` | Giỏ hàng server-side (1 user 1 cart) |
| Order | `orders` | Đơn hàng |
| OrderItem | embed trong Order | Sản phẩm trong đơn |
| Payment | embed trong Order | Thông tin thanh toán |
| Review | `reviews` | Đánh giá sản phẩm |
| Wishlist | `wishlists` | Danh sách yêu thích (1 user 1 doc) |
| StaticContent | `static_contents` | Nội dung tĩnh (FAQ, chính sách...) |

---

## Enums

```typescript
enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

enum UserStatus {
  ACTIVE = 'active',
  LOCKED = 'locked',
}

enum OrderStatus {
  PENDING = 'pending',         // Đang xử lý
  PACKING = 'packing',         // Đang đóng gói
  SHIPPING = 'shipping',       // Đang giao
  DELIVERED = 'delivered',     // Đã nhận
  CANCELLED = 'cancelled',     // Đã huỷ
}

enum PaymentMethod {
  COD = 'cod',
  BANK_TRANSFER = 'bank_transfer',
  PAYMENT = 'payment',
}

enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
}

enum ReviewStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  HIDDEN = 'hidden',
}

enum StaticContentKey {
  FAQ = 'faq',
  RETURN_POLICY = 'return_policy',
  SHIPPING_POLICY = 'shipping_policy',
  CONTACT = 'contact',
}
```

---

## Schemas

### User

```typescript
@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, select: false }) // không trả về mặc định
  password: string;

  @Prop()
  phone?: string;

  @Prop()
  avatarUrl?: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.CUSTOMER })
  role: UserRole;

  @Prop({ type: String, enum: UserStatus, default: UserStatus.UNVERIFIED })
  status: UserStatus;

  @Prop({ select: false })
  emailVerifyToken?: string;

  @Prop({ select: false })
  emailVerifyExpires?: Date;

  @Prop({ select: false })
  passwordResetToken?: string;

  @Prop({ select: false })
  passwordResetExpires?: Date;

  @Prop({ select: false })
  refreshToken?: string;
}
// index: email (unique), status
```

---

### Address

```typescript
@Schema({ timestamps: true, collection: 'addresses' })
export class Address {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  province: string;

  @Prop({ required: true })
  district: string;

  @Prop({ required: true })
  ward: string;

  @Prop({ required: true })
  street: string; // địa chỉ cụ thể

  @Prop({ default: false })
  isDefault: boolean;
}
// index: userId
```

---

### Village

```typescript
// Bilingual content sub-schema
class BilingualText {
  @Prop({ required: true }) vi: string;
  @Prop({ required: true }) en: string;
}

@Schema({ timestamps: true, collection: 'villages' })
export class Village {
  @Prop({ required: true, unique: true })
  slug: string; // 'bat-trang' | 'van-phuc' | 'non-chuong' | 'phu-vinh' | 'quang-phu-cau'

  @Prop({ type: BilingualText, required: true })
  name: BilingualText;

  @Prop({ type: BilingualText, required: true })
  tagline: BilingualText;

  @Prop({ type: BilingualText, required: true })
  shortDescription: BilingualText;

  @Prop({ type: BilingualText })
  fullHistory: BilingualText; // rich text HTML

  @Prop()
  coverImageUrl?: string;

  @Prop()
  introVideoUrl?: string; // YouTube URL hoặc local path

  // Câu chuyện nghệ nhân
  @Prop()
  artisanImageUrl?: string;

  @Prop({ type: BilingualText })
  artisanStory: BilingualText; // rich text HTML

  @Prop({ type: BilingualText })
  artisanQuote: BilingualText;
}
// index: slug (unique)
```

---

### VillageStage

```typescript
@Schema({ timestamps: true, collection: 'village_stages' })
export class VillageStage {
  @Prop({ type: Types.ObjectId, ref: 'Village', required: true, index: true })
  villageId: Types.ObjectId;

  @Prop({ required: true, min: 1, max: 4 })
  order: number; // 1=Nguyên liệu, 2=Chế tác, 3=Xử lý, 4=Thành phẩm

  @Prop({ type: BilingualText, required: true })
  title: BilingualText;

  @Prop({ type: BilingualText, required: true })
  description: BilingualText; // rich text HTML

  @Prop({ type: [String], default: [] })
  imageUrls: string[];

  @Prop()
  videoUrl?: string; // YouTube URL hoặc local path
}
// index: villageId, order
```

---

### Product

```typescript
class ProductImage {
  @Prop({ required: true }) url: string;
  @Prop({ default: false }) isMain: boolean;
  @Prop({ default: 0 }) order: number;
}

@Schema({ timestamps: true, collection: 'products' })
export class Product {
  @Prop({ type: BilingualText, required: true })
  name: BilingualText;

  @Prop({ type: BilingualText, required: true })
  description: BilingualText; // rich text HTML

  @Prop({ required: true, min: 0 })
  price: number; // VND

  @Prop({ required: true, min: 0 })
  stock: number;

  @Prop({ type: Types.ObjectId, ref: 'Village', required: true, index: true })
  villageId: Types.ObjectId;

  @Prop({ type: [ProductImage], default: [] })
  images: ProductImage[];

  // File 3D / AR
  @Prop()
  glbUrl?: string;   // model Android/Web

  @Prop()
  usdzUrl?: string;  // model iOS Quick Look

  @Prop()
  arTargetImageUrl?: string;  // ảnh target để AR.js nhận diện

  @Prop()
  arTrackingFsetUrl?: string;

  @Prop()
  arTrackingFset3Url?: string;

  @Prop()
  arTrackingIsetUrl?: string;

  // Video quy trình sản xuất
  @Prop()
  processVideoUrl?: string;   // YouTube URL hoặc local path

  @Prop()
  processVideoDescription?: string;

  @Prop({ default: true, index: true })
  isVisible: boolean; // bật/tắt hiển thị trên shop

  @Prop({ default: false })
  isFeatured: boolean; // hiện trên trang chủ

  @Prop({ default: false })
  deletedAt?: Date; // soft delete
}
// index: villageId, isVisible, isFeatured, price, createdAt
// text index: name.vi, name.en (full-text search)
```

---

### Hotspot

```typescript
class Vector3 {
  @Prop({ required: true }) x: number;
  @Prop({ required: true }) y: number;
  @Prop({ required: true }) z: number;
}

@Schema({ timestamps: true, collection: 'hotspots' })
export class Hotspot {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true, index: true })
  productId: Types.ObjectId;

  @Prop({ required: true })
  slotName: string; // tên slot trong model-viewer (ví dụ: "hotspot-1")

  @Prop({ type: Vector3, required: true })
  position: Vector3;

  @Prop({ type: Vector3, required: true })
  normal: Vector3;

  @Prop({ type: BilingualText, required: true })
  title: BilingualText; // tên bộ phận

  @Prop({ type: BilingualText, required: true })
  content: BilingualText; // chất liệu, ý nghĩa văn hóa

  @Prop()
  imageUrl?: string;
}
// index: productId
```

---

### Cart

```typescript
class CartItem {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ required: true, min: 1 })
  quantity: number;
}

@Schema({ timestamps: true, collection: 'carts' })
export class Cart {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ type: [CartItem], default: [] })
  items: CartItem[];
}
// index: userId (unique)
```

---

### Order

```typescript
class OrderItemEmbed {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ required: true })
  productName: string; // snapshot tại thời điểm đặt (vi)

  @Prop()
  productImageUrl?: string;

  @Prop({ required: true, min: 1 })
  quantity: number;

  @Prop({ required: true, min: 0 })
  unitPrice: number; // snapshot giá tại thời điểm đặt

  @Prop({ default: false })
  isReviewed: boolean; // đã viết đánh giá cho item này chưa
}

class PaymentEmbed {
  @Prop({ type: String, enum: PaymentMethod, required: true })
  method: PaymentMethod;

  @Prop({ type: String, enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: PaymentStatus;

  @Prop()
  paymentTransactionId?: string;

  @Prop()
  paymentResponseCode?: string;

  @Prop()
  paidAt?: Date;
}

class ShippingAddress {
  @Prop({ required: true }) fullName: string;
  @Prop({ required: true }) phone: string;
  @Prop({ required: true }) province: string;
  @Prop({ required: true }) district: string;
  @Prop({ required: true }) ward: string;
  @Prop({ required: true }) street: string;
}

class OrderStatusHistory {
  @Prop({ type: String, enum: OrderStatus, required: true })
  status: OrderStatus;

  @Prop({ required: true })
  updatedAt: Date;

  @Prop()
  note?: string;
}

@Schema({ timestamps: true, collection: 'orders' })
export class Order {
  @Prop({ required: true, unique: true })
  orderCode: string; // sinh tự động, VD: OCNV-20260525-0001

  @Prop({ type: Types.ObjectId, ref: 'User', index: true })
  userId?: Types.ObjectId; // null nếu guest

  @Prop({ type: ShippingAddress, required: true })
  shippingAddress: ShippingAddress;

  @Prop({ type: [OrderItemEmbed], required: true })
  items: OrderItemEmbed[];

  @Prop({ required: true, min: 0 })
  subtotal: number;

  @Prop({ required: true, min: 0 })
  shippingFee: number;

  @Prop({ required: true, min: 0 })
  total: number;

  @Prop({ type: PaymentEmbed, required: true })
  payment: PaymentEmbed;

  @Prop({ type: String, enum: OrderStatus, default: OrderStatus.PENDING, index: true })
  status: OrderStatus;

  @Prop({ type: [OrderStatusHistory], default: [] })
  statusHistory: OrderStatusHistory[];

  @Prop()
  trackingCode?: string; // mã vận đơn

  @Prop()
  customerNote?: string;

  @Prop()
  adminNote?: string;
}
// index: userId, status, createdAt, orderCode (unique)
```

---

### Review

```typescript
@Schema({ timestamps: true, collection: 'reviews' })
export class Review {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true, index: true })
  productId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Order', required: true })
  orderId: Types.ObjectId; // để verify đã mua

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [String], default: [] })
  imageUrls: string[]; // tối đa 3

  @Prop()
  videoUrl?: string; // video AR experience (tùy chọn)

  @Prop({ type: String, enum: ReviewStatus, default: ReviewStatus.PENDING, index: true })
  status: ReviewStatus;
}
// index: userId + productId + orderId (unique compound — 1 review/item/order)
// index: productId, status
```

---

### Wishlist

```typescript
@Schema({ timestamps: true, collection: 'wishlists' })
export class Wishlist {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }], default: [] })
  productIds: Types.ObjectId[];
}
// index: userId (unique)
```

---

### StaticContent

```typescript
@Schema({ timestamps: true, collection: 'static_contents' })
export class StaticContent {
  @Prop({ type: String, enum: StaticContentKey, required: true, unique: true })
  key: StaticContentKey;

  @Prop({ type: BilingualText, required: true })
  content: BilingualText; // rich text HTML
}
// index: key (unique)
```

---

## Quan hệ quan trọng

| Quan hệ | Cách lưu | Ghi chú |
|---------|----------|---------|
| User → Address | ref (Address.userId) | 1-n, User có nhiều địa chỉ |
| Village → VillageStage | ref (VillageStage.villageId) | 1-4, mỗi làng 4 giai đoạn |
| Village → Product | ref (Product.villageId) | 1-n |
| Product → Hotspot | ref (Hotspot.productId) | 1-n |
| User → Cart | ref (Cart.userId, unique) | 1-1 |
| Cart → Product | embed CartItem.productId | n-n qua CartItem |
| User → Order | ref (Order.userId) | 1-n; null nếu guest |
| Order → Product | embed OrderItemEmbed | snapshot giá/tên tại thời điểm đặt |
| Order → Payment | embed PaymentEmbed | 1-1, tránh join |
| User + Product + Order → Review | ref 3 chiều + unique compound index | đảm bảo 1 review/item/order |
| User → Wishlist | ref (Wishlist.userId, unique) | 1-1, productIds là mảng |

---

## Seed Data (tối thiểu cho dev/demo)

- 1 admin account
- 3 customer accounts
- 5 villages (đủ slug + nội dung placeholder VI/EN)
- 4 VillageStage cho mỗi village (20 records)
- 10 products (2 mỗi làng nghề, có ảnh placeholder, isVisible=true, 2 isFeatured=true)
- 2–3 hotspot mỗi product
- 5 orders (các trạng thái khác nhau)
- 5 reviews (approved)
- StaticContent 4 keys (FAQ, chính sách...)
