# PayOS Integration Setup Checklist ✅

## Phase 1: Account Setup

- [ ] Đăng ký tài khoản PayOS: https://dashboard.payos.vn
- [ ] Verify email
- [ ] Cấu hình ngân hàng (optionally)
- [ ] Lấy credentials:
  - [ ] Client ID
  - [ ] API Key
  - [ ] Checksum Key

## Phase 2: Backend Setup

- [ ] Cài đặt dependencies: `pnpm add axios`
- [ ] Tạo `.env` với PayOS credentials:
  ```
  PAYOS_CLIENT_ID=...
  PAYOS_API_KEY=...
  PAYOS_CHECKSUM_KEY=...
  PAYOS_RETURN_URL=http://localhost:5173/payment/success
  PAYOS_CANCEL_URL=http://localhost:5173/payment/cancel
  ```
- [ ] Cập nhật `config.schema.ts` ✅ (đã làm)
- [ ] Tạo `payos.service.ts` ✅ (đã làm)
  - [ ] `createCheckout()`
  - [ ] `getPaymentInfo()`
  - [ ] `cancelPayment()`
  - [ ] `verifyWebhookSignature()`
- [ ] Cập nhật `payments.service.ts` ✅ (đã làm)
  - [ ] `createPayOSCheckout()`
  - [ ] `getPayOSPaymentStatus()`
  - [ ] `handlePayOSWebhook()`
  - [ ] `handlePayOSPaymentSuccess()`
- [ ] Cập nhật `payments.controller.ts` ✅ (đã làm)
  - [ ] `POST /payos/create-checkout`
  - [ ] `GET /payos/:orderCode`
  - [ ] `POST /payos/webhook`
  - [ ] `POST /payos/webhook/payment-success`
- [ ] Cập nhật `payments.module.ts` ✅ (đã làm)
  - [ ] Add PayosService to providers
- [ ] Test BE endpoints:
  ```bash
  # Create checkout
  curl -X POST http://localhost:3001/api/v1/payments/payos/create-checkout \
    -H "Content-Type: application/json" \
    -d '{
      "orderCode": "OCNV-123",
      "buyerName": "Test User",
      "buyerEmail": "test@example.com",
      "buyerPhone": "0123456789",
      "buyerAddress": "Test Address"
    }'
  ```

## Phase 3: Frontend Setup

- [ ] Tạo `usePaymentPayOS.ts` hook ✅ (đã làm)
  - [ ] `useCreatePayOSCheckout()`
  - [ ] `usePayOSPaymentStatus()`
  - [ ] `useHandlePayOSCallback()`
- [ ] Update Order DTOs (optional)
  - [ ] Add `paymentMethod` field
- [ ] Create Payment Success Page
  ```tsx
  // /pages/payment-success.tsx
  - Polling payment status
  - Redirect khi paid
  - Error handling
  ```
- [ ] Create Payment Cancel Page
  ```tsx
  // /pages/payment-cancel.tsx
  - Show cancellation message
  - Link back to orders
  ```
- [ ] Update Checkout Flow
  ```tsx
  // Conditional rendering based on paymentMethod
  if (method === 'payos') {
    return <PayOSCheckoutButton />;
  }
  ```

## Phase 4: Order Service Integration

- [ ] Update `createOrder()` trong OrdersService
  ```typescript
  // Remove mock VNPay URL, add PayOS support
  if (dto.paymentMethod === PaymentMethod.PAYOS) {
    // Don't return paymentUrl yet
    // User will call /payos/create-checkout after order created
  }
  ```
- [ ] Return proper payment method in response
- [ ] Add payment method to order response DTO

## Phase 5: Database & Schema

- [ ] Verify Order schema includes:
  ```typescript
  payment: {
    method: PaymentMethod;
    status: PaymentStatus;
    transactionId?: string; // PayOS transaction
    responseCode?: string;  // PayOS response
    paidAt?: Date;
  }
  ```
- [ ] Add index for payment queries: `db.orders.createIndex({ 'payment.status': 1 })`

## Phase 6: Security & Testing

- [ ] CORS configured for PayOS return URLs
  ```typescript
  // main.ts
  enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });
  ```
- [ ] Webhook endpoint is Public (no auth guard)
  ```typescript
  @Public()
  @Post('payos/webhook')
  async handlePayOSWebhook(@Body() body: any) { ... }
  ```
- [ ] Rate limiting on webhook (optional)
  ```typescript
  @UseGuards(ThrottleGuard)
  @Post('payos/webhook')
  ```
- [ ] Test webhook signature verification
  ```bash
  # Manual test
  const orderCode = 123456;
  const amount = 100000;
  const desc = "Test";
  const time = "2026-06-14T15:30:00Z";
  const sig = HMAC-SHA256(orderCode+amount+desc+time, key);
  ```
- [ ] Test with real PayOS (or sandbox if available)

## Phase 7: Monitoring & Logging

- [ ] Add logging in PayosService
  ```typescript
  this.logger.log(`PayOS checkout created for order ${orderCode}`);
  this.logger.error(`PayOS error: ${error.message}`);
  ```
- [ ] Add error tracking (Sentry, etc.)
- [ ] Monitor webhook failures
- [ ] Add analytics for payment methods

## Phase 8: Documentation & Deployment

- [ ] Document environment variables needed
  - [ ] Development
  - [ ] Staging
  - [ ] Production
- [ ] Create migration guide for existing users
- [ ] Update API documentation (Swagger)
- [ ] Test payment flow end-to-end:
  ```
  1. Create order
  2. Call create-checkout
  3. Get checkoutUrl
  4. User scans QR
  5. Payment done
  6. Webhook callback
  7. Polling success
  8. Verify order status = PAID
  ```
- [ ] Deploy to staging first
- [ ] Load test (webhook handling)
- [ ] Deploy to production

## Phase 9: Post-Launch

- [ ] Monitor payment success rate
- [ ] Check webhook delivery (any failed callbacks?)
- [ ] User feedback on payment experience
- [ ] Performance monitoring
- [ ] Plan for future enhancements:
  - [ ] Multi-payment methods support
  - [ ] Payment history dashboard
  - [ ] Refund management
  - [ ] Subscription/recurring payments

---

## Quick Commands

```bash
# Install dependencies
cd apps/be && pnpm add axios

# Test BE only
cd apps/be && npm run start:dev

# Test FE only  
cd apps/fe && npm run dev

# Full dev environment
pnpm dev

# Run unit tests
pnpm test

# Run e2e tests
pnpm test:e2e

# Build for production
pnpm build

# Deploy
pnpm deploy
```

---

## Estimated Effort

| Phase | Effort | Status |
|-------|--------|--------|
| 1. Account Setup | 30 min | ⏳ Manual |
| 2. Backend Setup | 2-3 hours | ✅ 80% Done |
| 3. Frontend Setup | 2-3 hours | ⏳ TODO |
| 4. Order Integration | 1 hour | ⏳ TODO |
| 5. Database Setup | 30 min | ✅ Done |
| 6. Security Testing | 2 hours | ⏳ TODO |
| 7. Monitoring | 1 hour | ⏳ TODO |
| 8. Documentation | 1 hour | ✅ Done |
| 9. Post-Launch | Ongoing | ⏳ TODO |
| **Total** | **~13 hours** | **30% Done** |

---

## Notes

- Replace `http://localhost:5173` with actual domain in production
- Checksum Key is sensitive - never commit to git
- Test thoroughly in sandbox before production
- Set up monitoring/alerts for failed webhooks
- Consider transaction logging for audit trail
