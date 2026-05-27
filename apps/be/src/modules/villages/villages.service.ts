import { Injectable, NotFoundException } from '@nestjs/common';
import { VillagesRepository } from './villages.repository';

@Injectable()
export class VillagesService {
  constructor(private readonly villagesRepository: VillagesRepository) {}

  async findAll(): Promise<unknown[]> {
    return this.villagesRepository.findAll();
  }

  async findBySlug(slug: string): Promise<unknown> {
    const village = await this.villagesRepository.findBySlug(slug);
    if (!village) {
      throw new NotFoundException({ error: 'NOT_FOUND', message: 'Làng nghề không tồn tại.' });
    }
    return village;
  }
}
