import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PayOS } from '@payos/node';
import type { CreatePaymentLinkRequest, PaymentLink } from '@payos/node/lib/resources/v2/payment-requests/payment-requests';
import type { WebhookData } from '@payos/node/lib/resources/webhooks/webhook';

@Injectable()
export class PayosService {
  private readonly logger = new Logger(PayosService.name);
  private readonly client: InstanceType<typeof PayOS> | null = null;

  constructor(private readonly configService: ConfigService) {
    const clientId = this.configService.get<string>('PAYOS_CLIENT_ID', '');
    const apiKey = this.configService.get<string>('PAYOS_API_KEY', '');
    const checksumKey = this.configService.get<string>('PAYOS_CHECKSUM_KEY', '');

    if (clientId && apiKey && checksumKey) {
      this.client = new PayOS({ clientId, apiKey, checksumKey });
      this.logger.log('PayOS initialized');
    } else {
      this.logger.warn('PayOS not configured — payment features disabled');
    }
  }

  async createCheckout(data: CreatePaymentLinkRequest) {
    if (!this.client) throw new BadRequestException('PayOS is not configured');
    try {
      const result = await this.client.paymentRequests.create(data);
      this.logger.log(`PayOS checkout created: orderCode=${data.orderCode}`);
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`PayOS createCheckout failed: ${message}`);
      throw new BadRequestException(`PayOS error: ${message}`);
    }
  }

  async getPaymentInfo(orderCode: number): Promise<PaymentLink> {
    if (!this.client) throw new BadRequestException('PayOS is not configured');
    try {
      return await this.client.paymentRequests.get(orderCode);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`PayOS getPaymentInfo failed: ${message}`);
      throw new BadRequestException('Failed to get payment information');
    }
  }

  async cancelPayment(orderCode: number, reason?: string): Promise<void> {
    if (!this.client) throw new BadRequestException('PayOS is not configured');
    try {
      await this.client.paymentRequests.cancel(orderCode, reason ?? 'User cancelled');
      this.logger.log(`PayOS payment cancelled: orderCode=${orderCode}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`PayOS cancelPayment failed: ${message}`);
      throw new BadRequestException('Failed to cancel payment');
    }
  }

  async verifyWebhookData(body: any): Promise<WebhookData> {
    if (!this.client) throw new BadRequestException('PayOS is not configured');
    return this.client.webhooks.verify(body);
  }

  isConfigured(): boolean {
    return this.client !== null;
  }
}
