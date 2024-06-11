// Pourpose: Este es el módulo para el manejo de usuarios
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PasswordInterceptor } from 'src/interceptors/password/password.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { UsersDBService } from './usersDB.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: PasswordInterceptor,
    },
    UsersDBService,
  ],
  exports: [TypeOrmModule, UsersDBService],
})
export class UsersModule {}
