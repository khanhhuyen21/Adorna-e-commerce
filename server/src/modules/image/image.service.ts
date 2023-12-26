import { Injectable } from '@nestjs/common';
import { ImageRepository } from './image.repository';
import { ProductRepository } from '../product/product.repository';

@Injectable()
export class ImageService {
  constructor(
    private readonly imageRepository: ImageRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async uploadFiles(file, body) {
    console.log(3333, file, body);

    const result = await this.imageRepository.uploadFiles(file, body);
    return result;
  }

  async uploadFile(file, idImage) {
    const image = await this.imageRepository.getImage(idImage);
    if (!image) {
      return { msg: 'Image not found' };
    }
    return await this.imageRepository.uploadFile(file, idImage);
  }

  async deleteImageProduct(idProduct) {
    const product = await this.productRepository.findProduct(idProduct);
    if (!product) {
      return { msg: 'Product not found' };
    }
    return this.imageRepository.deleteImageProduct(idProduct);
  }
}
