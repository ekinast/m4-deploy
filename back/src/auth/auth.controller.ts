import {
  Controller,
  Get,
  Post,
  HttpCode,
  Body,
  HttpStatus,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guards';
import { LoginUserDto } from './dtos/LoginUser.dto';
import { UsersDBService } from '../users/usersDB.service';
import { CreateUserDTO } from '../users/dto/CreateUser.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authsService: AuthService,
    private readonly usersDBService: UsersDBService,
  ) {
    console.log('AuthController instantiated');
  }
  @Get()
  getAuth(): string {
    return this.authsService.getAuth();
  }

  @Post('signin')
  //@UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  signIn(@Body() loginUserDTO: LoginUserDto) {
    return this.authsService.signIn(loginUserDTO);
  }

  @Post('signup')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.authsService.saveUser(createUserDTO);
  }
}
