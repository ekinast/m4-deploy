// Pourpose: Entity for products table
import { Category } from '../categories/categories.entity';
import { OrderDetails } from 'src/orders/details/orderDetails.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ nullable: false })
  stock: number;

  @Column({ nullable: true, default: 'default_image_url' })
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToMany(() => OrderDetails)
  @JoinTable()
  orderDetails: OrderDetails[];
}
