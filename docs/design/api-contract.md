# API Contract

> Dự án: OCNV | Phiên bản: 1.0 — 25/05/2026 | Trạng thái: Approved
> Base URL: `/api/v1` | Auth: httpOnly cookie `access_token`

---

## Common Response Format

### Success
```json
{ "success": true, "data": { ... } }
```

### Success (list + pagination)
```json
{
  "success": true,
  "data": {
    "items": [ ... ],
    "total": 100,
    "page": 1,
    "limit": 20
  }
}
```

### Error
```json
{
  "success": false,
  "error": { "code": "ERROR_CODE", "message": "Human-readable message" }
}
```

### Common Query Params (paginated endpoints)
| Param | Type | Default | Mô tả |
|-------|------|---------|-------|
| `page` | number | 1 | Trang hiện tại |
| `limit` | number | 20 | Số item mỗi trang (max 100) |

### Common Error Codes
| Code | HTTP | Mô tả |
|------|------|-------|
| `VALIDATION_ERROR` | 422 | Input sai format/thiếu field bắt buộc |
| `UNAUTHORIZED` | 401 | Chưa đăng nhập hoặc token hết hạn |
| `FORBIDDEN` | 403 | Không đủ quyền |
| `NOT_FOUND` | 404 | Resource không tồn tại |
| `CONFLICT` | 409 | Duplicate resource |
| `INTERNAL_SERVER_ERROR` | 500 | Lỗi server |

---

## 1. Health

### GET /health
- **Auth**: No
- **Response 200**:
```json
{ "status": "ok" }
```

---

## 2. Auth

### POST /auth/register
- **Auth**: No
- **Request Body**:
```json
{
  "fullName": "string (required, min 2)",
  "email": "string (required, valid email)",
  "password": "string (required, min 8)"
}
```
- **Response 201**:
```json
{
  "success": true,
  "data": { "message": "Registration successful. Please log in." }
}
```
- **Errors**: `409 CONFLICT` (email đã tồn tại), `422 VALIDATION_ERROR`


### POST /auth/login
- **Auth**: No
- **Request Body**:
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```
- **Response 200** — set cookies: `access_token` (HttpOnly, 15m), `refresh_token` (HttpOnly, 30d), `csrf-token` (non-HttpOnly, 15m):
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "fullName": "string",
    "email": "string",
    "role": "customer | admin",
    "avatarUrl": "string | null"
  }
}
```
- **Errors**: `401 INVALID_CREDENTIALS` (sai email/password), `403 ACCOUNT_LOCKED`, `422 VALIDATION_ERROR`

---

### POST /auth/logout
- **Auth**: Yes (any role)
- **Response 204**: No content — clear cookies
- **Errors**: `401 UNAUTHORIZED`

---

### POST /auth/refresh
- **Auth**: No (dùng refresh_token cookie)
- **Response 200** — set cookie `access_token` mới:
```json
{ "success": true, "data": { "message": "Token refreshed." } }
```
- **Errors**: `401 INVALID_REFRESH_TOKEN`

---

### GET /auth/me
- **Auth**: Yes (any role)
- **Response 200**:
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "fullName": "string",
    "email": "string",
    "role": "customer | admin",
    "avatarUrl": "string | null",
    "phone": "string | null"
  }
}
```
- **Errors**: `401 UNAUTHORIZED`

---

### POST /auth/forgot-password
- **Auth**: No
- **Request Body**:
```json
{ "email": "string (required)" }
```
- **Response 200** (luôn trả 200 dù email không tồn tại — tránh enumeration):
```json
{ "success": true, "data": { "message": "If this email exists, a reset link has been sent." } }
```
- **Errors**: `422 VALIDATION_ERROR`

---

### POST /auth/reset-password
- **Auth**: No
- **Request Body**:
```json
{
  "token": "string (required)",
  "password": "string (required, min 8)"
}
```
- **Response 200**:
```json
{ "success": true, "data": { "message": "Password reset successfully." } }
```
- **Errors**: `400 INVALID_TOKEN`, `422 VALIDATION_ERROR`

---

## 3. Users (Profile)

### PATCH /users/me
- **Auth**: Yes (customer, admin)
- **Request Body** (all optional):
```json
{
  "fullName": "string",
  "phone": "string"
}
```
- **Response 200**:
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "fullName": "string",
    "email": "string",
    "phone": "string | null",
    "avatarUrl": "string | null",
    "role": "string"
  }
}
```
- **Errors**: `401 UNAUTHORIZED`, `422 VALIDATION_ERROR`

