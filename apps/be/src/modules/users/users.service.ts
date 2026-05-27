import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as path from 'path';
import * as fs from 'fs';
import { UsersRepository } from './users.repository';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserDocument } from './schemas/user.schema';
import { UserStatus } from '../../common/enums';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async updateProfile(userId: string, dto: UpdateProfileDto): Promise<Record<string, unknown>> {
    const user = await this.usersRepository.updateById(userId, dto);
    if (!user) throw new NotFoundException({ error: 'NOT_FOUND', message: 'User không tồn tại.' });
    return this.toPublic(user);
  }

  async changePassword(userId: string, dto: ChangePasswordDto): Promise<{ message: string }> {
    const user = await this.usersRepository.findByIdWithPassword(userId);
    if (!user) throw new NotFoundException({ error: 'NOT_FOUND', message: 'User không tồn tại.' });

    const isMatch = await bcrypt.compare(dto.currentPassword, user.password);
    if (!isMatch) {
      throw new BadRequestException({ error: 'WRONG_PASSWORD', message: 'Mật khẩu hiện tại không đúng.' });
    }

    const hash = await bcrypt.hash(dto.newPassword, 12);
    await this.usersRepository.updateById(userId, { password: hash });
    return { message: 'Password updated successfully.' };
  }

  async updateAvatar(userId: string, file: Express.Multer.File): Promise<{ avatarUrl: string }> {
    const dir = path.join(process.cwd(), 'uploads', 'avatars');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const ext = path.extname(file.originalname);
    const filename = `${userId}${ext}`;
    fs.writeFileSync(path.join(dir, filename), file.buffer);
    const avatarUrl = `/static/avatars/${filename}`;
    const user = await this.usersRepository.updateById(userId, { avatarUrl });
    if (!user) throw new NotFoundException({ error: 'NOT_FOUND', message: 'User không tồn tại.' });
    return { avatarUrl };
  }

  async findById(id: string): Promise<Record<string, unknown>> {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundException({ error: 'NOT_FOUND', message: 'User không tồn tại.' });
    return this.toPublic(user);
  }

  async findAll(page: number, limit: number): Promise<{ items: unknown[]; total: number; page: number; limit: number }> {
    const { data, total } = await this.usersRepository.findAll(page, limit);
    return { items: data.map((u) => this.toPublic(u)), total, page, limit };
  }

  async updateStatus(id: string, status: UserStatus): Promise<Record<string, unknown>> {
    const user = await this.usersRepository.updateById(id, { status });
    if (!user) throw new NotFoundException({ error: 'NOT_FOUND', message: 'User không tồn tại.' });
    return this.toPublic(user);
  }

  private toPublic(user: UserDocument): Record<string, unknown> {
    return {
      _id: String(user._id),
      fullName: user.fullName,
      email: user.email,
      phone: user.phone ?? null,
      avatarUrl: user.avatarUrl ?? null,
      role: user.role,
      status: user.status,
    };
  }
}
