import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from 'src/configs/multer.config';
import { UploadService } from '../upload/upload.service';
import { cloudinaryConfig } from 'src/configs/cloudinary.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    JwtModule,
    MulterModule.registerAsync({
      useFactory: multerConfig,
    }),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, UploadService],
})
export class CategoryModule {
  constructor() {
    cloudinaryConfig();
  }
}
