import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VillageStagesService } from './village-stages.service';
import { VillageStagesRepository } from './village-stages.repository';
import { VillageStage, VillageStageSchema } from './schemas/village-stage.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: VillageStage.name, schema: VillageStageSchema }])],
  providers: [VillageStagesService, VillageStagesRepository],
  exports: [VillageStagesService, VillageStagesRepository, MongooseModule],
})
export class VillageStagesModule {}
