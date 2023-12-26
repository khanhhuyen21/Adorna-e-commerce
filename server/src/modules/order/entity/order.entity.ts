import { Address } from '../../address/entity/address.entity';
import { OrderItem } from '../../orderItem/entity/orderItem.entity';
import { Users } from '../../user/entity/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codeOrder: string

  @Column({ default: 'Pending' })
  status: string;

  @Column()
  totalAmount: number;

  @Column()
  shippingFee: number;

  @Column('userId')
  userId: number;

  @Column('addressId')
  addressId: number;

  @Column()
  orderDate: Date;

  @ManyToOne(() => Users, (user) => user.order)
  user: Users;

  @ManyToOne(() => Address, (address) => address.order)
  address: Address;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItem: OrderItem[];
}
