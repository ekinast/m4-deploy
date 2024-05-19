// Pourpase: Entity for the user table
import { Order } from 'src/orders/orders.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ length: 50, nullable: false })
  email: string;

  @Column({ length: 20, nullable: false })
  password: string;

  @Column()
  phone: number;

  @Column({ length: 50 })
  country: string;

  @Column()
  address: string;

  @Column({ length: 50 })
  city: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