---

### PATCH /users/me/password
- **Auth**: Yes (customer, admin)
- **Request Body**:
```json
{
  "currentPassword": "string (required)",
  "newPassword": "string (required, min 8)"
}
```
- **Response 200**:
```json
{ "success": true, "data": { "message": "Password updated successfully." } }
```
- **Errors**: `400 WRONG_PASSWORD`, `401 UNAUTHORIZED`, `422 VALIDATION_ERROR`

---

### PATCH /users/me/avatar
- **Auth**: Yes (customer, admin)
- **Request**: `multipart/form-data` — field `avatar` (image, max 10MB)
- **Response 200**:
```json
{ "success": true, "data": { "avatarUrl": "string" } }
```
- **Errors**: `400 FILE_TOO_LARGE`, `400 INVALID_FILE_TYPE`, `401 UNAUTHORIZED`

---

## 4. Addresses

### GET /addresses
- **Auth**: Yes (customer)
- **Response 200**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "string",
      "fullName": "string",
      "phone": "string",
      "province": "string",
      "district": "string",
      "ward": "string",
      "street": "string",
      "isDefault": "boolean",
      "createdAt": "ISO8601"
    }
  ]
}
```

---

### POST /addresses
- **Auth**: Yes (customer)
- **Request Body**:
```json
{
  "fullName": "string (required)",
  "phone": "string (required)",
  "province": "string (required)",
  "district": "string (required)",
  "ward": "string (required)",
  "street": "string (required)",
  "isDefault": "boolean (optional, default false)"
}
```
- **Response 201**: địa chỉ vừa tạo (same shape as GET item)
- **Errors**: `401 UNAUTHORIZED`, `422 VALIDATION_ERROR`

---

### PATCH /addresses/:id
- **Auth**: Yes (customer — chỉ address của mình)
- **Request Body** (all optional):
```json
{
  "fullName": "string",
  "phone": "string",
  "province": "string",
  "district": "string",
  "ward": "string",
  "street": "string"
}
```
- **Response 200**: địa chỉ sau khi update
- **Errors**: `401 UNAUTHORIZED`, `403 FORBIDDEN`, `404 NOT_FOUND`, `422 VALIDATION_ERROR`

---

### DELETE /addresses/:id
- **Auth**: Yes (customer — chỉ address của mình)
- **Response 204**: No content
- **Errors**: `401 UNAUTHORIZED`, `403 FORBIDDEN`, `404 NOT_FOUND`

---

### PATCH /addresses/:id/default
- **Auth**: Yes (customer)
- **Response 200**: địa chỉ sau khi set làm default (isDefault: true)
- **Errors**: `401 UNAUTHORIZED`, `403 FORBIDDEN`, `404 NOT_FOUND`

---

## 5. Villages

### GET /villages
- **Auth**: No
- **Response 200**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "string",
      "slug": "string",
      "name": { "vi": "string", "en": "string" },
      "tagline": { "vi": "string", "en": "string" },
      "shortDescription": { "vi": "string", "en": "string" },
      "coverImageUrl": "string | null"
    }
  ]
}
```

---

