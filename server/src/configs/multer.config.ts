import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

// Hàm kiểm tra xem tệp có phải là một định dạng hình ảnh hay không
const imageFileFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
    return callback(new Error('Chỉ chấp nhận các định dạng file ảnh!'), false);
  }
  callback(null, true);
};
export const multerConfig = async (): Promise<MulterOptions> => {
  return {
    storage: diskStorage({}),
    limits: {
      files: 10,
    },
    fileFilter: imageFileFilter,
  };
};
