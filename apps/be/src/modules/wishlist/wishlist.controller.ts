import { Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WishlistService } from './wishlist.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('wishlist')
@ApiBearerAuth()
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  @ApiOperation({ summary: 'Get user wishlist' })
  async getWishlist(@CurrentUser() user: { userId: string }) {
    return this.wishlistService.getWishlist(user.userId);
  }

  @Post(':productId')
  @ApiOperation({ summary: 'Add product to wishlist' })
  async addProduct(
    @CurrentUser() user: { userId: string },
    @Param('productId') productId: string,
  ) {
    return this.wishlistService.addProduct(user.userId, productId);
  }

  @Delete(':productId')
  @ApiOperation({ summary: 'Remove product from wishlist' })
  async removeProduct(
    @CurrentUser() user: { userId: string },
    @Param('productId') productId: string,
  ) {
    return this.wishlistService.removeProduct(user.userId, productId);
  }
}
