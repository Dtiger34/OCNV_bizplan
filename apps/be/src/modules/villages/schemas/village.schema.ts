import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BilingualText, BilingualTextSchema } from '../../../common/schemas/bilingual-text.schema';

export type VillageDocument = Village & Document;

@Schema({ timestamps: true, collection: 'villages' })
export class Village {
  @Prop({ type: BilingualTextSchema, required: true })
  name: BilingualText;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  slug: string;

  @Prop({ type: BilingualTextSchema })
  tagline: BilingualText;

  @Prop({ type: BilingualTextSchema })
  shortDescription: BilingualText;

  @Prop({ type: BilingualTextSchema })
  fullHistory: BilingualText;

  @Prop()
  coverImageUrl?: string;

  @Prop()
  introVideoUrl?: string;

  @Prop()
  artisanImageUrl?: string;

  @Prop({ type: BilingualTextSchema })
  artisanStory: BilingualText;

  @Prop({ type: BilingualTextSchema })
  artisanQuote: BilingualText;
}

export const VillageSchema = SchemaFactory.createForClass(Village);
VillageSchema.index({ slug: 1 }, { unique: true });
