import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { AuthGuard } from 'src/auth/auth.guards';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class UsersModule {}
