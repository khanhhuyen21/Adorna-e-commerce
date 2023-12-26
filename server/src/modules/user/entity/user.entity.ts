import { Exclude, Transform } from 'class-transformer';
import { Address } from '../../address/entity/address.entity';
import { Cart } from '../../cart/entity/cart.entity';
import { Favorite } from '../../wishlist/entity/wishlist.entity';
import { Order } from '../../order/entity/order.entity';
import { Roles } from '../../role/entity/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform((fullName) => fullName.value.toLowerCase())
  @Column()
  fullName: string;

  @Exclude()
  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column('roleId')
  roleId: number;

  @Column({ default: 1 })
  rank: number;

  @Column({ default: 1 })
  status: number;

  @Column({
    default:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9pJuMs1SGChD3XMiqOZbXJRs0MTO1KsK-wuBjAifojg&s',
  })
  avatar: string;

  @ManyToOne(() => Roles, (role) => role.user)
  role: Roles;

  @OneToMany(() => Favorite, (favorite) => favorite.user, { cascade: true })
  favorite: Favorite[];

  @OneToMany(() => Address, (address) => address.user, { cascade: true })
  address: Address[];

  @OneToMany(() => Order, (order) => order.user)
  order: Order[];

  @OneToMany(() => Cart, (cart) => cart.user, { cascade: true })
  cart: Cart[];
}
