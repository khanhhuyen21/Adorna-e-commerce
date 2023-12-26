import { Injectable } from '@nestjs/common';
import { CsvRepository } from './csv.repository';
import * as fs from 'fs';
@Injectable()
export class CsvService {
  constructor(private readonly csvRepository: CsvRepository) {}
  async parseCsv(file: Express.Multer.File): Promise<any[]> {
    const results = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(file.path)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          // Xóa file sau khi đã phân tích xong
          fs.unlinkSync(file.path);
          const result = await this.csvRepository.saveDataToDb(results);
          resolve(results);
        })
        .on('error', (error) => reject(error));
    });
  }
}
function csvParser(): any {
  throw new Error('Function not implemented.');
}
