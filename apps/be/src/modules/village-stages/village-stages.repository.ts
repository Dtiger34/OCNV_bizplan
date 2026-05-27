import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { VillageStage, VillageStageDocument } from './schemas/village-stage.schema';

@Injectable()
export class VillageStagesRepository {
  constructor(
    @InjectModel(VillageStage.name) private readonly stageModel: Model<VillageStageDocument>,
  ) {}

  async findByVillage(villageId: string): Promise<VillageStageDocument[]> {
    return this.stageModel.find({ villageId: new Types.ObjectId(villageId) }).sort({ order: 1 }).exec();
  }

  async findById(id: string): Promise<VillageStageDocument | null> {
    return this.stageModel.findById(id).exec();
  }

  async create(data: Partial<VillageStage>): Promise<VillageStageDocument> {
    return this.stageModel.create(data);
  }

  async updateById(id: string, update: Partial<VillageStage>): Promise<VillageStageDocument | null> {
    return this.stageModel.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  async deleteById(id: string): Promise<void> {
    await this.stageModel.findByIdAndDelete(id).exec();
  }
}
