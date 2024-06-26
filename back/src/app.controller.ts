import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@Controller()
export class AppController {
  @Get()
  getRoot(): string {
    return 'This is a response to GET /';
  }

  @Get('favicon.ico')
  getFavicon(@Res() res: Response): void {
    const faviconPath = path.join(__dirname, '..', 'public', 'favicon.png');
    if (fs.existsSync(faviconPath)) {
      res.sendFile(faviconPath);
    } else {
      res.status(404).send('Favicon not found');
    }
  }
}
