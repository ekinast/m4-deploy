// Pourpose: Define the entity for the orders table
import { User } from 'src/users/users.entity';
import { OrderDetails } from './details/orderDetails.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @OneToOne(() => OrderDetails)
  orderDetails: OrderDetails;
}
