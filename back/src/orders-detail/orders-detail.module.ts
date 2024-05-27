import { Module } from '@nestjs/common';
import { OrdersDetailService } from './orders-detail.service';
import { OrdersDetailController } from './orders-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from 'src/orders/orders.service';
import { ProductsDBService } from 'src/products/productsDB.service';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/products.entity';
import { OrdersModule } from 'src/orders/orders.module';
import { ProductsModule } from 'src/products/products.module';
import { OrderDetail } from './entities/orders-detail.entity';
import { User } from 'src/users/users.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDetail, Order, Product, User]),
    ProductsModule,
    OrdersModule,
    UsersModule,
  ],
  controllers: [OrdersDetailController],
  providers: [OrdersDetailService, OrdersService, ProductsDBService],
  exports: [TypeOrmModule, OrdersDetailService],
})
export class OrdersDetailModule {}
