import { Controller, Get, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminOrdersService } from './admin-orders.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { UserRole, OrderStatus } from '../../../common/enums';

@ApiTags('admin/orders')
@ApiBearerAuth()
@Roles(UserRole.ADMIN)
@UseGuards(RolesGuard)
@Controller('admin/orders')
export class AdminOrdersController {
  constructor(private readonly adminOrdersService: AdminOrdersService) {}

  @Get()
  @ApiOperation({ summary: 'List all orders (admin)' })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('status') status?: OrderStatus,
  ) {
    return this.adminOrdersService.findAll(+page, +limit, status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order detail (admin)' })
  async findById(@Param('id') id: string) {
    return this.adminOrdersService.findById(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update order status' })
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status: OrderStatus; note?: string },
  ) {
    return this.adminOrdersService.updateStatus(id, body.status, body.note);
  }
}
