import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
@Controller('api/v1/images')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload-single')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file): Promise<string> {
    return this.uploadService.uploadFile(file);
  }

  @Post('upload-multiple')
  @UseInterceptors(FilesInterceptor('files', 2))
  async uploadFiles(@UploadedFiles() files): Promise<string[]> {
    const uploadedFileUrls: string[] = await Promise.all(
      files.map(async (file: any) => await this.uploadService.uploadFile(file)),
    );
    return uploadedFileUrls;
  }
}
