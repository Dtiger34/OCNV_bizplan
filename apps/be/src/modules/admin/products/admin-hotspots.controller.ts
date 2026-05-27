import { Controller, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminProductsService } from './admin-products.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { UserRole } from '../../../common/enums';

@ApiTags('admin/hotspots')
@ApiBearerAuth()
@Roles(UserRole.ADMIN)
@UseGuards(RolesGuard)
@Controller('admin/hotspots')
export class AdminHotspotsController {
  constructor(private readonly adminProductsService: AdminProductsService) {}

  @Patch(':id')
  @ApiOperation({ summary: 'Update a hotspot' })
  async update(@Param('id') id: string, @Body() body: unknown) {
    return this.adminProductsService.updateHotspot(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a hotspot' })
  async remove(@Param('id') id: string) {
    return this.adminProductsService.deleteHotspot(id);
  }
}
