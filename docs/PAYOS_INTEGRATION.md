# PayOS Payment Gateway Integration Guide

## 🎯 Overview

Hướng dẫn tích hợp **PayOS** - nền tảng thanh toán QR Code hàng đầu Việt Nam.

**Features:**
- ✅ Thanh toán QR Code động
- ✅ Webhook callback an toàn (HMAC-SHA256)
- ✅ Polling payment status
- ✅ Cancel payment support
- ✅ Full Vietnamese support

---

## 🔐 Bước 1: Lấy Credentials từ PayOS

1. **Đăng ký tài khoản**: https://dashboard.payos.vn
2. **Lấy Client ID**: Truy cập Settings → API Keys → Client ID
3. **Lấy API Key**: Settings → API Keys → API Key
4. **Lấy Checksum Key**: Settings → API Keys → Checksum Key (dùng cho webhook)

---

## ⚙️ Bước 2: Cấu hình Environment Variables

### Backend (`.env`)

```env
# PayOS Credentials
PAYOS_CLIENT_ID=your-client-id
PAYOS_API_KEY=your-api-key
PAYOS_CHECKSUM_KEY=your-checksum-key

# Callback URLs
PAYOS_RETURN_URL=https://yourdomain.com/payment/success
PAYOS_CANCEL_URL=https://yourdomain.com/payment/cancel
```

### Frontend (`.env`)

```env
# Payment Return Pages
VITE_PAYMENT_SUCCESS_URL=/payment/success
VITE_PAYMENT_CANCEL_URL=/payment/cancel
```

---

## 🔄 Bước 3: Flow Thanh toán PayOS

```
┌─────────┐
│  User   │
└────┬────┘
     │ 1. Tạo đơn hàng
     ↓
┌─────────────────┐
│   FE: Create    │
│      Order      │
└────┬────────────┘
     │ 2. Request checkout
     ↓
┌──────────────────────────┐
│  BE: createPayOSCheckout │
└────┬─────────────────────┘
     │ 3. Call PayOS API
     ↓
┌─────────────────┐
│  PayOS Server   │
│ (checkoutUrl)   │
└────┬────────────┘
     │ 4. Redirect
     ↓
┌──────────────────┐
│ PayOS Checkout   │
│  (QR Code View)  │
└────┬─────────────┘
     │ 5. User scans & pays
     │
     ├─ Webhook Notification (async)
     │  └─> BE: handlePayOSWebhook
     │      └─> Update Order Status
     │
     └─ Redirect back
        └─> FE: /payment/success
            └─> Poll payment status
```

---

## 📝 Bước 4: Backend Implementation

### 4.1 PayOS Service (`payos.service.ts`)

```typescript
// Tạo checkout link
const response = await payosService.createCheckout({
  orderCode: 123456,
  amount: 100000,
  description: 'Thanh toán đơn hàng #ABC',
  buyerName: 'Nguyễn Văn A',
  buyerEmail: 'user@example.com',
  buyerPhone: '0123456789',
  buyerAddress: '123 Ngõ 10 Tôn Thất Thuyết, Hà Nội',
  returnUrl: 'https://yourdomain.com/payment/success',
  cancelUrl: 'https://yourdomain.com/payment/cancel',
  expiredAt: Math.floor(Date.now() / 1000) + 3600, // 1 hour
});

// Response
{
  code: '00',
  desc: 'Tạo yêu cầu thanh toán thành công',
  data: {
    checkoutUrl: 'https://checkout.payos.vn/...',
    qrCode: 'data:image/png;base64,...'
  }
}
```

### 4.2 Endpoint: Create Checkout

**Request**:
```http
POST /api/v1/payments/payos/create-checkout
Content-Type: application/json

{
  "orderCode": "OCNV-1718373600000-ABC12",
  "buyerName": "Nguyễn Văn A",
  "buyerEmail": "user@example.com",
  "buyerPhone": "0123456789",
  "buyerAddress": "123 Tôn Thất Thuyết, Hà Nội"
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "checkoutUrl": "https://checkout.payos.vn/...",
    "qrCode": "data:image/png;base64,..."
  },
  "message": "Tạo yêu cầu thanh toán thành công"
}
```

