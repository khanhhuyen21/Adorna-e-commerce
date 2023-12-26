export class OrderInterface {
  id: number;
  userId: number;
  paymentId: number;
  addressId: number;
  codeOrder: string;
  status: number;
  shippingFee: number;
  totalAmount: number;
  orderDate: Date;
}
