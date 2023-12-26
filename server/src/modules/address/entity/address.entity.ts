import { Order } from '../../order/entity/order.entity';
import { Users } from '../../user/entity/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  province: string;

  @Column()
  district: string;

  @Column()
  ward: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  userId: number;

  @ManyToOne(() => Users, (user) => user.address)
  user: Users;

  @OneToMany(() => Order, (order) => order.address)
  order: Order[];
}
