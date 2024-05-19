import { User } from 'src/users/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity({
  name: 'order_details',
})
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => User, (user) => user.orders)
  users: User[];

  @OneToOne(() => OrderDetails)
  @JoinColumn()
  orderDetails: OrderDetails;
}
