import { Products } from '../../product/entity/product.entity';
import { Users } from '../../user/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('favorites')
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('productId')
  productId: number;

  @Column('userId')
  userId: number;

  @ManyToOne(() => Users, (user) => user.favorite)
  user: Users;

  @ManyToOne(() => Products, (product) => product.favorite)
  product: Products;
}
