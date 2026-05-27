import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class BilingualText {
  @Prop({ required: true })
  vi: string;

  @Prop({ required: true })
  en: string;
}

export const BilingualTextSchema = SchemaFactory.createForClass(BilingualText);
