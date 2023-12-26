import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/product.dto';

@Controller('api/v1/products')
export class ProductController {
  constructor(private readonly appService: ProductService) {}

  @Post()
  createProduct(@Body() body: CreateProductDTO) {
    console.log(111111, body);

    return this.appService.createProduct(body);
  }

  @Delete('/:id')
  deleteProduct(@Param() id) {
    return this.appService.deleteProduct(id);
  }

  @Get()
  async getProducts(@Query() page) {
    return await this.appService.getProducts(page);
  }

  @Get('/products/export')
  async getProductsToExport() {
    return await this.appService.getProductsToExport();
  }

  @Put('/update/:id')
  updateProduct(@Param() id, @Body() body) {
    return this.appService.updateProduct(id, body);
  }

  @Get('/:id')
  getProductDetail(@Param() param) {
    return this.appService.getProductDetail(param.id);
  }

  @Get('/category/:id')
  getProductByCategory(@Param('id') id: number) {
    return this.appService.findProductByCategory(id);
  }

  @Get('/bestseller/productbestseller')
  getBestsellerl() {
    const result = this.appService.getBestsellerl();
    return result;
  }

  @Get('/products/newarrival/newarrivallist/')
  getNewArrival() {
    const result = this.appService.getNewArrival();
    return result;
  }
}
