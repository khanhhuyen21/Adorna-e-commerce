import { Products } from 'src/modules/product/entity/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Images {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  imgSrc: string;

  @Column('productId')
  productId: number;

  @ManyToOne(() => Products, (product) => product.image)
  product: Products;
}
