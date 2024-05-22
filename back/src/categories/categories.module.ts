// Pourpose: Este es el módulo para el manejo de usuarios
import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesDBService } from './categoriesDB.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesDBService],
  exports: [TypeOrmModule, CategoriesDBService],
})
export class CategoriesModule {}
