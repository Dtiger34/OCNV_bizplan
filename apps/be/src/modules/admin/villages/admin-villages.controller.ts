import { Controller, Get, Patch, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminVillagesService } from './admin-villages.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { UserRole } from '../../../common/enums';

@ApiTags('admin/villages')
@ApiBearerAuth()
@Roles(UserRole.ADMIN)
@UseGuards(RolesGuard)
@Controller('admin')
export class AdminVillagesController {
  constructor(private readonly adminVillagesService: AdminVillagesService) {}

  @Get('villages')
  @ApiOperation({ summary: 'List all villages (admin)' })
  async findAll() {
    return this.adminVillagesService.findAll();
  }

  @Get('villages/:id')
  @ApiOperation({ summary: 'Get village detail (admin)' })
  async findById(@Param('id') id: string) {
    return this.adminVillagesService.findById(id);
  }

  @Patch('villages/:id')
  @ApiOperation({ summary: 'Update a village' })
  async update(@Param('id') id: string, @Body() body: unknown) {
    return this.adminVillagesService.update(id, body);
  }

  @Post('villages/:villageId/stages')
  @ApiOperation({ summary: 'Create a village stage' })
  async createStage(@Param('villageId') villageId: string, @Body() body: unknown) {
    return this.adminVillagesService.createStage(villageId, body);
  }

  @Patch('stages/:id')
  @ApiOperation({ summary: 'Update a village stage' })
  async updateStage(@Param('id') id: string, @Body() body: unknown) {
    return this.adminVillagesService.updateStage(id, body);
  }

  @Delete('stages/:id')
  @ApiOperation({ summary: 'Delete a village stage' })
  async deleteStage(@Param('id') id: string) {
    return this.adminVillagesService.deleteStage(id);
  }
}
