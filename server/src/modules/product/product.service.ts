import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Products } from './entity/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepository) {}

  async createProduct(body) {
    const price = body.price;
    const product = await this.productRepo.createProduct(body);
    return { product: product, status: 200 };
  }

  async deleteProduct(id) {
    const product = await this.productRepo.findProduct(id);
    if (!product) {
      return { msg: 'Product not found' };
    }
    return await this.productRepo.deleteProduct(id);
  }

  async getProducts(page) {
    if (page.page) {
      let pagee = parseInt(page.page);
      const pageSize = 12;
      const totalProduct = await this.productRepo.totalProduct();
      const totalPage = Math.ceil(totalProduct / pageSize);
      const skip = (pagee - 1) * pageSize;
      if (pagee < 0) {
        pagee = 1;
      }
      return await this.productRepo.getProductWithLimit(
        skip,
        pageSize,
        totalPage,
      );
    }

    return await this.productRepo.getProducts();
  }

  async updateProduct(id, body) {
    const product = await this.productRepo.findProduct(id);
    if (!product) {
      return { msg: 'Product not found' };
    }
    return this.productRepo.updateProduct(id, body);
  }

  async getProductDetail(id) {
    return this.productRepo.getProductDetail(id);
  }

  async findProductByCategory(id: number): Promise<Products[]> {
    return await this.productRepo.findProductByCategory(id);
  }

  async getBestsellerl() {
    return this.productRepo.getBestseller();
  }

  async getProductsToExport() {
    return this.productRepo.getProductsToExport();
  }

  async getNewArrival() {
    return this.productRepo.getNewArrival();
  }
}
