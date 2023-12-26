import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from './dto/category.dto';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async getAllCategory() {
    return await this.categoryRepository.find();
  }
  async getCategoryDetail(id) {
    return await this.categoryRepository.find({
      where: { id: id.id },
      relations: ['product'],
    });
  }
  async createCategory(body: CreateCategoryDTO) {
    const newCat = this.categoryRepository.create(body);
    await this.categoryRepository.save(newCat);
    return newCat;
  }
  async updateCategory(
    id: number,
    body: CreateCategoryDTO,
  ): Promise<CreateCategoryDTO> {
    await this.categoryRepository.update(id, body);
    return body;
  }
  async findId(idCat) {
    const id = await this.categoryRepository.findOne({ where: { id: idCat } });
    return id;
  }
  async deleteCategory(id: number) {
    return await this.categoryRepository.delete(id);
  }
}

// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Category } from './entity/category.entity';

// Injectable();
// export class CategoryRepository {
//   constructor(
//     @InjectRepository(Category)
//     private categoryRepository: Repository<Category>,
//   ) {}

//   async createCategory(body) {
//     return this.categoryRepository.save(body);
//   }
// }