### GET /villages/:slug
- **Auth**: No
- **Response 200**:
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "slug": "string",
    "name": { "vi": "string", "en": "string" },
    "tagline": { "vi": "string", "en": "string" },
    "shortDescription": { "vi": "string", "en": "string" },
    "fullHistory": { "vi": "string (HTML)", "en": "string (HTML)" },
    "coverImageUrl": "string | null",
    "introVideoUrl": "string | null",
    "artisanImageUrl": "string | null",
    "artisanStory": { "vi": "string (HTML)", "en": "string (HTML)" },
    "artisanQuote": { "vi": "string", "en": "string" },
    "stages": [
      {
        "_id": "string",
        "order": "number",
        "title": { "vi": "string", "en": "string" },
        "description": { "vi": "string (HTML)", "en": "string (HTML)" },
        "imageUrls": ["string"],
        "videoUrl": "string | null"
      }
    ]
  }
}
```
- **Errors**: `404 NOT_FOUND`

---

## 6. Products

### GET /products
- **Auth**: No
- **Query Params**:

| Param | Type | Mô tả |
|-------|------|-------|
| `page` | number | default 1 |
| `limit` | number | default 20 |
| `search` | string | full-text search tên sản phẩm + tên làng nghề |
| `villageId` | string (comma-separated) | lọc theo làng nghề |
| `minPrice` | number | giá tối thiểu |
| `maxPrice` | number | giá tối đa |
| `sort` | `newest \| price_asc \| price_desc \| popular` | default `newest` |

- **Response 200**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "_id": "string",
        "name": { "vi": "string", "en": "string" },
        "price": "number",
        "stock": "number",
        "village": { "_id": "string", "slug": "string", "name": { "vi": "string", "en": "string" } },
        "mainImageUrl": "string | null",
        "isVisible": "boolean"
      }
    ],
    "total": "number",
    "page": "number",
    "limit": "number"
  }
}
```

---

### GET /products/featured
- **Auth**: No
- **Response 200**: `data: ProductCard[]` (same shape as GET /products items, filtered isFeatured=true)

---

### GET /products/:id
- **Auth**: No
- **Response 200**:
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "name": { "vi": "string", "en": "string" },
    "description": { "vi": "string (HTML)", "en": "string (HTML)" },
    "price": "number",
    "stock": "number",
    "images": [
      { "url": "string", "isMain": "boolean", "order": "number" }
    ],
    "glbUrl": "string | null",
    "usdzUrl": "string | null",
    "arTargetImageUrl": "string | null",
    "arTrackingFsetUrl": "string | null",
    "arTrackingFset3Url": "string | null",
    "arTrackingIsetUrl": "string | null",
    "processVideoUrl": "string | null",
    "processVideoDescription": "string | null",
    "village": {
      "_id": "string",
      "slug": "string",
      "name": { "vi": "string", "en": "string" },
      "shortDescription": { "vi": "string", "en": "string" },
      "coverImageUrl": "string | null"
    },
    "hotspots": [
      {
        "_id": "string",
        "slotName": "string",
        "position": { "x": "number", "y": "number", "z": "number" },
        "normal": { "x": "number", "y": "number", "z": "number" },
        "title": { "vi": "string", "en": "string" },
        "content": { "vi": "string", "en": "string" },
        "imageUrl": "string | null"
      }
    ],
    "averageRating": "number",
    "reviewCount": "number",
    "isFeatured": "boolean"
  }
}
```
- **Errors**: `404 NOT_FOUND`

---

### GET /products/:id/related
- **Auth**: No
- **Query**: `limit` (default 6)
- **Response 200**: `data: ProductCard[]` (same shape as GET /products items)

---

### GET /products/:id/reviews
- **Auth**: No
- **Query**: `page`, `limit`
- **Response 200**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "_id": "string",
        "user": { "fullName": "string", "avatarUrl": "string | null" },
        "rating": "number",
        "content": "string",
        "imageUrls": ["string"],
        "videoUrl": "string | null",
        "createdAt": "ISO8601"
      }
    ],
    "total": "number",
    "page": "number",
    "limit": "number",
    "averageRating": "number"
  }
}
```

---

### POST /products/:id/reviews
- **Auth**: Yes (customer — đã mua và chưa đánh giá sản phẩm này trong đơn đó)
- **Request Body**:
```json
{
  "orderId": "string (required)",
  "rating": "number (required, 1-5)",
  "content": "string (required, min 10)",
  "imageUrls": ["string (optional, max 3)"],
  "videoUrl": "string (optional)"
}
```
- **Response 201**: review vừa tạo (status: pending, chờ admin duyệt)
- **Errors**: `400 NOT_PURCHASED` (chưa mua), `409 ALREADY_REVIEWED` (đã đánh giá rồi), `401 UNAUTHORIZED`, `422 VALIDATION_ERROR`

---

## 7. Cart

