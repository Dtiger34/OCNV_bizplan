import { Controller, Get, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminUsersService } from './admin-users.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { UserRole, UserStatus } from '../../../common/enums';

@ApiTags('admin/users')
@ApiBearerAuth()
@Roles(UserRole.ADMIN)
@UseGuards(RolesGuard)
@Controller('admin/users')
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Get()
  @ApiOperation({ summary: 'List all users (admin)' })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 20) {
    return this.adminUsersService.findAll(+page, +limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user detail (admin)' })
  async findById(@Param('id') id: string) {
    return this.adminUsersService.findById(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update user status (lock/unlock)' })
  async updateStatus(@Param('id') id: string, @Body() body: { status: UserStatus }) {
    return this.adminUsersService.updateStatus(id, body.status);
  }
}
