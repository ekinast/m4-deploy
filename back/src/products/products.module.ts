import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsDBService } from './productsDB.service';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { CategoriesDBService } from 'src/categories/categoriesDB.service';
import { CategoriesModule } from 'src/categories/categories.module';
import { Category } from 'src/categories/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category]), CategoriesModule],
  controllers: [ProductsController],
  providers: [ProductsDBService, ProductsRepository, CategoriesDBService],
})
export class ProductsModule {}
