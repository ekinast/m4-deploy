// Pourpose: Este es el controlador para el manejo de categorías
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CategoriesDBService } from './categoriesDB.service';
import { CreateCategoryDTO } from './dto/CreateCategory.dto';
import { UpdateCategoryDTO } from './dto/UpdateCategory.dto';
import { Category } from './categories.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesDBService: CategoriesDBService) {
    console.log('CategoriesController instantiated');
  }
  @Get()
  async getCategories(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    const allCategories: Category[] =
      await this.categoriesDBService.getCategories(page, limit);
    return allCategories;
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string) {
    const category = await this.categoriesDBService.getCategoryById(id);
    if (!category) {
      return {
        error: 'No se encontró la categoría.',
      };
    }
    return category;
  }

  @Post()
  @HttpCode(201)
  async createCategory(@Body() createCategoryDto: CreateCategoryDTO) {
    return this.categoriesDBService.addCategory(createCategoryDto);
  }

  @Post('seeder')
  @HttpCode(201)
  async seedCategories() {
    const categories = [
      { name: 'smartphone' },
      { name: 'monitor' },
      { name: 'keyboard' },
      { name: 'mouse' },
    ].map((data) => {
      const category = new Category();
      category.name = data.name;
      category.products = [];
      return category;
    });

    return this.categoriesDBService.createCategorySeeds(categories);
  }

  @Put(':id')
  @HttpCode(200)
  async updateCategory(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateCategoryDto: UpdateCategoryDTO,
  ) {
    return this.categoriesDBService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteCategory(@Param('id') id: string) {
    return this.categoriesDBService.deleteCategory(id);
  }
}
