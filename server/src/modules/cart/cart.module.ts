import { Module } from '@nestjs/common';
import { CartsController } from './cart.controller';
import { CartsService } from './cart.service';
import { CartsRepository } from './cart.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../user/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { Products } from '../product/entity/product.entity';
import { Cart } from './entity/cart.entity';
import { Roles } from '../role/entity/role.entity';
import { UserRepository } from '../user/user.repository';
import { ProductRepository } from '../product/product.repository';
import { Address } from '../address/entity/address.entity';
import { RolesGuard } from 'src/guards/role.guard';
import { VerifyEmail } from '../verify-email/entity/verifyEmail.entity';
import { ResetEmail } from '../reset-password/entity/resetPassword.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      Products,
      Cart,
      Roles,
      Address,
      VerifyEmail,
      ResetEmail,
    ]),
    JwtModule,
  ],
  controllers: [CartsController],
  providers: [
    CartsService,
    CartsRepository,
    UserRepository,
    ProductRepository,
    RolesGuard,
  ],
})
export class CartModule {}
