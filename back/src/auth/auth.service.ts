import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  getAuth(): string {
    return 'This action returns all auth';
  }

  async signIn(body: any) {
    const { email, password } = body;

    const user = await this.usersRepository.findOne({
      where: { email: body.email },
    });

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Email o password incorrectos');
    }
    return user;
  }
}
