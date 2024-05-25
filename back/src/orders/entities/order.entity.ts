// Pourpose: Define the entity for the orders table
import { User } from 'src/users/users.entity';
import { OrdersDetail } from '../../orders-detail/entities/orders-detail.entity';
import { Product } from 'src/products/products.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => OrdersDetail)
  ordersDetail: OrdersDetail;
}