### 4.3 Endpoint: Payment Status

**Request**:
```http
GET /api/v1/payments/payos/OCNV-1718373600000-ABC12
```

**Response** (200):
```json
{
  "success": true,
  "orderCode": "OCNV-1718373600000-ABC12",
  "paymentStatus": "PAID",
  "amount": 100000,
  "transactionDateTime": "2026-06-14T15:30:00Z"
}
```

### 4.4 Webhook: Payment Notification

**PayOS → BE**: PayOS gọi webhook khi thanh toán thành công/thất bại

**URL**: `POST /api/v1/payments/payos/webhook`

**Headers**:
```
x-payos-signature: <signature>
```

**Body**:
```json
{
  "orderCode": 123456,
  "amount": 100000,
  "description": "Thanh toán đơn hàng #ABC",
  "transactionDateTime": "2026-06-14T15:30:00Z",
  "signature": "hash_value"
}
```

**Response** (200):
```json
{
  "code": "00",
  "desc": "Success"
}
```

**Security**: 
- Signature được tính: `HMAC-SHA256(orderCode + amount + description + transactionDateTime, checksumKey)`
- Backend xác thực trước khi update order

---

## 🎨 Bước 5: Frontend Implementation

### 5.1 Checkout Component

```typescript
import { useCreatePayOSCheckout } from '@/features/orders/hooks/usePaymentPayOS';

export function CheckoutButton() {
  const { mutate: createCheckout } = useCreatePayOSCheckout();
  
  const handlePayment = () => {
    createCheckout({
      orderCode: order.orderCode,
      buyerName: user.fullName,
      buyerEmail: user.email,
      buyerPhone: user.phone,
      buyerAddress: selectedAddress.street,
    });
    // Hook tự động chuyển hướng sang PayOS checkout
  };

  return (
    <button onClick={handlePayment}>
      Thanh toán với PayOS
    </button>
  );
}
```

### 5.2 Payment Success Page

```typescript
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePayOSPaymentStatus } from '@/features/orders/hooks/usePaymentPayOS';

export function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const orderCode = searchParams.get('orderCode');

  const { data: status, isLoading } = usePayOSPaymentStatus(orderCode);

  useEffect(() => {
    if (status?.paymentStatus === 'PAID') {
      // Payment confirmed
      navigate('/profile/orders');
    }
  }, [status]);

  if (isLoading) {
    return <div>Đang xác nhận thanh toán...</div>;
  }

  if (status?.paymentStatus === 'PAID') {
    return <div>✅ Thanh toán thành công!</div>;
  }

  return <div>Đang chờ xác nhận...</div>;
}
```

### 5.3 Payment Cancel Page

```typescript
export function PaymentCancelPage() {
  return (
    <div className="text-center">
      <h1>❌ Thanh toán bị hủy</h1>
      <p>Bạn đã hủy quá trình thanh toán</p>
      <Link to="/checkout">← Quay lại giỏ hàng</Link>
    </div>
  );
}
```

---

## 🧪 Bước 6: Testing

### 6.1 Test Credentials (Sandbox)

PayOS cung cấp môi trường test:

```env
PAYOS_CLIENT_ID=test_client_id
PAYOS_API_KEY=test_api_key
PAYOS_CHECKSUM_KEY=test_checksum_key
```

### 6.2 Test Scenarios

**Scenario 1: Thanh toán thành công**
1. Tạo đơn hàng
2. Click "Thanh toán PayOS"
3. Scan QR hoặc chọn phương thức
4. Xác nhận thanh toán
5. Nhận webhook confirmation
6. Redirect → success page

**Scenario 2: Hủy thanh toán**
1. Tạo đơn hàng
2. Click "Thanh toán PayOS"
3. Bấm "Hủy"
4. Redirect → cancel page

