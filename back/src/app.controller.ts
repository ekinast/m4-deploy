import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Server')
@Controller()
export class AppController {
  @Get()
  getRoot(): string {
    return 'El servidor del Módulo 4 está funcionando correctamente';
  }
}