### GET /cart
- **Auth**: No (guest trả cart từ body; customer trả cart từ server)
- **Response 200**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "product": {
          "_id": "string",
          "name": { "vi": "string", "en": "string" },
          "price": "number",
          "stock": "number",
          "mainImageUrl": "string | null"
        },
        "quantity": "number"
      }
    ],
    "subtotal": "number",
    "shippingFee": "number",
    "total": "number"
  }
}
```

---

### POST /cart/items
- **Auth**: Yes (customer)
- **Request Body**:
```json
{
  "productId": "string (required)",
  "quantity": "number (required, min 1)"
}
```
- **Response 200**: cart sau khi thêm (same shape as GET /cart)
- **Errors**: `400 INSUFFICIENT_STOCK`, `404 PRODUCT_NOT_FOUND`, `401 UNAUTHORIZED`, `422 VALIDATION_ERROR`

---

### PATCH /cart/items/:productId
- **Auth**: Yes (customer)
- **Request Body**:
```json
{ "quantity": "number (required, min 0 — 0 = remove)" }
```
- **Response 200**: cart sau khi update
- **Errors**: `400 INSUFFICIENT_STOCK`, `404 NOT_FOUND`, `401 UNAUTHORIZED`, `422 VALIDATION_ERROR`

---

### DELETE /cart/items/:productId
- **Auth**: Yes (customer)
- **Response 200**: cart sau khi xoá item
- **Errors**: `401 UNAUTHORIZED`, `404 NOT_FOUND`

---

### DELETE /cart
- **Auth**: Yes (customer)
- **Response 200**: cart rỗng

---

### POST /cart/merge
- **Auth**: Yes (customer)
- **Mô tả**: Merge giỏ hàng localStorage vào server cart khi đăng nhập
- **Request Body**:
```json
{
  "items": [
    { "productId": "string", "quantity": "number" }
  ]
}
```
- **Response 200**: merged cart (same shape as GET /cart)
- **Errors**: `401 UNAUTHORIZED`, `422 VALIDATION_ERROR`

---

## 8. Orders

### POST /orders
- **Auth**: No (guest có thể đặt hàng)
- **Request Body**:
```json
{
  "shippingAddress": {
    "fullName": "string (required)",
    "phone": "string (required)",
    "province": "string (required)",
    "district": "string (required)",
    "ward": "string (required)",
    "street": "string (required)"
  },
  "items": [
    { "productId": "string (required)", "quantity": "number (required, min 1)" }
  ],
  "paymentMethod": "cod | bank_transfer | payment (required)",
  "customerNote": "string (optional)"
}
```
- **Response 201**:
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "orderCode": "string",
    "status": "pending",
    "subtotal": "number",
    "shippingFee": "number",
    "total": "number",
    "paymentMethod": "string",
    "paymentUrl": "string | null"
  }
}
```
> `paymentUrl` chỉ có giá trị khi `paymentMethod = payment` — FE redirect sang URL này
- **Errors**: `400 INSUFFICIENT_STOCK`, `400 EMPTY_CART`, `404 PRODUCT_NOT_FOUND`, `422 VALIDATION_ERROR`

---

### GET /orders
- **Auth**: Yes (customer)
- **Query**: `page`, `limit`, `status`
- **Response 200**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "_id": "string",
        "orderCode": "string",
        "status": "pending | packing | shipping | delivered | cancelled",
        "total": "number",
        "paymentMethod": "string",
        "paymentStatus": "pending | paid | failed",
        "itemCount": "number",
        "createdAt": "ISO8601"
      }
    ],
    "total": "number",
    "page": "number",
    "limit": "number"
  }
}
```

---

### GET /orders/:id
- **Auth**: Yes (customer — chỉ đơn của mình; admin — mọi đơn)
- **Response 200**:
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "orderCode": "string",
    "status": "string",
    "statusHistory": [
      { "status": "string", "updatedAt": "ISO8601", "note": "string | null" }
    ],
    "shippingAddress": { "fullName": "string", "phone": "string", "province": "string", "district": "string", "ward": "string", "street": "string" },
    "items": [
      {
        "productId": "string",
        "productName": "string",
        "productImageUrl": "string | null",
        "quantity": "number",
        "unitPrice": "number",
        "isReviewed": "boolean"
      }
    ],
    "subtotal": "number",
    "shippingFee": "number",
    "total": "number",
    "payment": { "method": "string", "status": "string", "paidAt": "ISO8601 | null" },
    "trackingCode": "string | null",
    "customerNote": "string | null",
    "createdAt": "ISO8601"
  }
}
```
- **Errors**: `401 UNAUTHORIZED`, `403 FORBIDDEN`, `404 NOT_FOUND`

