import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDTO } from './dto/category.dto';
import { Category } from './entity/category.entity';
import { UploadService } from '../upload/upload.service';
import { CategoryInterface } from 'src/types/category.type';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async getAllCategory() {
    return this.categoryRepository.getAllCategory();
  }
  async getCategoryDetail(id) {
    return this.categoryRepository.getCategoryDetail(id);
  }
  async createCategory(body): Promise<CreateCategoryDTO> {
    const newCat = await this.categoryRepository.createCategory(body);
    return newCat;
  }
  async updateCategory(
    id: number,
    body: CreateCategoryDTO,
  ): Promise<CreateCategoryDTO> {
    const updatedCategory = await this.categoryRepository.updateCategory(
      id,
      body,
    );
    return updatedCategory;
  }
  async deleteCategory(id: number) {
    const checkCat = await this.categoryRepository.getCategoryDetail(id);
    if (checkCat) {
      await this.categoryRepository.deleteCategory(id);
      return new HttpException('Category deleted', HttpStatus.OK);
    }
  }
}

// import { Injectable } from '@nestjs/common';
// import { CategoryRepository } from './category.repository';

// @Injectable()
// export class CategoriesService {
//   constructor(private readonly categoriRepo: CategoryRepository) {}

//   async createCategory(body) {
//     return await this.categoriRepo.createCategory(body);
//   }
// }
