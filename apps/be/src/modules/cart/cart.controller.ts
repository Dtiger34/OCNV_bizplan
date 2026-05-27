import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { MergeCartDto } from './dto/merge-cart.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('cart')
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Get current user cart' })
  async getCart(@CurrentUser() user: { userId: string }) {
    return this.cartService.getCart(user.userId);
  }

  @Post('items')
  @ApiOperation({ summary: 'Add item to cart' })
  async addItem(@CurrentUser() user: { userId: string }, @Body() dto: AddCartItemDto) {
    return this.cartService.addItem(user.userId, dto);
  }

  @Patch('items/:productId')
  @ApiOperation({ summary: 'Update item quantity' })
  async updateItem(
    @CurrentUser() user: { userId: string },
    @Param('productId') productId: string,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(user.userId, productId, dto);
  }

  @Delete('items/:productId')
  @ApiOperation({ summary: 'Remove item from cart' })
  async removeItem(
    @CurrentUser() user: { userId: string },
    @Param('productId') productId: string,
  ) {
    return this.cartService.removeItem(user.userId, productId);
  }

  @Delete()
  @ApiOperation({ summary: 'Clear cart' })
  async clearCart(@CurrentUser() user: { userId: string }) {
    return this.cartService.clearCart(user.userId);
  }

  @Post('merge')
  @ApiOperation({ summary: 'Merge guest cart into user cart' })
  async mergeCart(@CurrentUser() user: { userId: string }, @Body() dto: MergeCartDto) {
    return this.cartService.mergeCart(user.userId, dto);
  }
}
