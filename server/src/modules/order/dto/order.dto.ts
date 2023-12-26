import { IsNotEmpty, IsIn } from 'class-validator';
import { IsNotNegative } from 'src/pipes/validator.pipe';

export class CreateOrderDTO {
  
  codeOrder: string;

  
  status: string;

  
  @IsNotNegative()
  totalAmount: number;

  
  shippingFee: number;

  
  userId: number;

  
  addressId: number;

  
  orderDate: Date;
}

export class UpdateOrderStatusDTO {
  
  @IsIn(['Pending', 'Processing', 'Shipping', 'Completed', 'Cancelled'])
  status: string;
}
