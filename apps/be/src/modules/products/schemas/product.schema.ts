import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BilingualText, BilingualTextSchema } from '../../../common/schemas/bilingual-text.schema';

export type ProductDocument = Product & Document;

@Schema({ _id: false })
class ProductImage {
  @Prop({ required: true })
  url: string;

  @Prop({ default: false })
  isMain: boolean;

  @Prop({ default: 0 })
  order: number;
}

const ProductImageSchema = SchemaFactory.createForClass(ProductImage);

@Schema({ timestamps: true, collection: 'products' })
export class Product {
  @Prop({ type: BilingualTextSchema, required: true })
  name: BilingualText;

  @Prop({ type: BilingualTextSchema })
  description: BilingualText;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true, min: 0, default: 0 })
  stock: number;

  @Prop({ type: Types.ObjectId, ref: 'Village', required: true, index: true })
  villageId: Types.ObjectId;

  @Prop({ type: [ProductImageSchema], default: [] })
  images: ProductImage[];

  @Prop()
  glbUrl?: string;

  @Prop()
  usdzUrl?: string;

  @Prop()
  arTargetImageUrl?: string;

  @Prop()
  arTrackingFsetUrl?: string;

  @Prop()
  arTrackingFset3Url?: string;

  @Prop()
  arTrackingIsetUrl?: string;

  @Prop()
  processVideoUrl?: string;

  @Prop()
  processVideoDescription?: string;

  @Prop({ default: true, index: true })
  isVisible: boolean;

  @Prop({ default: false, index: true })
  isFeatured: boolean;

  @Prop({ default: null })
  deletedAt?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ price: 1 });
ProductSchema.index({ createdAt: -1 });
ProductSchema.index({ 'name.vi': 'text', 'name.en': 'text' });
