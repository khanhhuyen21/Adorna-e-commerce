import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { UploadService } from '../upload/upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from 'src/configs/multer.config';
import { cloudinaryConfig } from 'src/configs/cloudinary.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Products } from './entity/product.entity';
import { Images } from '../image/entity/image.entity';
import { Category } from '../category/entity/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products, Images, Category]),
    JwtModule,
    MulterModule.registerAsync({
      useFactory: multerConfig,
    }),
  ],
  providers: [ProductService, ProductRepository, UploadService],
  controllers: [ProductController],
})
export class ProductModule {
  constructor() {
    cloudinaryConfig();
  }
}
