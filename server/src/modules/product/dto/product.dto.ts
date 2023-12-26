import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { IsNotNegative } from 'src/pipes/validator.pipe';

export class CreateProductDTO {
  @MaxLength(50, { message: 'Name is too long' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotNegative()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @IsNotNegative()
  stock: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}

// export class UpdateProductDTO {
//   @IsEmpty()
//   email: string;
//   @IsNotEmpty()
//   fullName: string;
//   @MinLength(8, {
//     message: 'Password must be greater than 8 characters',
//   })
//   @IsNotEmpty()
//   password: string;
//   @IsNotEmpty()
//   status: number;
//   @IsNotEmpty()
//   roleId: number;
//   @IsUrl()
//   avatar: string;
// }
