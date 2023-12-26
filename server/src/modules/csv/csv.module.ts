import { Module } from '@nestjs/common';
import { CsvController } from './csv.controller';
import { CsvService } from './csv.service';
import { CsvRepository } from './csv.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { Products } from '../product/entity/product.entity';
import { Images } from '../image/entity/image.entity';
import { UploadMiddleware } from 'src/middlewares/upload.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products, Images]),
    MulterModule.registerAsync({
      useClass: UploadMiddleware,
    }),
  ],
  controllers: [CsvController],
  providers: [CsvService, CsvRepository],
})
export class CsvModule {}
