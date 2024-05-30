import { Product } from 'src/products/products.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

@Entity({
  name: 'orders_detail',
})
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    nullable: false,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  price: number;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  order: Order;

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'order_details_products', // El nombre de la tabla de unión
    joinColumn: {
      name: 'orderDetailId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'productId',
      referencedColumnName: 'id',
    },
  })
  products: Product[];
}
