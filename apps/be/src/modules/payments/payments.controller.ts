import { Controller, Get, Post, Query, Body, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { PayosService } from './payos.service';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly payosService: PayosService,
  ) {}

  // ─────────────────────────────────────────────────────────────────────
  // Mock Payment Gateway (for testing)
  // ─────────────────────────────────────────────────────────────────────

  @Public()
  @Get('return')
  @ApiOperation({ summary: 'Handle payment gateway return redirect' })
  async paymentReturn(@Query() query: Record<string, string>) {
    return this.paymentsService.handlePaymentReturn(query);
  }

  @Public()
  @Post('ipn')
  @ApiOperation({ summary: 'Handle payment gateway IPN callback' })
  async paymentIpn(@Query() query: Record<string, string>) {
    return this.paymentsService.handlePaymentIpn(query);
  }

  // ─────────────────────────────────────────────────────────────────────
  // PayOS Payment
  // ─────────────────────────────────────────────────────────────────────

  @Post('payos/create-checkout')
  @ApiOperation({ summary: 'Create PayOS checkout link' })
  async createPayOSCheckout(@Body() body: any) {
    return this.paymentsService.createPayOSCheckout(body);
  }

  @Get('payos/:orderCode')
  @ApiOperation({ summary: 'Get PayOS payment status' })
  async getPayOSPaymentStatus(@Query('orderCode') orderCode: string) {
    return this.paymentsService.getPayOSPaymentStatus(orderCode);
  }

  @Public()
  @Post('payos/webhook')
  @ApiOperation({ summary: 'PayOS webhook callback' })
  async handlePayOSWebhook(@Body() body: any, @Headers() headers: any) {
    return this.paymentsService.handlePayOSWebhook(body);
  }

  @Public()
  @Post('payos/webhook/payment-success')
  @ApiOperation({ summary: 'PayOS payment success callback' })
  async handlePayOSPaymentSuccess(@Body() body: any) {
    return this.paymentsService.handlePayOSPaymentSuccess(body);
  }
}
