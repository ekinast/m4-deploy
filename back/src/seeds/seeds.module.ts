import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../categories/categories.entity';
import { Product } from '../products/products.entity';
import { CategoriesSeed } from './categories/categories.seed';
import { ProductsSeed } from './products/products.seed';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product])],
  providers: [CategoriesSeed, ProductsSeed],
  exports: [CategoriesSeed, ProductsSeed],
})
export class SeedsModule {}
