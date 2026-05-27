export function createPaymentUrl(orderCode: string, amount: number, returnUrl: string): string {
  return `${returnUrl}?orderCode=${encodeURIComponent(orderCode)}&amount=${amount}&status=success`;
}

export function verifyReturn(query: Record<string, string>): boolean {
  return query['status'] === 'success' && Boolean(query['orderCode']);
}
