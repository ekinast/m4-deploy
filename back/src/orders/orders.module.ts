import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Product } from '../products/products.entity';
import { ProductsModule } from '../products/products.module';
import { CategoriesModule } from '../categories/categories.module';
import { ProductsDBService } from '../products/productsDB.service';
import { UsersDBService } from '../users/usersDB.service';
import { CategoriesDBService } from '../categories/categoriesDB.service';
import { UsersModule } from '../users/users.module';
import { OrdersDetailService } from '../orders-detail/orders-detail.service';
import { OrderDetail } from '../orders-detail/entities/orders-detail.entity';
import { Category } from '../categories/categories.entity';
import { User } from '../users/entities/users.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorsInterceptor } from '../interceptors/errorsInterceptor';
//import { ValidationErrorsInterceptor } from 'src/interceptors/validationsErrorInterceptor';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Product, OrderDetail, Category, User]),
    ProductsModule,
    CategoriesModule,
    UsersModule,
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    ProductsDBService,
    UsersDBService,
    CategoriesDBService,
    OrdersDetailService,
    {
      provide: APP_INTERCEPTOR,
      //useClass: ValidationErrorsInterceptor,
      useClass: ErrorsInterceptor,
    },
  ],
  exports: [TypeOrmModule, OrdersService],
})
export class OrdersModule {}
