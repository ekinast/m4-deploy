import { Module } from '@nestjs/common';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersRepository } from './users/users.repository';
import { ProductsRepository } from './products/products.repository';
import { PurchaseOrderController } from './purchase-order/purchase-order.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [
    ProductsController,
    UsersController,
    AuthController,
    PurchaseOrderController,
  ],
  providers: [
    ProductsService,
    UsersService,
    AuthService,
    UsersRepository,
    ProductsRepository,
  ],
})
export class AppModule {}
