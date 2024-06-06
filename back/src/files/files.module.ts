import { CloudinaryConfig } from '../config/cloudinary';
import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';

@Module({
  controllers: [FilesController],
  providers: [FilesService, CloudinaryConfig],
})
export class FilesModule {}
