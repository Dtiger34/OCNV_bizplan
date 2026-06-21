import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole, UserStatus } from '../../../common/enums';

export type UserDocument = User & Document;

@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop()
  phone?: string;

  @Prop()
  avatarUrl?: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.CUSTOMER })
  role: UserRole;

  @Prop({ type: String, enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Prop({ select: false })
  passwordResetToken?: string;

  @Prop({ select: false })
  passwordResetExpires?: Date;

  @Prop({ select: false })
  refreshToken?: string;

  @Prop({ select: false })
  emailVerifyToken?: string;

  @Prop({ select: false })
  emailVerifyExpires?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ status: 1 });
