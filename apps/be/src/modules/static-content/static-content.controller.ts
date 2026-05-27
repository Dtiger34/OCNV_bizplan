import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StaticContentService } from './static-content.service';
import { StaticContentKey } from '../../common/enums';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('static-content')
@Controller('static-content')
export class StaticContentController {
  constructor(private readonly staticContentService: StaticContentService) {}

  @Public()
  @Get(':key')
  @ApiOperation({ summary: 'Get static content by key' })
  async findByKey(@Param('key') key: StaticContentKey) {
    return this.staticContentService.findByKey(key);
  }
}
