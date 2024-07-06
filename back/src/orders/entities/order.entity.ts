// Pourpose: Define the entity for the orders table
import { User } from '../../users/entities/users.entity';
import { OrderDetail } from '../../orders-detail/entities/orders-detail.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn()
  user: User;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  orderDetails: OrderDetail;
}
