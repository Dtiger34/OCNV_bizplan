import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BilingualText, BilingualTextSchema } from '../../../common/schemas/bilingual-text.schema';

export type VillageStageDocument = VillageStage & Document;

@Schema({ timestamps: true, collection: 'villageStages' })
export class VillageStage {
  @Prop({ type: Types.ObjectId, ref: 'Village', required: true, index: true })
  villageId: Types.ObjectId;

  @Prop({ required: true, min: 1, max: 4 })
  order: number;

  @Prop({ type: BilingualTextSchema, required: true })
  title: BilingualText;

  @Prop({ type: BilingualTextSchema })
  description: BilingualText;

  @Prop({ type: [String], default: [] })
  imageUrls: string[];

  @Prop()
  videoUrl?: string;
}

export const VillageStageSchema = SchemaFactory.createForClass(VillageStage);
