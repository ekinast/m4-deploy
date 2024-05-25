import { Product } from 'src/products/products.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
  ManyToMany,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

@Entity({
  name: 'orders_detail',
})
export class OrdersDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  price: number;

  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;

  @ManyToMany(() => Product, (product) => product.ordersDetail)
  product: Product[];

  @Column('int', { nullable: false })
  quantity: number;
}
