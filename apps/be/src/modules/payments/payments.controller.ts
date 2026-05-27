import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

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
}
