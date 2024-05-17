import { Controller, Get, Post, HttpCode, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  //usersService: any;
  //authService: any;
  constructor(private readonly authsService: AuthService) {
    console.log('AuthController instantiated');
  }
  @Get()
  getAuth(): string {
    return this.authsService.getAuth();
  }

  @Post('signin')
  @HttpCode(200)
  signIn(@Body() request: { email: string; password: string }) {
    return this.authsService.signIn(request);
  }
}
