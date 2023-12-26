import { Users } from '../../user/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  productId: number;

  @Column('userId')
  userId: number;

  @Column()
  thumbnailUrl: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToOne(() => Users, (user) => user.cart)
  user: Users;
}
