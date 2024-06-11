import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/users.entity';
import { SignInDto } from './dtos/sign-in.dto';
import { CreateUserDTO } from 'src/users/dto/CreateUser.dto';
import * as bcrypt from 'bcrypt';
import { Role } from './roles.enum';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  getAuth(): string {
    return 'This action returns all auth';
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const newUser = await this.usersRepository.findOne({
      where: { email: email },
    });

    if (!newUser) {
      //throw new BadRequestException('Email o password incorrectos');
      //throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      this.logger.error('UnauthorizedException: Email o password incorrectos');
      throw new BadRequestException('Email o password incorrectos');
    }

    const isPasswordValid = await bcrypt.compare(password, newUser.password);
    if (!isPasswordValid) {
      this.logger.error('UnauthorizedException: Email o password incorrectos');
      throw new BadRequestException('Email o password incorrectos');
    }

    const userPayload = {
      sub: newUser.id,
      id: newUser.id,
      email: newUser.email,
      roles: [newUser.isAdmin ? Role.Admin : Role.User],
    };

    const token = this.jwtService.sign(userPayload);
    return { succes: 'User logged in successfully', token };
    //return { succes: 'User logged in successfully' };
  }

  async saveUser(createUserDTO: Omit<CreateUserDTO, 'IsAdmin'>) {
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

    createUserDTO.password = hashedPassword;

    return await this.usersRepository.save(createUserDTO);
  }
}
