import { Order } from '../../order/entity/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('orderitems')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  productName: string;

  @Column()
  price: number;

  @Column('text')
  thumnail: string;

  @Column()
  productId: number;

  @Column('orderId')
  orderId: number;

  @ManyToOne(() => Order, (order) => order.orderItem)
  order: Order;
}
