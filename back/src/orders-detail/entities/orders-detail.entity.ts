import { Product } from 'src/products/products.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToOne,
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

  @OneToOne(() => Order, (order) => order.orderDetails, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToMany(() => Product, (product) => product.orderDetails, {
    onDelete: 'CASCADE',
  })
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
