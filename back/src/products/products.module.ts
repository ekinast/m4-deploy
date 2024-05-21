import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsDBService } from './productsDB.service';
import { ProductsRepository } from './products.repository';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductsDBService, ProductsRepository],
})
export class ProductsModule {}
