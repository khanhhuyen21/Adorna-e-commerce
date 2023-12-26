import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { ProductRepository } from '../product/product.repository';
import { WishlistRepository } from './wishlist.repository';

@Injectable()
export class WishlistService {
  constructor(
    private readonly favoriteRepo: WishlistRepository,
    private readonly userRepo: UserRepository,
    private readonly productRepo: ProductRepository,
  ) {}

  async getFavoriteByUserId(userId) {
    const user = await this.userRepo.getUserWithId(userId.userId);
    if (!user) {
      return { msg: 'user not found', success: false };
    }
    const result = await this.favoriteRepo.getFavoriteByUserId(userId);
    return result;
  }

  async createFavorite(userId, productId) {
    const user = await this.userRepo.getUserWithId(userId.userId);
    if (!user) {
      return { msg: 'user not found', success: false };
    }
    const productFavorite = await this.favoriteRepo.findProductInFavorite(
      userId,
      productId,
    );

    if (productFavorite) {
      return { msg: 'Product is Exist', success: false };
    }
    return await this.favoriteRepo.createFavorite(userId, productId);
  }

  async deleteFavorite(body) {
    const productFavorite = await this.favoriteRepo.findProduct(body);
    if (!productFavorite) {
      return { msg: 'Product is not Exist', success: false };
    } else {
      return await this.favoriteRepo.deleteFavorite(body);
    }
  }
}
