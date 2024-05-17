import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getAuth(): string {
    return 'This action returns all auth';
  }

  signIn(body: any) {
    return this.usersRepository.signIn(body);
  }
}
