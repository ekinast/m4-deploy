import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/users/dto/CreateUser.dto';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  getAuth(): string {
    return 'This action returns all auth';
  }

  async signIn(body: any) {
    const { email, password } = body;

    const newUser = await this.usersRepository.findOne({
      where: { email: body.email },
    });

    if (!newUser) {
      throw new BadRequestException('Email o password incorrectos');
      //throw new UnauthorizedException('Email o password incorrectos');
    }

    const isPasswordValid = await bcrypt.compare(password, newUser.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Email o password incorrectos');
    }

    const userPayload = {
      sub: newUser.id,
      id: newUser.id,
      email: newUser.email,
    };

    const token = this.jwtService.sign(userPayload);
    return { succes: 'User logged in successfully', token };
    //return { succes: 'User logged in successfully' };
  }

  async saveUser(createUserDTO: CreateUserDTO) {
    const newUser = await this.usersRepository.findOne({
      where: { email: createUserDTO.email },
    });
    if (newUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDTO.password, 10);
    if (!hashedPassword) {
      throw new BadRequestException('Password hashing failed');
    }
    console.log(hashedPassword);

    createUserDTO.password = hashedPassword;
    console.log(createUserDTO);

    return await this.usersRepository.save(createUserDTO);
  }
}
