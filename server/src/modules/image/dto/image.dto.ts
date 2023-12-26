import { CreateProductDTO } from 'src/modules/product/dto/product.dto';

export class ImagesUploadDTO {
  files: Array<Express.Multer.File>;
  productData: CreateProductDTO;
}
