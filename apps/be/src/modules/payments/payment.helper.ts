/**
 * Tạo URL thanh toán cho mock gateway
 */
export function createPaymentUrl(orderCode: string, amount: number, returnUrl: string): string {
  return `${returnUrl}?orderCode=${encodeURIComponent(orderCode)}&amount=${amount}&status=success`;
}

/**
 * Xác minh return URL từ mock payment gateway
 */
export function verifyReturn(query: Record<string, string>): boolean {
  return query['status'] === 'success' && Boolean(query['orderCode']);
}

/**
 * Chuyển đổi orderCode (string) sang PayOS orderCode (number)
 * PayOS yêu cầu orderCode là số nguyên dương
 */
export function convertToPayOSOrderCode(orderCode: string): number {
  // Loại bỏ ký tự không phải số, lấy các số từ cuối chuỗi
  const numberStr = orderCode.replace(/\D/g, '').slice(-10);
  const converted = parseInt(numberStr, 10);

  if (isNaN(converted) || converted <= 0) {
    throw new Error(`Invalid orderCode for PayOS: ${orderCode}`);
  }

  return converted;
}
