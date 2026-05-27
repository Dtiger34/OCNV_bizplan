import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BilingualText, BilingualTextSchema } from '../../../common/schemas/bilingual-text.schema';

@Schema({ _id: false })
class Vector3 {
  @Prop({ required: true }) x: number;
  @Prop({ required: true }) y: number;
  @Prop({ required: true }) z: number;
}

const Vector3Schema = SchemaFactory.createForClass(Vector3);

export type HotspotDocument = Hotspot & Document;

@Schema({ timestamps: true, collection: 'hotspots' })
export class Hotspot {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true, index: true })
  productId: Types.ObjectId;

  @Prop({ required: true })
  slotName: string;

  @Prop({ type: Vector3Schema, required: true })
  position: Vector3;

  @Prop({ type: Vector3Schema, required: true })
  normal: Vector3;

  @Prop({ type: BilingualTextSchema, required: true })
  title: BilingualText;

  @Prop({ type: BilingualTextSchema })
  content: BilingualText;

  @Prop()
  imageUrl?: string;
}

export const HotspotSchema = SchemaFactory.createForClass(Hotspot);
