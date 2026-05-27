import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StaticContentController } from './static-content.controller';
import { StaticContentService } from './static-content.service';
import { StaticContentRepository } from './static-content.repository';
import { StaticContent, StaticContentSchema } from './schemas/static-content.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: StaticContent.name, schema: StaticContentSchema }])],
  controllers: [StaticContentController],
  providers: [StaticContentService, StaticContentRepository],
  exports: [StaticContentService, StaticContentRepository],
})
export class StaticContentModule {}
