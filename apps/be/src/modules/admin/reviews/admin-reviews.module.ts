import { Module } from '@nestjs/common';
import { AdminReviewsController } from './admin-reviews.controller';
import { AdminReviewsService } from './admin-reviews.service';
import { ReviewsModule } from '../../reviews/reviews.module';

@Module({
  imports: [ReviewsModule],
  controllers: [AdminReviewsController],
  providers: [AdminReviewsService],
})
export class AdminReviewsModule {}
