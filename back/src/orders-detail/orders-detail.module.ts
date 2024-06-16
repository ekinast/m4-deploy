import { Module } from '@nestjs/common';
import { OrdersDetailService } from './orders-detail.service';
import { OrdersDetailController } from './orders-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from '../orders/orders.service';
import { ProductsDBService } from '../products/productsDB.service';
import { Order } from '../orders/entities/order.entity';
import { Product } from '../products/products.entity';
import { OrdersModule } from '../orders/orders.module';
import { ProductsModule } from '../products/products.module';
import { OrderDetail } from './entities/orders-detail.entity';
import { User } from '../users/entities/users.entity';
import { UsersModule } from '../users/users.module';

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
