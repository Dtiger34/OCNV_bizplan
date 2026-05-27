import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Types } from 'mongoose';
import { AddressesRepository } from './addresses.repository';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressDocument } from './schemas/address.schema';

@Injectable()
export class AddressesService {
  constructor(private readonly addressesRepository: AddressesRepository) {}

  async findAll(userId: string): Promise<unknown[]> {
    const addresses = await this.addressesRepository.findAllByUser(userId);
    return addresses.map((a) => this.toDto(a));
  }

  async create(userId: string, dto: CreateAddressDto): Promise<unknown> {
    if (dto.isDefault) {
      await this.addressesRepository.clearDefault(userId);
    }
    const address = await this.addressesRepository.create({
      ...dto,
      userId: new Types.ObjectId(userId),
    });
    return this.toDto(address);
  }

  async update(userId: string, id: string, dto: UpdateAddressDto): Promise<unknown> {
    const address = await this.addressesRepository.findById(id);
    if (!address || address.deletedAt) {
      throw new NotFoundException({ error: 'NOT_FOUND', message: 'Địa chỉ không tồn tại.' });
    }
    if (String(address.userId) !== userId) {
      throw new ForbiddenException({ error: 'FORBIDDEN', message: 'Không có quyền cập nhật địa chỉ này.' });
    }
    const updated = await this.addressesRepository.updateById(id, dto);
    return this.toDto(updated!);
  }

  async remove(userId: string, id: string): Promise<void> {
    const address = await this.addressesRepository.findById(id);
    if (!address || address.deletedAt) {
      throw new NotFoundException({ error: 'NOT_FOUND', message: 'Địa chỉ không tồn tại.' });
    }
    if (String(address.userId) !== userId) {
      throw new ForbiddenException({ error: 'FORBIDDEN', message: 'Không có quyền xóa địa chỉ này.' });
    }
    await this.addressesRepository.deleteById(id);
  }

  async setDefault(userId: string, id: string): Promise<unknown> {
    const address = await this.addressesRepository.findById(id);
    if (!address || address.deletedAt) {
      throw new NotFoundException({ error: 'NOT_FOUND', message: 'Địa chỉ không tồn tại.' });
    }
    if (String(address.userId) !== userId) {
      throw new ForbiddenException({ error: 'FORBIDDEN', message: 'Không có quyền thay đổi địa chỉ này.' });
    }
    await this.addressesRepository.clearDefault(userId);
    const updated = await this.addressesRepository.updateById(id, { isDefault: true });
    return this.toDto(updated!);
  }

  private toDto(address: AddressDocument): Record<string, unknown> {
    return {
      _id: String(address._id),
      fullName: address.fullName,
      phone: address.phone,
      province: address.province,
      district: address.district,
      ward: address.ward,
      street: address.street,
      isDefault: address.isDefault,
      createdAt: address.createdAt,
    };
  }
}
