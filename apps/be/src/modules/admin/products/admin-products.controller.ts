import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminProductsService } from './admin-products.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { UserRole } from '../../../common/enums';

@ApiTags('admin/products')
@ApiBearerAuth()
@Roles(UserRole.ADMIN)
@UseGuards(RolesGuard)
@Controller('admin/products')
export class AdminProductsController {
  constructor(private readonly adminProductsService: AdminProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List all products (admin)' })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 20) {
    return this.adminProductsService.findAll(+page, +limit);
  }

  @Post()
  @ApiOperation({ summary: 'Create a product' })
  async create(@Body() body: unknown) {
    return this.adminProductsService.create(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product detail (admin)' })
  async findById(@Param('id') id: string) {
    return this.adminProductsService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  async update(@Param('id') id: string, @Body() body: unknown) {
    return this.adminProductsService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product (soft)' })
  async remove(@Param('id') id: string) {
    return this.adminProductsService.remove(id);
  }

  @Patch(':id/visibility')
  @ApiOperation({ summary: 'Toggle product visibility' })
  async toggleVisibility(@Param('id') id: string, @Body() body: { isVisible: boolean }) {
    return this.adminProductsService.toggleVisibility(id, body.isVisible);
  }

  @Patch(':id/featured')
  @ApiOperation({ summary: 'Toggle product featured status' })
  async toggleFeatured(@Param('id') id: string, @Body() body: { isFeatured: boolean }) {
    return this.adminProductsService.toggleFeatured(id, body.isFeatured);
  }

  @Get(':productId/hotspots')
  @ApiOperation({ summary: 'List hotspots for a product' })
  async getHotspots(@Param('productId') productId: string) {
    return this.adminProductsService.getHotspots(productId);
  }

  @Post(':productId/hotspots')
  @ApiOperation({ summary: 'Create a hotspot for a product' })
  async createHotspot(@Param('productId') productId: string, @Body() body: unknown) {
    return this.adminProductsService.createHotspot(productId, body);
  }
}
