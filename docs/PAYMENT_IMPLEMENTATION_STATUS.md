# 💳 Payment Implementation Status Report

**Date**: 2026-06-14  
**Overall Progress**: **40% Complete**

---

## 📊 Progress Summary

| Layer | Status | Progress | Notes |
|-------|--------|----------|-------|
| **Backend** | 🟨 Partial | 70% | PayOS integration ready, missing order-payment link |
| **Frontend** | 🔴 Minimal | 20% | UI exists, no real API integration |
| **Database** | 🟢 Ready | 100% | Order schema supports payments |
| **Payment Gateway** | 🟨 Partial | 50% | PayOS service done, VNPay is mock |
| **Testing** | 🔴 None | 0% | No tests written |
| **Documentation** | 🟢 Complete | 100% | Full docs created |

---

## ✅ Backend Status (70% Complete)

### Implemented ✅

1. **PayosService** (`payos.service.ts`)
   - ✅ `createCheckout()` - Create PayOS QR Code
   - ✅ `getPaymentInfo()` - Check payment status
   - ✅ `cancelPayment()` - Cancel pending payment
   - ✅ `verifyWebhookSignature()` - HMAC-SHA256 signature verification
   - ✅ Configuration validation

2. **PaymentsService** (extended)
   - ✅ `createPayOSCheckout()` - Link order with PayOS checkout
   - ✅ `getPayOSPaymentStatus()` - Poll payment status
   - ✅ `handlePayOSWebhook()` - Process webhook callbacks
   - ✅ `handlePayOSPaymentSuccess()` - Confirm successful payment

3. **PaymentsController**
   - ✅ `POST /payments/payos/create-checkout` - Create checkout link
   - ✅ `GET /payments/payos/:orderCode` - Check status
   - ✅ `POST /payments/payos/webhook` - Webhook endpoint
   - ✅ Public endpoints for callbacks

4. **Database & Config**
   - ✅ Order schema includes `payment` field
   - ✅ Environment variables configured
   - ✅ Config schema updated

### NOT Implemented ❌

1. **Order Creation** ❌
   - ❌ Backend does NOT create orders when user submits checkout
   - ❌ Currently, `createOrder()` only works with mock data
   - ❌ No real order save to database from checkout

2. **Error Handling** ⚠️
   - ⚠️ Minimal error logging
   - ⚠️ No retry logic for failed webhook callbacks
   - ⚠️ No transaction rollback

3. **Payment Method Routing** ❌
   - ❌ `createOrder()` creates order but doesn't differentiate PayOS payment flow
   - ❌ Currently: Order created → hardcoded mock return URL
   - ❌ Should be: Order created → Call `createPayOSCheckout()` if method is PayOS

### Endpoints Available

```
POST   /api/v1/orders                          ✅ Create order (hardcoded)
POST   /api/v1/payments/payos/create-checkout  ✅ Create checkout
GET    /api/v1/payments/payos/:orderCode       ✅ Check status
POST   /api/v1/payments/payos/webhook          ✅ Webhook callback
GET    /api/v1/payments/return                 ✅ Mock gateway return
POST   /api/v1/payments/ipn                    ✅ Mock gateway IPN
```

---

## ❌ Frontend Status (20% Complete)

### UI Components ✅

1. **Checkout Page** (`CheckoutPage.tsx`) ✅
   - ✅ Shipping address form (fullName, phone, province, district, ward, street)
   - ✅ Payment method selection (COD, Bank Transfer, Online)
   - ✅ Order summary with cart items
   - ✅ Total calculation
   - ✅ Submit button

2. **Success Page** (`CheckoutSuccessPage.tsx`) ✅
   - ✅ Success message
   - ✅ Order code display
   - ✅ Links to order history

3. **Payment Return Page** (`PaymentReturnPage.tsx`) ✅
   - ✅ Success/Failure handling
   - ✅ Order code display
   - ✅ Navigation links

### Routes ✅

- ✅ `/checkout` - Protected route
- ✅ `/checkout/success` - Protected route
- ✅ `/checkout/payment-return` - Public route

### API Integration ❌ (NOT IMPLEMENTED)

1. **Order Creation** ❌
   - ❌ Checkout page does NOT call `/orders` API
   - ❌ Currently: Form submission → mock orderCode generation → navigate to success
   - ❌ Should be: Form submission → POST to `/orders` → wait for backend response

2. **PayOS Integration** ❌
   - ❌ No `useCreatePayOSCheckout()` hook usage
   - ❌ No QR code display
   - ❌ No polling for payment status
   - ❌ Hook exists but not connected to components

3. **Payment Methods** ⚠️
   - ⚠️ Radio buttons show "Online" but don't specify PayOS
   - ⚠️ No conditional rendering for PayOS flow
   - ⚠️ Currently all methods treated the same (except redirect)

### Missing Components ❌

