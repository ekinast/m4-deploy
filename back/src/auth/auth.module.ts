import { UsersRepository } from './../users/users.repository';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository],
})
export class AuthsModule {}
