import { Module } from '@nestjs/common';
import { AdminVillagesController } from './admin-villages.controller';
import { AdminVillagesService } from './admin-villages.service';
import { VillagesModule } from '../../villages/villages.module';
import { VillageStagesModule } from '../../village-stages/village-stages.module';

@Module({
  imports: [VillagesModule, VillageStagesModule],
  controllers: [AdminVillagesController],
  providers: [AdminVillagesService],
})
export class AdminVillagesModule {}
