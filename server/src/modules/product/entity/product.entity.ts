import { Category } from '../../category/entity/category.entity';
import { Favorite } from '../../wishlist/entity/wishlist.entity';
import { Images } from '../../image/entity/image.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('products')
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'int', unsigned: true })
  stock: number;

  @Column({ type: 'int', unsigned: true })
  price: number;

  @Column('text')
  description: string;

  @Column('categoryId')
  categoryId: number;

  @Column({ default: false })
  isDelete: boolean;

  @Column({ default: 0 })
  bestseller: number;

  @ManyToOne(() => Category, (category) => category.product)
  category: Category;

  @OneToMany(() => Favorite, (favorite) => favorite.product, { cascade: true })
  favorite: Favorite[];

  @OneToMany(() => Images, (image) => image.product, { cascade: true })
  image: Images[];
}
