import { Module } from '@nestjs/common';
import { OrdersController } from './order.controller';
import { OrdersService } from './order.service';
import { OrdersRepository } from './order.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Order } from './entity/order.entity';
import { OrderItem } from '../orderItem/entity/orderItem.entity';
import { Products } from '../product/entity/product.entity';
import { Address } from '../address/entity/address.entity';
import { Cart } from '../cart/entity/cart.entity';
import { Users } from '../user/entity/user.entity';
import { Roles } from '../role/entity/role.entity';
import { UserRepository } from '../user/user.repository';
import { ProductRepository } from '../product/product.repository';
import { Images } from '../image/entity/image.entity';
import { MailService } from '../mail/mail.service';
import { VerifyEmail } from '../verify-email/entity/verifyEmail.entity';
import { ResetEmail } from '../reset-password/entity/resetPassword.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Roles,
      Users,
      Address,
      Products,
      Cart,
      Order,
      OrderItem,
      Images,
      VerifyEmail,
      ResetEmail,
    ]),
    JwtModule,
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersRepository,
    UserRepository,
    ProductRepository,
    MailService,
  ],
})
export class OrderModule {}