```
Missing:
❌ useCreateOrder hook - POST /orders
❌ PayOS flow integration
❌ Payment status polling
❌ QR code display component
❌ Loading/error states
❌ Form validation
❌ Address selection from saved addresses
❌ Coupon/discount code input
```

---

## 🔄 Current Payment Flow (MOCK)

```
Frontend:
  1. User fills checkout form
  2. Selects payment method
  3. Clicks "ĐẶT HÀNG NGAY LẬP TỨC"
  4. handleSubmit() triggered
  5. Generate mock orderCode: "DH-XXXXXX"
  6. clearCart() in memory
  7. Navigate to success/return page

Backend: NOT INVOLVED ❌

Database: NOT INVOLVED ❌
```

---

## 🎯 Required Implementation Steps

### Step 1: Create useCreateOrder Hook (1-2 hours)

**File**: `apps/fe/src/features/orders/hooks/useCreateOrder.ts`

```typescript
export function useCreateOrder() {
  return useMutation({
    mutationFn: async (data: {
      items: Array<{ productId: string; quantity: number }>;
      shippingAddress: {
        fullName: string;
        phone: string;
        province: string;
        district: string;
        ward: string;
        street: string;
      };
      paymentMethod: 'cod' | 'bank_transfer' | 'payos';
      customerNote?: string;
    }) => {
      const res = await apiClient.post('/orders', data);
      return res.data.data; // Returns created order with orderCode
    },
  });
}
```

### Step 2: Integrate useCreateOrder in CheckoutPage (2-3 hours)

**File**: `apps/fe/src/features/checkout/pages/CheckoutPage.tsx`

Current code:
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // Mock only
  const orderCode = 'DH-' + Math.floor(100000 + Math.random() * 900000);
  clearCart();
  navigate(`/checkout/success?orderCode=${orderCode}`);
};
```

Should be:
```typescript
const { mutate: createOrder, isPending } = useCreateOrder();

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  // Validate form
  if (!fullName || !phone || !street) {
    setError('Please fill all required fields');
    return;
  }

  // Create order
  createOrder({
    items: cartItems.map(item => ({
      productId: item.id,
      quantity: item.quantity,
    })),
    shippingAddress: {
      fullName, phone, province, district, ward, street,
    },
    paymentMethod,
    customerNote: note,
  }, {
    onSuccess: (order) => {
      if (paymentMethod === 'payos') {
        // Redirect to PayOS checkout
        navigate('/checkout/payos', { state: { order } });
      } else {
        // Direct success
        navigate(`/checkout/success?orderCode=${order.orderCode}`);
      }
    },
  });
};
```

### Step 3: Create PayOS Checkout Page (1-2 hours)

**File**: `apps/fe/src/features/checkout/pages/PayOSCheckoutPage.tsx`

```typescript
import { useLocation } from 'react-router-dom';
import { useCreatePayOSCheckout } from '@/features/orders/hooks/usePaymentPayOS';

