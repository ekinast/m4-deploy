import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot(): string {
    return 'El servidor del Módulo 4 está funcionando correctamente';
  }
}
