import {
  Controller,
  Get,
  Post,
  HttpCode,
  Body,
  HttpStatus,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guards';

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
  signIn(@Body() request: { email: string; password: string }) {
    return this.authsService.signIn(request);
  }
}
