import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { StaticContentKey } from '../../../common/enums';
import { BilingualText, BilingualTextSchema } from '../../../common/schemas/bilingual-text.schema';

export type StaticContentDocument = StaticContent & Document;

@Schema({ timestamps: true, collection: 'staticContents' })
export class StaticContent {
  @Prop({ type: String, enum: StaticContentKey, required: true, unique: true })
  key: StaticContentKey;

  @Prop({ type: BilingualTextSchema, required: true })
  content: BilingualText;
}

export const StaticContentSchema = SchemaFactory.createForClass(StaticContent);
