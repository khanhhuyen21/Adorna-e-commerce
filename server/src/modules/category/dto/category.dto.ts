import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDTO {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  image: string;
  @IsNotEmpty()
  status: string;
}

export class CategoryStatusDto {
  @IsNotEmpty()
  status: string;
}
