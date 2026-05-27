import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VillagesController } from './villages.controller';
import { VillagesService } from './villages.service';
import { VillagesRepository } from './villages.repository';
import { Village, VillageSchema } from './schemas/village.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Village.name, schema: VillageSchema }])],
  controllers: [VillagesController],
  providers: [VillagesService, VillagesRepository],
  exports: [VillagesService, VillagesRepository, MongooseModule],
})
export class VillagesModule {}
