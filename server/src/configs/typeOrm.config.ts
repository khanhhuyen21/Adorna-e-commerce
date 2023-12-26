import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { Address } from 'src/modules/address/entity/address.entity';
import { Cart } from 'src/modules/cart/entity/cart.entity';
import { Category } from 'src/modules/category/entity/category.entity';
import { Images } from 'src/modules/image/entity/image.entity';
import { Order } from 'src/modules/order/entity/order.entity';
import { OrderItem } from 'src/modules/orderItem/entity/orderItem.entity';
import { Products } from 'src/modules/product/entity/product.entity';
import { ResetEmail } from 'src/modules/reset-password/entity/resetPassword.entity';
import { Roles } from 'src/modules/role/entity/role.entity';
import { Users } from 'src/modules/user/entity/user.entity';
import { VerifyEmail } from 'src/modules/verify-email/entity/verifyEmail.entity';
import { Favorite } from 'src/modules/wishlist/entity/wishlist.entity';

config();

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    Roles,
    Users,
    Address,
    Category,
    Products,
    Images,
    Cart,
    Order,
    OrderItem,
    Favorite,
    VerifyEmail,
    ResetEmail,
  ],
  synchronize: false,
};

export default typeOrmConfig;
