import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StaticContent, StaticContentDocument } from './schemas/static-content.schema';
import { StaticContentKey } from '../../common/enums';

@Injectable()
export class StaticContentRepository {
  constructor(
    @InjectModel(StaticContent.name) private readonly staticContentModel: Model<StaticContentDocument>,
  ) {}

  async findAll(): Promise<StaticContentDocument[]> {
    return this.staticContentModel.find().exec();
  }

  async findByKey(key: StaticContentKey): Promise<StaticContentDocument | null> {
    return this.staticContentModel.findOne({ key }).exec();
  }

  async upsertByKey(key: StaticContentKey, content: { vi: string; en: string }): Promise<StaticContentDocument> {
    return this.staticContentModel.findOneAndUpdate(
      { key },
      { $set: { content } },
      { upsert: true, new: true },
    ).exec() as Promise<StaticContentDocument>;
  }
}
