import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminStaticContentService } from './admin-static-content.service';
import { UpdateStaticContentDto } from './dto/update-static-content.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { UserRole, StaticContentKey } from '../../../common/enums';

@ApiTags('admin/static-content')
@ApiBearerAuth()
@Roles(UserRole.ADMIN)
@UseGuards(RolesGuard)
@Controller('admin/static-content')
export class AdminStaticContentController {
  constructor(private readonly adminStaticContentService: AdminStaticContentService) {}

  @Get()
  @ApiOperation({ summary: 'List all static content (admin)' })
  async findAll() {
    return this.adminStaticContentService.findAll();
  }

  @Patch(':key')
  @ApiOperation({ summary: 'Update static content by key' })
  async updateByKey(
    @Param('key') key: StaticContentKey,
    @Body() dto: UpdateStaticContentDto,
  ) {
    return this.adminStaticContentService.updateByKey(key, dto);
  }
}
