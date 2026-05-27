import { Controller, Get, Patch, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminReviewsService } from './admin-reviews.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { UserRole, ReviewStatus } from '../../../common/enums';

@ApiTags('admin/reviews')
@ApiBearerAuth()
@Roles(UserRole.ADMIN)
@UseGuards(RolesGuard)
@Controller('admin/reviews')
export class AdminReviewsController {
  constructor(private readonly adminReviewsService: AdminReviewsService) {}

  @Get()
  @ApiOperation({ summary: 'List all reviews (admin)' })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('status') status?: ReviewStatus,
  ) {
    return this.adminReviewsService.findAll(+page, +limit, status);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update review status' })
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status: ReviewStatus },
  ) {
    return this.adminReviewsService.updateStatus(id, body.status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a review' })
  async remove(@Param('id') id: string) {
    return this.adminReviewsService.remove(id);
  }
}
