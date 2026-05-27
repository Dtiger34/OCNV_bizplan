export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

export enum UserStatus {
  ACTIVE = 'active',
  LOCKED = 'locked',
  UNVERIFIED = 'unverified',
}

export enum OrderStatus {
  PENDING = 'pending',
  PACKING = 'packing',
  SHIPPING = 'shipping',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum PaymentMethod {
  COD = 'cod',
  BANK_TRANSFER = 'bank_transfer',
  VNPAY = 'vnpay',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
}

export enum ReviewStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  HIDDEN = 'hidden',
}

export enum StaticContentKey {
  FAQ = 'faq',
  RETURN_POLICY = 'return_policy',
  SHIPPING_POLICY = 'shipping_policy',
  CONTACT = 'contact',
}
