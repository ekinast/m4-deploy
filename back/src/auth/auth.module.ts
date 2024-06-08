import { UsersDBService } from 'src/users/usersDB.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthErrorsInterceptor } from 'src/interceptors/authErrorsInterceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersDBService,
    {
      provide: APP_INTERCEPTOR,
      //useClass: ValidationErrorsInterceptor,
      useClass: AuthErrorsInterceptor,
    },
  ],
})
export class AuthsModule {}
