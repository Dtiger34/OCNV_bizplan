import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Address, AddressDocument } from './schemas/address.schema';

@Injectable()
export class AddressesRepository {
  constructor(@InjectModel(Address.name) private readonly addressModel: Model<AddressDocument>) {}

  async findAllByUser(userId: string): Promise<AddressDocument[]> {
    return this.addressModel.find({ userId: new Types.ObjectId(userId) }).exec();
  }

  async findById(id: string): Promise<AddressDocument | null> {
    return this.addressModel.findById(id).exec();
  }

  async create(data: Partial<Address>): Promise<AddressDocument> {
    return this.addressModel.create(data);
  }

  async updateById(id: string, update: Partial<Address>): Promise<AddressDocument | null> {
    return this.addressModel.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  async deleteById(id: string): Promise<void> {
    await this.addressModel.findByIdAndUpdate(id, { deletedAt: new Date() }).exec();
  }

  async clearDefault(userId: string): Promise<void> {
    await this.addressModel.updateMany({ userId: new Types.ObjectId(userId) }, { isDefault: false }).exec();
  }
}
