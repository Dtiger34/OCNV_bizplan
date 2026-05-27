import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewsRepository } from '../../reviews/reviews.repository';
import { ReviewStatus } from '../../../common/enums';

@Injectable()
export class AdminReviewsService {
  constructor(private readonly reviewsRepository: ReviewsRepository) {}

  async findAll(
    page: number,
    limit: number,
    status?: ReviewStatus,
  ): Promise<{ items: unknown[]; total: number; page: number; limit: number }> {
    const { data, total } = await this.reviewsRepository.findAll(page, limit, status);
    return { items: data, total, page, limit };
  }

  async updateStatus(id: string, status: ReviewStatus): Promise<unknown> {
    const review = await this.reviewsRepository.updateById(id, { status });
    if (!review) {
      throw new NotFoundException({ error: 'NOT_FOUND', message: 'Đánh giá không tồn tại.' });
    }
    return review;
  }

  async remove(id: string): Promise<void> {
    const review = await this.reviewsRepository.findById(id);
    if (!review) {
      throw new NotFoundException({ error: 'NOT_FOUND', message: 'Đánh giá không tồn tại.' });
    }
    await this.reviewsRepository.deleteById(id);
  }
}
