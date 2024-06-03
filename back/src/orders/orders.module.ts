import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Product } from 'src/products/products.entity';
import { ProductsModule } from 'src/products/products.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { ProductsDBService } from 'src/products/productsDB.service';
import { UsersDBService } from 'src/users/usersDB.service';
import { CategoriesDBService } from 'src/categories/categoriesDB.service';
import { UsersModule } from 'src/users/users.module';
import { OrdersDetailService } from 'src/orders-detail/orders-detail.service';
import { OrderDetail } from 'src/orders-detail/entities/orders-detail.entity';
import { Category } from 'src/categories/categories.entity';
import { User } from 'src/users/entities/users.entity';
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
