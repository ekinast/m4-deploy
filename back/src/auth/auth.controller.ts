import {
  Controller,
  Get,
  Post,
  HttpCode,
  Body,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guards';
import { LoginUserDto } from './dto/LoginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authsService: AuthService) {
    console.log('AuthController instantiated');
  }
  @Get()
  getAuth(): string {
    return this.authsService.getAuth();
  }

  @Post('signin')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  //signIn(@Body() request: { email: string; password: string }) {
  signIn(@Body() loginUserDTO: LoginUserDto) {
    return this.authsService.signIn(loginUserDTO);
  }
}
