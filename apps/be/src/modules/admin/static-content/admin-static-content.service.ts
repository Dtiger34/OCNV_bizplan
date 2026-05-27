import { Injectable } from '@nestjs/common';
import { StaticContentService } from '../../static-content/static-content.service';
import { UpdateStaticContentDto } from './dto/update-static-content.dto';
import { StaticContentKey } from '../../../common/enums';

@Injectable()
export class AdminStaticContentService {
  constructor(private readonly staticContentService: StaticContentService) {}

  async findAll(): Promise<unknown[]> {
    return this.staticContentService.findAll();
  }

  async updateByKey(key: StaticContentKey, dto: UpdateStaticContentDto): Promise<unknown> {
    return this.staticContentService.updateByKey(key, dto.content);
  }
}
