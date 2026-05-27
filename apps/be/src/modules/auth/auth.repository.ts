import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AuthRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).select('+password').exec();
  }

  async findByEmailVerifyToken(token: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ emailVerifyToken: token }).select('+emailVerifyToken +emailVerifyExpires').exec();
  }

  async findByPasswordResetToken(token: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ passwordResetToken: token }).select('+passwordResetToken +passwordResetExpires').exec();
  }

  async findByRefreshToken(userId: string): Promise<UserDocument | null> {
    return this.userModel.findById(userId).select('+refreshToken').exec();
  }

  async updateUser(id: string, update: Partial<User>): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(id, update, { new: true }).exec();
  }
}
