import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Village, VillageDocument } from './schemas/village.schema';

@Injectable()
export class VillagesRepository {
  constructor(@InjectModel(Village.name) private readonly villageModel: Model<VillageDocument>) {}

  async findAll(): Promise<VillageDocument[]> {
    return this.villageModel.find().exec();
  }

  async findBySlug(slug: string): Promise<VillageDocument | null> {
    return this.villageModel.findOne({ slug }).exec();
  }

  async findById(id: string): Promise<VillageDocument | null> {
    return this.villageModel.findById(id).exec();
  }

  async updateById(id: string, update: Partial<Village>): Promise<VillageDocument | null> {
    return this.villageModel.findByIdAndUpdate(id, update, { new: true }).exec();
  }
}
