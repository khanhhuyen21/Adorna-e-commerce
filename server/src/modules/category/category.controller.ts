import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../upload/upload.service';
import { CategoryInterface } from 'src/types/category.type';

@Controller('api/v1/categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly uploadService: UploadService,
  ) {}
  @Get('/')
  async getAllCategory() {
    return this.categoryService.getAllCategory();
  }
  @Get('/:id')
  getCategoryDetail(@Param() id) {
    return this.categoryService.getCategoryDetail(id);
  }

  @Post('/')
  @UseInterceptors(FileInterceptor('image'))
  async createCategory(
    @Body() body,
    @UploadedFile() image,
  ): Promise<CreateCategoryDTO> {
    if (!image) {
      throw new Error('Image is required');
    }
    const imageUrl = await this.uploadService.uploadFile(image);
    return this.categoryService.createCategory({ ...body, image: imageUrl });
  }
  @Put('/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateCategory(
    @Param('id') id: number,
    @Body() body: any,
    @UploadedFile() image,
  ) {
    let imageUrl;
    if (image) {
      imageUrl = await this.uploadService.uploadFile(image);
    } else {
      imageUrl = body.image; // Sử dụng URL cũ nếu không có hình ảnh mới
    }
    return this.categoryService.updateCategory(id, {
      ...body,
      image: imageUrl,
    });
  }
  @Delete('/:id')
  async deleteCategory(@Param('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
// import { Body, Controller, Post } from '@nestjs/common';
// import { CategoriesService } from './category.service';

// @Controller('api/v1/categories')
// export class CategoriesController {
//   constructor(private readonly appService: CategoriesService) {}

//   @Post()
//   createCategory(@Body() body) {
//     return this.appService.createCategory(body);
//   }
// }
