import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from '../../products/products.repository';
import { HotspotsService } from '../../hotspots/hotspots.service';

@Injectable()
export class AdminProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly hotspotsService: HotspotsService,
  ) {}

  async findAll(
    page: number,
    limit: number,
    search?: string,
  ): Promise<{ items: unknown[]; total: number; page: number; limit: number }> {
    const { data, total } = await this.productsRepository.adminFindAll(page, limit, search);
    return { items: data, total, page, limit };
  }

  async create(data: Record<string, unknown>): Promise<unknown> {
    return this.productsRepository.create(data as any);
  }

  async findById(id: string): Promise<unknown> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new NotFoundException({ error: 'NOT_FOUND', message: 'Sản phẩm không tồn tại.' });
    }
    return product;
  }

  async update(id: string, data: Record<string, unknown>): Promise<unknown> {
    const product = await this.productsRepository.updateById(id, data as any);
    if (!product) {
      throw new NotFoundException({ error: 'NOT_FOUND', message: 'Sản phẩm không tồn tại.' });
    }
    return product;
  }

  async remove(id: string): Promise<void> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new NotFoundException({ error: 'NOT_FOUND', message: 'Sản phẩm không tồn tại.' });
    }
    await this.productsRepository.softDeleteById(id);
  }

  async toggleVisibility(id: string, isVisible: boolean): Promise<unknown> {
    const product = await this.productsRepository.updateById(id, { isVisible });
    if (!product) {
      throw new NotFoundException({ error: 'NOT_FOUND', message: 'Sản phẩm không tồn tại.' });
    }
    return product;
  }

  async toggleFeatured(id: string, isFeatured: boolean): Promise<unknown> {
    const product = await this.productsRepository.updateById(id, { isFeatured });
    if (!product) {
      throw new NotFoundException({ error: 'NOT_FOUND', message: 'Sản phẩm không tồn tại.' });
    }
    return product;
  }

  async getHotspots(productId: string): Promise<unknown[]> {
    return this.hotspotsService.findByProduct(productId);
  }

  async createHotspot(productId: string, data: Record<string, unknown>): Promise<unknown> {
    return this.hotspotsService.create(productId, data);
  }

  async updateHotspot(id: string, data: Record<string, unknown>): Promise<unknown> {
    return this.hotspotsService.update(id, data);
  }

  async deleteHotspot(id: string): Promise<void> {
    return this.hotspotsService.remove(id);
  }
}
