import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { VillagesService } from './villages.service';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('villages')
@Controller('villages')
export class VillagesController {
  constructor(private readonly villagesService: VillagesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all villages' })
  async findAll() {
    return this.villagesService.findAll();
  }

  @Public()
  @Get(':slug')
  @ApiOperation({ summary: 'Get village by slug' })
  async findBySlug(@Param('slug') slug: string) {
    return this.villagesService.findBySlug(slug);
  }
}
