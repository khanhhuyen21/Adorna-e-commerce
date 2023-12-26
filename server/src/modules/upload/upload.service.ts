import { Injectable } from '@nestjs/common';
import { UploadApiResponse } from 'cloudinary';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadService {
  async uploadFile(file: any, nameFolder?: string): Promise<string> {
    try {
      const result: UploadApiResponse = await cloudinary.uploader.upload(
        file.path,
        {
          folder: nameFolder ?? 'project4', // Tùy chọn thư mục lưu trữ trên Cloudinary
        },
      );
      return result.url;
    } catch (error) {
      throw new Error('Upload failed');
    }
  }
}
