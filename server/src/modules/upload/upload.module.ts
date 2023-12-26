import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from 'src/configs/multer.config';
import { cloudinaryConfig } from 'src/configs/cloudinary.config';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: multerConfig,
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {
  constructor() {
    cloudinaryConfig();
  }
}