---

## 9. Payments (Payment)

### GET /payments/return
- **Auth**: No (Payment redirect, query params signed)
- **Query**: Payment standard params (`vnp_TxnRef`, `vnp_ResponseCode`, `vnp_SecureHash`, ...)
- **Hành động**: verify signature → cập nhật Order payment status → redirect FE
- **Response**: HTTP redirect về `PAYMENT_RETURN_URL?result=success|failed&orderCode=...`

---

### POST /payments/ipn
- **Auth**: No (Payment server-to-server, IP whitelist)
- **Body**: Payment IPN standard params
- **Response 200**:
```json
{ "RspCode": "00", "Message": "Confirm Success" }
```

---

## 10. Wishlist

### GET /wishlist
- **Auth**: Yes (customer)
- **Response 200**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "string",
      "name": { "vi": "string", "en": "string" },
      "price": "number",
      "mainImageUrl": "string | null",
      "stock": "number"
    }
  ]
}
```

---

### POST /wishlist/:productId
- **Auth**: Yes (customer)
- **Response 200**: `{ "success": true, "data": { "added": true } }`
- **Errors**: `404 PRODUCT_NOT_FOUND`, `409 ALREADY_IN_WISHLIST`, `401 UNAUTHORIZED`

---

### DELETE /wishlist/:productId
- **Auth**: Yes (customer)
- **Response 200**: `{ "success": true, "data": { "removed": true } }`
- **Errors**: `401 UNAUTHORIZED`, `404 NOT_FOUND`

---

## 11. Static Content

### GET /static-content/:key
- **Auth**: No
- **Path param** `key`: `faq | return_policy | shipping_policy | contact`
- **Response 200**:
```json
{
  "success": true,
  "data": {
    "key": "string",
    "content": { "vi": "string (HTML)", "en": "string (HTML)" },
    "updatedAt": "ISO8601"
  }
}
```
- **Errors**: `404 NOT_FOUND`

---

## 12. Upload

### POST /upload
- **Auth**: Yes (admin)
- **Request**: `multipart/form-data`

| Field | Type | Giới hạn |
|-------|------|----------|
| `file` | binary | — |
| `type` | `image \| model \| video \| ar-tracking \| avatar` | required |

- **Response 201**:
```json
{
  "success": true,
  "data": { "url": "/static/images/uuid.jpg" }
}
```
- **Errors**: `400 FILE_TOO_LARGE`, `400 INVALID_FILE_TYPE`, `401 UNAUTHORIZED`, `403 FORBIDDEN`

---

## 13. Admin — Dashboard

### GET /admin/dashboard/stats
- **Auth**: Yes (admin)
- **Query**: `period = today | week | month | year` (default `month`)
- **Response 200**:
```json
{
  "success": true,
  "data": {
    "orders": { "total": "number", "pending": "number", "delivered": "number", "cancelled": "number" },
    "revenue": "number",
    "revenueChart": [{ "date": "string", "amount": "number" }],
    "topProducts": [{ "_id": "string", "name": "string", "sold": "number", "revenue": "number" }],
    "newUsers": "number",
    "arViews": "number"
  }
}
```
- **Errors**: `401 UNAUTHORIZED`, `403 FORBIDDEN`

---

## 14. Admin — Products

### GET /admin/products
- **Auth**: Yes (admin)
- **Query**: `page`, `limit`, `search`, `villageId`, `isVisible`
- **Response 200**: paginated list kèm `isVisible`, `isFeatured`, `stock`, `deletedAt`

---

### POST /admin/products
- **Auth**: Yes (admin)
- **Request Body**:
```json
{
  "name": { "vi": "string (required)", "en": "string (required)" },
  "description": { "vi": "string (required)", "en": "string (required)" },
  "price": "number (required, min 0)",
  "stock": "number (required, min 0)",
  "villageId": "string (required)",
  "images": [{ "url": "string", "isMain": "boolean", "order": "number" }],
  "glbUrl": "string (optional)",
  "usdzUrl": "string (optional)",
  "arTargetImageUrl": "string (optional)",
  "arTrackingFsetUrl": "string (optional)",
  "arTrackingFset3Url": "string (optional)",
  "arTrackingIsetUrl": "string (optional)",
  "processVideoUrl": "string (optional)",
  "processVideoDescription": "string (optional)",
  "isVisible": "boolean (optional, default true)",
  "isFeatured": "boolean (optional, default false)"
}
```
- **Response 201**: product đầy đủ
- **Errors**: `404 VILLAGE_NOT_FOUND`, `401 UNAUTHORIZED`, `403 FORBIDDEN`, `422 VALIDATION_ERROR`

---

### GET /admin/products/:id
- **Auth**: Yes (admin)
- **Response 200**: product đầy đủ (including isVisible, isFeatured, deletedAt)
- **Errors**: `404 NOT_FOUND`

---

### PATCH /admin/products/:id
- **Auth**: Yes (admin)
- **Request Body**: same as POST (all optional)
- **Response 200**: product sau khi update
- **Errors**: `404 NOT_FOUND`, `422 VALIDATION_ERROR`

---

### DELETE /admin/products/:id
- **Auth**: Yes (admin)
- **Mô tả**: Soft delete — set `deletedAt`, ẩn khỏi shop
- **Response 204**
- **Errors**: `404 NOT_FOUND`

---

### PATCH /admin/products/:id/visibility
- **Auth**: Yes (admin)
- **Request Body**: `{ "isVisible": "boolean (required)" }`
- **Response 200**: `{ "success": true, "data": { "isVisible": "boolean" } }`
- **Errors**: `404 NOT_FOUND`, `422 VALIDATION_ERROR`

---

### PATCH /admin/products/:id/featured
- **Auth**: Yes (admin)
- **Request Body**: `{ "isFeatured": "boolean (required)" }`
- **Response 200**: `{ "success": true, "data": { "isFeatured": "boolean" } }`
- **Errors**: `404 NOT_FOUND`, `422 VALIDATION_ERROR`

---

## 15. Admin — Hotspots

### GET /admin/products/:productId/hotspots
- **Auth**: Yes (admin)
- **Response 200**: `data: Hotspot[]`

---

### POST /admin/products/:productId/hotspots
- **Auth**: Yes (admin)
- **Request Body**:
```json
{
  "slotName": "string (required)",
  "position": { "x": "number", "y": "number", "z": "number" },
  "normal": { "x": "number", "y": "number", "z": "number" },
  "title": { "vi": "string (required)", "en": "string (required)" },
  "content": { "vi": "string (required)", "en": "string (required)" },
  "imageUrl": "string (optional)"
}
```
- **Response 201**: hotspot vừa tạo
- **Errors**: `404 PRODUCT_NOT_FOUND`, `422 VALIDATION_ERROR`

---

### PATCH /admin/hotspots/:id
- **Auth**: Yes (admin)
- **Request Body**: same as POST (all optional)
- **Response 200**: hotspot sau khi update
- **Errors**: `404 NOT_FOUND`, `422 VALIDATION_ERROR`

---

### DELETE /admin/hotspots/:id
- **Auth**: Yes (admin)
- **Response 204**
- **Errors**: `404 NOT_FOUND`

---

## 16. Admin — Villages

### GET /admin/villages
- **Auth**: Yes (admin)
- **Response 200**: `data: Village[]` (all 5, summary)

---

### GET /admin/villages/:id
- **Auth**: Yes (admin)
- **Response 200**: village đầy đủ kèm stages
- **Errors**: `404 NOT_FOUND`

---

### PATCH /admin/villages/:id
- **Auth**: Yes (admin)
- **Request Body** (all optional):
```json
{
  "name": { "vi": "string", "en": "string" },
  "tagline": { "vi": "string", "en": "string" },
  "shortDescription": { "vi": "string", "en": "string" },
  "fullHistory": { "vi": "string (HTML)", "en": "string (HTML)" },
  "coverImageUrl": "string",
  "introVideoUrl": "string",
  "artisanImageUrl": "string",
  "artisanStory": { "vi": "string (HTML)", "en": "string (HTML)" },
  "artisanQuote": { "vi": "string", "en": "string" }
}
```
- **Response 200**: village sau khi update
- **Errors**: `404 NOT_FOUND`, `422 VALIDATION_ERROR`

---

## 17. Admin — Village Stages

### POST /admin/villages/:villageId/stages
- **Auth**: Yes (admin)
- **Request Body**:
```json
{
  "order": "number (required, 1-4)",
  "title": { "vi": "string (required)", "en": "string (required)" },
  "description": { "vi": "string (required)", "en": "string (required)" },
  "imageUrls": ["string (optional)"],
  "videoUrl": "string (optional)"
}
```
- **Response 201**: stage vừa tạo
- **Errors**: `404 VILLAGE_NOT_FOUND`, `422 VALIDATION_ERROR`

---

### PATCH /admin/stages/:id
- **Auth**: Yes (admin)
- **Request Body**: same as POST (all optional)
- **Response 200**: stage sau khi update
- **Errors**: `404 NOT_FOUND`, `422 VALIDATION_ERROR`

---

### DELETE /admin/stages/:id
- **Auth**: Yes (admin)
- **Response 204**
- **Errors**: `404 NOT_FOUND`

---

## 18. Admin — Orders

### GET /admin/orders
- **Auth**: Yes (admin)
- **Query**: `page`, `limit`, `status`, `search` (mã đơn / tên / SĐT)
- **Response 200**: paginated order list kèm `adminNote`, `trackingCode`

---

### GET /admin/orders/:id
- **Auth**: Yes (admin)
- **Response 200**: order đầy đủ (same shape as GET /orders/:id + adminNote)
- **Errors**: `404 NOT_FOUND`

---

### PATCH /admin/orders/:id/status
- **Auth**: Yes (admin)
- **Request Body**:
```json
{
  "status": "pending | packing | shipping | delivered | cancelled (required)",
  "trackingCode": "string (optional)",
  "note": "string (optional)"
}
```
- **Response 200**: order sau khi update
- **Errors**: `400 INVALID_STATUS_TRANSITION`, `404 NOT_FOUND`, `422 VALIDATION_ERROR`

---

## 19. Admin — Reviews

### GET /admin/reviews
- **Auth**: Yes (admin)
- **Query**: `page`, `limit`, `status` (`pending | approved | hidden`), `productId`, `rating`
- **Response 200**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "_id": "string",
        "user": { "fullName": "string", "email": "string" },
        "product": { "_id": "string", "name": { "vi": "string", "en": "string" } },
        "rating": "number",
        "content": "string",
        "imageUrls": ["string"],
        "status": "string",
        "createdAt": "ISO8601"
      }
    ],
    "total": "number",
    "page": "number",
    "limit": "number"
  }
}
```

