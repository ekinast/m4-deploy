// Pourpose: Este es el módulo para el manejo de usuarios
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersDBService } from './usersDB.service';
import { UsersController } from './users.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PasswordInterceptor } from '../interceptors/password/password.interceptor';
import { RoleInterceptor } from '../interceptors/role.interceptor';
import { User } from './entities/users.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderDetail } from '../orders-detail/entities/orders-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order, OrderDetail])],
  controllers: [UsersController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RoleInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: PasswordInterceptor,
    },
    UsersDBService,
  ],
  exports: [TypeOrmModule, UsersDBService],
})
export class UsersModule {}
