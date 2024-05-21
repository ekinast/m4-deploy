// Pourpose: Entity for products table
import { Product } from '../products/products.entity';
import { OrderDetails } from 'src/orders/details/orderDetails.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'categories',
})
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false })
  name: string;

  @OneToMany(() => Products)
  @JoinTable()
  products: Products[];
}
