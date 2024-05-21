import { Product } from 'src/products/products.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
  ManyToMany,
} from 'typeorm';
import { Order } from '../orders.entity';

@Entity({
  name: 'order_details',
})
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  price: number;

  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;

  @ManyToMany(() => Product, (product) => product.orderDetails)
  product: Product[];

  @Column('int', { nullable: false })
  quantity: number;
}
