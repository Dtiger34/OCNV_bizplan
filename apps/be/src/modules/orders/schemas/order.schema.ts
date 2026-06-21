import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { OrderStatus, PaymentMethod, PaymentStatus } from '../../../common/enums';

@Schema({ _id: false })
class OrderItemEmbed {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ required: true })
  productName: string;

  @Prop()
  productImageUrl?: string;

  @Prop({ required: true, min: 1 })
  quantity: number;

  @Prop({ required: true, min: 0 })
  unitPrice: number;

  @Prop({ default: false })
  isReviewed: boolean;
}

const OrderItemEmbedSchema = SchemaFactory.createForClass(OrderItemEmbed);

@Schema({ _id: false })
class PaymentEmbed {
  @Prop({ type: String, enum: PaymentMethod, required: true })
  method: PaymentMethod;

  @Prop({ type: String, enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: PaymentStatus;

  @Prop()
  transactionId?: string;

  @Prop()
  responseCode?: string;

  @Prop()
  paidAt?: Date;
}

const PaymentEmbedSchema = SchemaFactory.createForClass(PaymentEmbed);

@Schema({ _id: false })
class ShippingAddress {
  @Prop({ required: true }) fullName: string;
  @Prop({ required: true }) phone: string;
  @Prop({ required: true }) province: string;
  @Prop({ required: true }) district: string;
  @Prop({ required: true }) ward: string;
  @Prop({ required: true }) street: string;
}

const ShippingAddressSchema = SchemaFactory.createForClass(ShippingAddress);

@Schema({ _id: false })
class OrderStatusHistory {
  @Prop({ type: String, enum: OrderStatus, required: true })
  status: OrderStatus;

  @Prop({ required: true })
  updatedAt: Date;

  @Prop()
  note?: string;
}

const OrderStatusHistorySchema = SchemaFactory.createForClass(OrderStatusHistory);

export type OrderDocument = Order & Document;

@Schema({ timestamps: true, collection: 'orders' })
export class Order {
  @Prop({ required: true, unique: true })
  orderCode: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId?: Types.ObjectId;

  @Prop({ type: ShippingAddressSchema, required: true })
  shippingAddress: ShippingAddress;

  @Prop({ type: [OrderItemEmbedSchema], default: [] })
  items: OrderItemEmbed[];

  @Prop({ required: true, min: 0 })
  subtotal: number;

  @Prop({ required: true, min: 0, default: 0 })
  shippingFee: number;

  @Prop({ required: true, min: 0 })
  total: number;

  @Prop({ type: PaymentEmbedSchema, required: true })
  payment: PaymentEmbed;

  @Prop({ type: String, enum: OrderStatus, default: OrderStatus.PENDING, index: true })
  status: OrderStatus;

  @Prop({ type: [OrderStatusHistorySchema], default: [] })
  statusHistory: OrderStatusHistory[];

  @Prop()
  trackingCode?: string;

  @Prop()
  customerNote?: string;

  @Prop()
  adminNote?: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.index({ userId: 1 });
OrderSchema.index({ createdAt: -1 });
