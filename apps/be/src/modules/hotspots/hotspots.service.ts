import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { HotspotsRepository } from './hotspots.repository';

@Injectable()
export class HotspotsService {
  constructor(private readonly hotspotsRepository: HotspotsRepository) {}

  async findByProduct(productId: string): Promise<unknown[]> {
    return this.hotspotsRepository.findByProduct(productId);
  }

  async create(productId: string, data: Record<string, unknown>): Promise<unknown> {
    return this.hotspotsRepository.create({
      ...(data as any),
      productId: new Types.ObjectId(productId),
    });
  }

  async update(id: string, data: Record<string, unknown>): Promise<unknown> {
    const hotspot = await this.hotspotsRepository.updateById(id, data as any);
    if (!hotspot) {
      throw new NotFoundException({ error: 'NOT_FOUND', message: 'Hotspot không tồn tại.' });
    }
    return hotspot;
  }

  async remove(id: string): Promise<void> {
    const hotspot = await this.hotspotsRepository.findById(id);
    if (!hotspot) {
      throw new NotFoundException({ error: 'NOT_FOUND', message: 'Hotspot không tồn tại.' });
    }
    await this.hotspotsRepository.deleteById(id);
  }
}
