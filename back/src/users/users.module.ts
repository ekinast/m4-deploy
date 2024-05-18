// Pourpose: Este es el módulo para el manejo de usuarios
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { AuthGuard } from 'src/auth/auth.guards';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PasswordInterceptor } from 'src/interceptors/password/password.interceptor';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: PasswordInterceptor,
    },
    UsersService,
    UsersRepository,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class UsersModule {}
