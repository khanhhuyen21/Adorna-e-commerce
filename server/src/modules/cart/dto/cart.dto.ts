// cart.dto.ts
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddToCartDTO {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
