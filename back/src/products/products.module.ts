import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsDBService } from './productsDB.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { CategoriesDBService } from 'src/categories/categoriesDB.service';
import { CategoriesModule } from 'src/categories/categories.module';
import { Category } from 'src/categories/categories.entity';
import { OrderDetail } from 'src/orders-detail/entities/orders-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, OrderDetail]),
    CategoriesModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsDBService, CategoriesDBService],
  exports: [TypeOrmModule, ProductsDBService],
})
export class ProductsModule {}
