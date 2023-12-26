import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { ImageRepository } from './image.repository';
import { cloudinaryConfig } from 'src/configs/cloudinary.config';
import { ProductRepository } from '../product/product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../product/entity/product.entity';
import { Category } from '../category/entity/category.entity';
import { Images } from './entity/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Images, Products, Category])],
  controllers: [ImageController],
  providers: [ImageService, ImageRepository, ProductRepository],
})
export class ImageModule {
  constructor() {
    cloudinaryConfig();
  }
}