export function PayOSCheckoutPage() {
  const location = useLocation();
  const order = location.state?.order;
  const { mutate: createCheckout, isPending } = useCreatePayOSCheckout();

  useEffect(() => {
    if (order) {
      createCheckout({
        orderCode: order.orderCode,
        buyerName: order.shippingAddress.fullName,
        buyerEmail: user.email,
        buyerPhone: order.shippingAddress.phone,
        buyerAddress: order.shippingAddress.street,
      });
    }
  }, [order]);

  return <div>Processing PayOS checkout...</div>;
}
```

### Step 4: Update Router (30 min)

**File**: `apps/fe/src/router/index.tsx`

Add routes:
```typescript
{
  element: <PrivateRoute />,
  children: [
    { path: '/checkout', element: S(CheckoutPage) },
    { path: '/checkout/payos', element: S(PayOSCheckoutPage) },  // NEW
    { path: '/checkout/success', element: S(CheckoutSuccessPage) },
    { path: '/payment/success', element: S(PaymentSuccessPage) },  // NEW
    { path: '/payment/cancel', element: S(PaymentCancelPage) },   // NEW
  ],
}
```

### Step 5: Update Backend Order Service (1 hour)

**File**: `apps/be/src/modules/orders/orders.service.ts`

Current issue: `createOrder()` doesn't validate cartItems against real product data

Should:
1. Validate each product exists
2. Validate quantity is available
3. Check prices match current DB prices
4. Create order with real data
5. Return complete order object

### Step 6: Update CreateOrderDto (30 min)

**File**: `apps/be/src/modules/orders/dto/create-order.dto.ts`

Current:
```typescript
export class CreateOrderDto {
  @ValidateNested()
  @Type(() => ShippingAddressDto)
  shippingAddress!: ShippingAddressDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items!: OrderItemDto[];

  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;
}
```

Already correct! ✅ No changes needed.

---

## 🧪 Testing Checklist

### Frontend E2E Tests ❌
- [ ] Test checkout form validation
- [ ] Test order creation API call
- [ ] Test PayOS checkout flow
- [ ] Test payment success flow
- [ ] Test payment cancel flow
- [ ] Test COD/Bank transfer flow

### Backend Unit Tests ❌
- [ ] Test PayosService.createCheckout()
- [ ] Test signature verification
- [ ] Test webhook handling
- [ ] Test idempotency
- [ ] Test order status updates

### Integration Tests ❌
- [ ] End-to-end checkout flow
- [ ] PayOS webhook callback
- [ ] Payment status polling
- [ ] Order creation validation

---

## 📝 Code Quality

### Code Smells 🔴
- ❌ CheckoutPage doesn't call real API
- ❌ OrderCode is mock-generated, not from backend
- ❌ Cart is cleared before order confirmation
- ❌ No loading states in checkout form
- ❌ No error handling in payment flow
- ❌ Payment method selected but not validated

### Security Issues ⚠️
- ⚠️ Frontend passes total directly to backend (should recalculate)
- ⚠️ Cart items trusted from FE (should revalidate)
- ⚠️ No CSRF token on POST /orders (should add)

---

## 📋 Complete TODO List

### Phase 1: Backend Integration (4 hours)
- [ ] **Create useCreateOrder hook** (1-2h)
  - [ ] Define DTO interface
  - [ ] Handle response
  - [ ] Handle errors
  
- [ ] **Integrate in CheckoutPage** (2-3h)
  - [ ] Replace mock order creation
  - [ ] Add loading state
  - [ ] Add error handling
  - [ ] Conditionally route to PayOS
  
- [ ] **Test checkout flow** (1h)
  - [ ] Create real orders
  - [ ] Verify DB persistence
  - [ ] Verify order code format

### Phase 2: PayOS Integration (3 hours)
- [ ] **Create PayOS Checkout Page** (1-2h)
  - [ ] Handle redirect from checkout
  - [ ] Call createPayOSCheckout
  - [ ] Display QR code
  
- [ ] **Create Payment Pages** (1h)
  - [ ] Payment success page
  - [ ] Payment cancel page
  - [ ] Status polling
  
- [ ] **Update Router** (30 min)
  - [ ] Register new routes
  - [ ] Update redirects

### Phase 3: Refinement (3 hours)
- [ ] **Form Validation** (1h)
  - [ ] Better error messages
  - [ ] Real-time validation
  
- [ ] **Loading/Error States** (1h)
  - [ ] Spinners
  - [ ] Toast notifications
  - [ ] Retry logic
  
- [ ] **Testing** (1h)
  - [ ] Manual end-to-end
  - [ ] Edge cases
  - [ ] Error scenarios

---

## 🔗 Dependency Map

```
CheckoutPage
  ├── useCreateOrder (MISSING)
  │   └── POST /api/v1/orders
  │       └── OrdersService.createOrder()
  │
  ├── PayOSCheckoutPage (MISSING)
  │   └── useCreatePayOSCheckout (EXISTS but unused)
  │       └── PaymentsService.createPayOSCheckout()
  │           └── PayosService.createCheckout()
  │
  └── PaymentSuccessPage (MISSING)
      └── usePayOSPaymentStatus (EXISTS but unused)
          └── PaymentsService.getPayOSPaymentStatus()
              └── PayosService.getPaymentInfo()
```

---

## 📊 Effort Estimate

| Task | Effort | Blocker | Status |
|------|--------|---------|--------|
| useCreateOrder hook | 1-2h | ❌ No | ⏳ TODO |
| Integrate CheckoutPage | 2-3h | ✅ Yes | ⏳ TODO |
| PayOS Checkout Page | 1-2h | ⏳ After prev | ⏳ TODO |
| Payment Pages | 1h | ⏳ After prev | ⏳ TODO |
| Router updates | 30min | ⏳ After prev | ⏳ TODO |
| Form validation | 1h | ❌ No | ⏳ TODO |
| Loading/Error states | 1h | ❌ No | ⏳ TODO |
| Testing | 1-2h | ❌ No | ⏳ TODO |
| **TOTAL** | **~10 hours** | | **40% done** |

---

## 🎓 Summary

**Current State**:
- ✅ Backend services 100% ready (PayOS + mock)
- ❌ Frontend is 100% mock (no real API calls)
- ✅ Database schema ready
- ❌ Order creation not integrated
- ❌ Payment flow not tested

**Next Priority**:
1. **Create useCreateOrder hook** - Enable real order creation
2. **Integrate in CheckoutPage** - Replace mock with real API
3. **Create PayOS flow** - Complete payment integration
4. **Test end-to-end** - Verify full payment flow

**Critical Path**: Hook → CheckoutPage Integration → PayOS Pages → Testing

**Estimated Time to 100%**: 10-12 hours

