import { CloudinaryConfig } from '../config/cloudinary';
import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ProductsDBService } from '../products/productsDB.service';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [FilesController],
  providers: [FilesService, CloudinaryConfig, ProductsDBService],
})
export class FilesModule {}
