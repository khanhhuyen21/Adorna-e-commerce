import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';

@Controller('api/v1/images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('file', 2))
  async uploadImages(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp)' }),
        ],
      }),
    )
    file: Express.Multer.File[],
    @Body() body,
  ) {
    return await this.imageService.uploadFiles(file, body);
  }

  @Put('/:idImage')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp)' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('idImage') idImage,
  ) {
    return await this.imageService.uploadFile(file, idImage);
  }

  @Delete('/product/:idProduct')
  deleteImageProduct(@Param() idProduct) {
    return this.imageService.deleteImageProduct(idProduct);
  }
}
