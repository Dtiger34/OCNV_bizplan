import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Hotspot, HotspotDocument } from './schemas/hotspot.schema';

@Injectable()
export class HotspotsRepository {
  constructor(@InjectModel(Hotspot.name) private readonly hotspotModel: Model<HotspotDocument>) {}

  async findByProduct(productId: string): Promise<HotspotDocument[]> {
    return this.hotspotModel.find({ productId: new Types.ObjectId(productId) }).exec();
  }

  async findById(id: string): Promise<HotspotDocument | null> {
    return this.hotspotModel.findById(id).exec();
  }

  async create(data: Partial<Hotspot>): Promise<HotspotDocument> {
    return this.hotspotModel.create(data);
  }

  async updateById(id: string, update: Partial<Hotspot>): Promise<HotspotDocument | null> {
    return this.hotspotModel.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  async deleteById(id: string): Promise<void> {
    await this.hotspotModel.findByIdAndDelete(id).exec();
  }
}
