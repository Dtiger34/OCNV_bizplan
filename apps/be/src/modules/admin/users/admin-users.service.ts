import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { UserStatus } from '../../../common/enums';

@Injectable()
export class AdminUsersService {
  constructor(private readonly usersService: UsersService) {}

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ items: unknown[]; total: number; page: number; limit: number }> {
    return this.usersService.findAll(page, limit);
  }

  async findById(id: string): Promise<unknown> {
    return this.usersService.findById(id);
  }

  async updateStatus(id: string, status: UserStatus): Promise<unknown> {
    return this.usersService.updateStatus(id, status);
  }
}
