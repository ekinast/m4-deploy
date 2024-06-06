import { CloudinaryConfig } from '../config/cloudinary';
import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ProductsDBService } from 'src/products/productsDB.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [FilesController],
  providers: [FilesService, CloudinaryConfig, ProductsDBService],
})
export class FilesModule {}
