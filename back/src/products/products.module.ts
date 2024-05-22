import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsDBService } from './productsDB.service';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsDBService, ProductsRepository],
})
export class ProductsModule {}
