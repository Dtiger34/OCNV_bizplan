import { Injectable } from '@nestjs/common';
import { WishlistRepository } from './wishlist.repository';

@Injectable()
export class WishlistService {
  constructor(private readonly wishlistRepository: WishlistRepository) {}

  async getWishlist(userId: string): Promise<unknown> {
    return this.wishlistRepository.findByUser(userId);
  }

  async addProduct(userId: string, productId: string): Promise<unknown> {
    return this.wishlistRepository.addProduct(userId, productId);
  }

  async removeProduct(userId: string, productId: string): Promise<unknown> {
    return this.wishlistRepository.removeProduct(userId, productId);
  }
}
