import { Module } from '@nestjs/common';
import { AdminStaticContentController } from './admin-static-content.controller';
import { AdminStaticContentService } from './admin-static-content.service';
import { StaticContentModule } from '../../static-content/static-content.module';

@Module({
  imports: [StaticContentModule],
  controllers: [AdminStaticContentController],
  providers: [AdminStaticContentService],
})
export class AdminStaticContentModule {}
