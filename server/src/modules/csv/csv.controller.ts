import {
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CsvService } from './csv.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/v1/csv')
export class CsvController {
  constructor(private readonly csvService: CsvService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(csv)' })],
      }),
    )
    file,
  ) {
    const data = await this.csvService.parseCsv(file);
    // Handle data as needed
    return { message: 'File uploaded and processed successfully', data };
  }
}
