import { Injectable, NotFoundException } from '@nestjs/common';
import { VillagesRepository } from '../../villages/villages.repository';
import { VillageStagesService } from '../../village-stages/village-stages.service';

@Injectable()
export class AdminVillagesService {
  constructor(
    private readonly villagesRepository: VillagesRepository,
    private readonly villageStagesService: VillageStagesService,
  ) {}

  async findAll(): Promise<unknown[]> {
    return this.villagesRepository.findAll();
  }

  async findById(id: string): Promise<unknown> {
    const village = await this.villagesRepository.findById(id);
    if (!village) {
      throw new NotFoundException({ error: 'NOT_FOUND', message: 'Làng nghề không tồn tại.' });
    }
    return village;
  }

  async update(id: string, data: Record<string, unknown>): Promise<unknown> {
    const village = await this.villagesRepository.updateById(id, data as any);
    if (!village) {
      throw new NotFoundException({ error: 'NOT_FOUND', message: 'Làng nghề không tồn tại.' });
    }
    return village;
  }

  async createStage(villageId: string, data: Record<string, unknown>): Promise<unknown> {
    return this.villageStagesService.create(villageId, data);
  }

  async updateStage(id: string, data: Record<string, unknown>): Promise<unknown> {
    return this.villageStagesService.update(id, data);
  }

  async deleteStage(id: string): Promise<void> {
    return this.villageStagesService.remove(id);
  }
}
