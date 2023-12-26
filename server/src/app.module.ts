import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { UsersController } from './modules/user/user.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UploadModule } from './modules/upload/upload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './configs/typeOrm.config';
import { RoleModule } from './modules/role/role.module';
import { JwtModule } from '@nestjs/jwt';
import { CategoryModule } from './modules/category/category.module';
import { config } from 'dotenv';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { ImageModule } from './modules/image/image.module';
import { CsvModule } from './modules/csv/csv.module';
import { MulterModule } from '@nestjs/platform-express';
import { UploadMiddleware } from './middlewares/upload.middleware';
import { MailModule } from './modules/mail/mail.module';
import { ConfigModule } from '@nestjs/config';

config();
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    RoleModule,
    ProductModule,
    AuthModule,
    ImageModule,
    UploadModule,
    CategoryModule,
    CartModule,
    OrderModule,
    MailModule,
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_TOKEN,
      // signOptions: { expiresIn: '60s' },
    }),
    MulterModule.registerAsync({
      useClass: UploadMiddleware,
    }),
    CsvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UsersController);
  }
}
