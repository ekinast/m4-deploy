import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authsService: AuthService) {
    console.log('AuthController instantiated');
  }
  @Get()
  getAuth(): string {
    return this._authsService.getAuth();
  }
}
