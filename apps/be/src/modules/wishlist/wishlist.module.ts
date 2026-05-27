import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { WishlistRepository } from './wishlist.repository';
import { Wishlist, WishlistSchema } from './schemas/wishlist.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Wishlist.name, schema: WishlistSchema }])],
  controllers: [WishlistController],
  providers: [WishlistService, WishlistRepository],
  exports: [WishlistService, WishlistRepository],
})
export class WishlistModule {}
