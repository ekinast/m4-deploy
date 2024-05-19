// Pourpose: Define the entity for the categories table
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../products.entity';

// Add the missing import statement

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  name: string;

  @OneToOne(() => Product)
  @JoinColumn()
  product: Product;
}
