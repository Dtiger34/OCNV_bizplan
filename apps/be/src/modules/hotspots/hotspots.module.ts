import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotspotsService } from './hotspots.service';
import { HotspotsRepository } from './hotspots.repository';
import { Hotspot, HotspotSchema } from './schemas/hotspot.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Hotspot.name, schema: HotspotSchema }])],
  providers: [HotspotsService, HotspotsRepository],
  exports: [HotspotsService, HotspotsRepository, MongooseModule],
})
export class HotspotsModule {}
