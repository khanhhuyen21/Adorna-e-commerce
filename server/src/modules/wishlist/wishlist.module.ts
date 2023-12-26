import { Module } from '@nestjs/common';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { WishlistRepository } from './wishlist.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../user/entity/user.entity';
import { Roles } from '../role/entity/role.entity';
import { Address } from '../address/entity/address.entity';
import { Products } from '../product/entity/product.entity';
import { Images } from '../image/entity/image.entity';
import { Category } from '../category/entity/category.entity';
import { Favorite } from './entity/wishlist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Favorite,
      Users,
      Roles,
      Address,
      Products,
      Images,
      Category,
    ]),
  ],
  controllers: [WishlistController],
  providers: [WishlistService, WishlistRepository],
})
export class WishlistModule {}
