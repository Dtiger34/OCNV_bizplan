import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersQueryDto } from './dto/get-orders-query.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  async createOrder(@CurrentUser() user: { userId: string }, @Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(user.userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List current user orders' })
  async findAll(@CurrentUser() user: { userId: string }, @Query() query: GetOrdersQueryDto) {
    return this.ordersService.findByUser(user.userId, query);
  }

  @Get('by-code/:orderCode')
  @ApiOperation({ summary: 'Get order by orderCode' })
  async findByOrderCode(@CurrentUser() user: { userId: string }, @Param('orderCode') orderCode: string) {
    return this.ordersService.findByOrderCode(user.userId, orderCode);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order detail' })
  async findById(@CurrentUser() user: { userId: string }, @Param('id') id: string) {
    return this.ordersService.findById(user.userId, id);
  }
}