**Scenario 3: Webhook verification**
```bash
# Test webhook signature
curl -X POST http://localhost:3001/api/v1/payments/payos/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "orderCode": 123456,
    "amount": 100000,
    "description": "Test",
    "transactionDateTime": "2026-06-14T15:30:00Z",
    "signature": "computed_signature"
  }'
```

---

## 🔒 Security Best Practices

### 1. Signature Verification
✅ Backend ALWAYS xác thực webhook signature trước update order
```typescript
const isValid = payosService.verifyWebhookSignature(
  orderCode, amount, description, transactionDateTime, signature
);
if (!isValid) return 'Invalid';
```

### 2. Amount Validation
✅ So sánh amount PayOS với amount order
```typescript
if (paymentInfo.amount !== order.total) {
  throw new Error('Amount mismatch');
}
```

### 3. Idempotency
✅ Webhook có thể gọi nhiều lần → dùng unique transactionId
```typescript
const existing = await Order.findOne({
  'payment.transactionId': paymentInfo.id
});
if (existing && existing.payment.status === PAID) {
  return 'Already processed';
}
```

### 4. Rate Limiting
✅ Rate limit webhook endpoint
```typescript
@UseGuards(ThrottleGuard)
@Post('/payos/webhook')
async handlePayOSWebhook(@Body() body: any) { ... }
```

### 5. Timeout Handling
⚠️ Order có timeout 24h nếu không thanh toán
```typescript
// Cleanup expired orders (cron job)
CronSchedule('0 0 * * *') // Hàng ngày
async cleanupExpiredOrders() {
  await Order.deleteMany({
    createdAt: { $lt: Date.now() - 86400000 },
    'payment.status': PENDING
  });
}
```

---

## 📊 Database Schema

### Order Payment Fields
```typescript
interface Payment {
  method: 'cod' | 'bank_transfer' | 'payos'; // PayOS method
  status: 'pending' | 'paid' | 'failed';
  transactionId?: string; // PayOS transaction ID
  responseCode?: string; // PayOS response code
  paidAt?: Date;
}
```

### Payment History (Optional)
```typescript
interface PaymentHistory {
  orderCode: string;
  paymentMethod: string;
  amount: number;
  payosOrderCode: number;
  transactionId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  webhookPayload?: Record<string, any>; // Store for audit
}
```

---

## 🚨 Troubleshooting

### Issue: "PayOS is not configured"
**Giải pháp**: Kiểm tra `.env` có đầy đủ `PAYOS_CLIENT_ID`, `PAYOS_API_KEY`, `PAYOS_CHECKSUM_KEY`

### Issue: "Invalid signature in webhook"
**Giải pháp**: 
1. Verify checksum key là chính xác
2. Signature formula: `HMAC-SHA256(orderCode + amount + description + transactionDateTime, key)`

### Issue: "Order not found" khi nhận webhook
**Giải pháp**:
1. Verify orderCode format chính xác
2. Order phải được tạo trước khi payment initiated
3. Check MongoDB connection

### Issue: QR Code không hiển thị
**Giải pháp**:
1. `checkoutUrl` là valid link → render `<a href={checkoutUrl}>`
2. Hoặc display QR code từ `qrCode` base64 string

---

## 📞 Support

- **PayOS Documentation**: https://docs.payos.vn
- **PayOS Dashboard**: https://dashboard.payos.vn
- **Test Data**: https://docs.payos.vn/sandbox

---

## 🎓 Additional Resources

### Payment Flow Diagram
```
User → FE Checkout → BE CreateOrder → BE CreatePayOSCheckout
  ↓
PayOS Checkout URL
  ↓
User Scans QR → Payment Done
  ↓
PayOS Webhook → BE Update Order
  ↓
FE Polling → Payment Status
  ↓
Redirect to Success/Order History
```

### Code Examples Repository
- Check `/docs/examples/payos-integration/` for full code samples
- Unit tests: `/apps/be/src/modules/payments/__tests__/`

---

**Last Updated**: 2026-06-14
**Status**: ✅ Production Ready
