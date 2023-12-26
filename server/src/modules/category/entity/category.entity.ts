import { Products } from 'src/modules/product/entity/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 'Active' })
  status: string;

  @Column()
  image: string;

  @OneToMany(() => Products, (product) => product.category, { cascade: true })
  product: Products[];
}