---

### PATCH /admin/reviews/:id/status
- **Auth**: Yes (admin)
- **Request Body**: `{ "status": "approved | hidden (required)" }`
- **Response 200**: review sau khi update
- **Errors**: `404 NOT_FOUND`, `422 VALIDATION_ERROR`

---

### DELETE /admin/reviews/:id
- **Auth**: Yes (admin)
- **Response 204**
- **Errors**: `404 NOT_FOUND`

---

## 20. Admin — Users

### GET /admin/users
- **Auth**: Yes (admin)
- **Query**: `page`, `limit`, `search` (tên / email), `status`
- **Response 200**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "_id": "string",
        "fullName": "string",
        "email": "string",
        "role": "string",
        "status": "active | locked | unverified",
        "orderCount": "number",
        "createdAt": "ISO8601"
      }
    ],
    "total": "number",
    "page": "number",
    "limit": "number"
  }
}
```

---

### GET /admin/users/:id
- **Auth**: Yes (admin)
- **Response 200**: user detail kèm order history summary
- **Errors**: `404 NOT_FOUND`

---

### PATCH /admin/users/:id/status
- **Auth**: Yes (admin)
- **Request Body**: `{ "status": "active | locked (required)" }`
- **Response 200**: `{ "success": true, "data": { "status": "string" } }`
- **Errors**: `400 CANNOT_LOCK_SELF` (admin không tự khoá mình), `404 NOT_FOUND`, `422 VALIDATION_ERROR`

---

## Endpoint Summary

| # | Method | Path | Auth | Actor |
|---|--------|------|------|-------|
| 1 | GET | /health | No | — |
| 2 | POST | /auth/register | No | Guest |
| 3 | POST | /auth/login | No | Guest |
| 4 | POST | /auth/logout | Yes | Any |
| 5 | POST | /auth/refresh | No | — |
| 6 | GET | /auth/me | Yes | Any |
| 7 | POST | /auth/forgot-password | No | Guest |
| 8 | POST | /auth/reset-password | No | Guest |
| 9 | PATCH | /users/me | Yes | Customer, Admin |
| 10 | PATCH | /users/me/password | Yes | Customer, Admin |
| 11 | PATCH | /users/me/avatar | Yes | Customer, Admin |
| 12 | GET | /addresses | Yes | Customer |
| 13 | POST | /addresses | Yes | Customer |
| 14 | PATCH | /addresses/:id | Yes | Customer |
| 15 | DELETE | /addresses/:id | Yes | Customer |
| 16 | PATCH | /addresses/:id/default | Yes | Customer |
| 17 | GET | /villages | No | Any |
| 18 | GET | /villages/:slug | No | Any |
| 19 | GET | /products | No | Any |
| 20 | GET | /products/featured | No | Any |
| 21 | GET | /products/:id | No | Any |
| 22 | GET | /products/:id/related | No | Any |
| 23 | GET | /products/:id/reviews | No | Any |
| 24 | POST | /products/:id/reviews | Yes | Customer |
| 25 | GET | /cart | No | Guest, Customer |
| 26 | POST | /cart/items | Yes | Customer |
| 27 | PATCH | /cart/items/:productId | Yes | Customer |
| 28 | DELETE | /cart/items/:productId | Yes | Customer |
| 29 | DELETE | /cart | Yes | Customer |
| 30 | POST | /cart/merge | Yes | Customer |
| 31 | POST | /orders | No | Guest, Customer |
| 32 | GET | /orders | Yes | Customer |
| 33 | GET | /orders/:id | Yes | Customer, Admin |
| 34 | GET | /payments/return | No | Payment gateway |
| 35 | POST | /payments/ipn | No | Payment gateway |
| 36 | GET | /wishlist | Yes | Customer |
| 37 | POST | /wishlist/:productId | Yes | Customer |
| 38 | DELETE | /wishlist/:productId | Yes | Customer |
| 39 | GET | /static-content/:key | No | Any |
| 40 | POST | /upload | Yes | Admin |
| 41 | GET | /admin/dashboard/stats | Yes | Admin |
| 42 | GET | /admin/products | Yes | Admin |
| 43 | POST | /admin/products | Yes | Admin |
| 44 | GET | /admin/products/:id | Yes | Admin |
| 45 | PATCH | /admin/products/:id | Yes | Admin |
| 46 | DELETE | /admin/products/:id | Yes | Admin |
| 47 | PATCH | /admin/products/:id/visibility | Yes | Admin |
| 48 | PATCH | /admin/products/:id/featured | Yes | Admin |
| 49 | GET | /admin/products/:productId/hotspots | Yes | Admin |
| 50 | POST | /admin/products/:productId/hotspots | Yes | Admin |
| 51 | PATCH | /admin/hotspots/:id | Yes | Admin |
| 52 | DELETE | /admin/hotspots/:id | Yes | Admin |
| 53 | GET | /admin/villages | Yes | Admin |
| 54 | GET | /admin/villages/:id | Yes | Admin |
| 55 | PATCH | /admin/villages/:id | Yes | Admin |
| 56 | POST | /admin/villages/:villageId/stages | Yes | Admin |
| 57 | PATCH | /admin/stages/:id | Yes | Admin |
| 58 | DELETE | /admin/stages/:id | Yes | Admin |
| 59 | GET | /admin/orders | Yes | Admin |
| 60 | GET | /admin/orders/:id | Yes | Admin |
| 61 | PATCH | /admin/orders/:id/status | Yes | Admin |
| 62 | GET | /admin/reviews | Yes | Admin |
| 63 | PATCH | /admin/reviews/:id/status | Yes | Admin |
| 64 | DELETE | /admin/reviews/:id | Yes | Admin |
| 65 | GET | /admin/users | Yes | Admin |
| 66 | GET | /admin/users/:id | Yes | Admin |
| 67 | PATCH | /admin/users/:id/status | Yes | Admin |
