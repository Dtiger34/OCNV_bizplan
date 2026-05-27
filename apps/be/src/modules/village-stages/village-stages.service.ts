import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { VillageStagesRepository } from './village-stages.repository';

@Injectable()
export class VillageStagesService {
  constructor(private readonly villageStagesRepository: VillageStagesRepository) {}

  async findByVillage(villageId: string): Promise<unknown[]> {
    return this.villageStagesRepository.findByVillage(villageId);
  }

  async create(villageId: string, data: Record<string, unknown>): Promise<unknown> {
    return this.villageStagesRepository.create({
      ...(data as any),
      villageId: new Types.ObjectId(villageId),
    });
  }

  async update(id: string, data: Record<string, unknown>): Promise<unknown> {
    const stage = await this.villageStagesRepository.updateById(id, data as any);
    if (!stage) {
      throw new NotFoundException({ error: 'NOT_FOUND', message: 'Giai đoạn không tồn tại.' });
    }
    return stage;
  }

  async remove(id: string): Promise<void> {
    const stage = await this.villageStagesRepository.findById(id);
    if (!stage) {
      throw new NotFoundException({ error: 'NOT_FOUND', message: 'Giai đoạn không tồn tại.' });
    }
    await this.villageStagesRepository.deleteById(id);
  }
}
