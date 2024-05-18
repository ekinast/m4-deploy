import { Module } from '@nestjs/common';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersRepository } from './users/users.repository';
import { ProductsRepository } from './products/products.repository';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PurchaseOrderController } from './purchase-order/purchase-order.controller';

@Module({
  imports: [],
  controllers: [
    ProductsController,
    UsersController,
    AuthController,
    PurchaseOrderController,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
    ProductsService,
    UsersService,
    AuthService,
    UsersRepository,
    ProductsRepository,
  ],
})
export class AppModule {}
