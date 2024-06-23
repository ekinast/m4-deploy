import {
  Controller,
  Get,
  Post,
  HttpCode,
  Body,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign-in.dto';
import { UsersDBService } from '../users/usersDB.service';
import { CreateUserDTO } from '../users/dto/CreateUser.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authsService: AuthService,
    private readonly usersDBService: UsersDBService,
  ) {
    console.log('AuthController instantiated');
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  signIn(@Body() signInDto: SignInDto) {
    return this.authsService.signIn(signInDto);
  }

  @Post('signup')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.authsService.saveUser(createUserDTO);
  }
}
