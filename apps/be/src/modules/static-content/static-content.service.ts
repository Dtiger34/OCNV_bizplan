import { Injectable, NotFoundException } from '@nestjs/common';
import { StaticContentRepository } from './static-content.repository';
import { StaticContentKey } from '../../common/enums';

@Injectable()
export class StaticContentService {
  constructor(private readonly staticContentRepository: StaticContentRepository) {}

  async findByKey(key: StaticContentKey): Promise<unknown> {
    const item = await this.staticContentRepository.findByKey(key);
    if (!item) {
      throw new NotFoundException({ error: 'NOT_FOUND', message: 'Nội dung không tồn tại.' });
    }
    return item;
  }

  async findAll(): Promise<unknown[]> {
    return this.staticContentRepository.findAll();
  }

  async updateByKey(key: StaticContentKey, content: { vi: string; en: string }): Promise<unknown> {
    return this.staticContentRepository.upsertByKey(key, content);
  }
}
