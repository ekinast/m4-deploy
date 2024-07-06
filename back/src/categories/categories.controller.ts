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
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryResponseDTO } from './dto/CategoryResponse.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesDBService: CategoriesDBService) {
    console.log('CategoriesController instantiated');
  }
  @Get()
  @ApiOperation({ summary: 'Ver todas las categorías' })
  @ApiResponse({
    status: 200,
    description: 'The categories have been got successfully.',
    type: CategoryResponseDTO,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page',
    example: 5,
  })
  async getCategories(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    const allCategories: Category[] =
      await this.categoriesDBService.getCategories(page, limit);
    return allCategories;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ver una categoría por :id' })
  @ApiResponse({
    status: 200,
    description: 'The category has been got successfully.',
    type: CategoryResponseDTO,
  })
  async getCategoryById(@Param('id', ParseUUIDPipe) id: string) {
    const category = await this.categoriesDBService.getCategoryById(id);
    if (!category) {
      return {
        error: 'No se encontró la categoría.',
      };
    }
    return category;
  }

  @Post()
  @ApiOperation({ summary: 'Crear una categoría' })
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully created.',
    type: CategoryResponseDTO,
  })
  @HttpCode(201)
  async createCategory(@Body() createCategoryDto: CreateCategoryDTO) {
    return this.categoriesDBService.addCategory(createCategoryDto);
  }

  @Post('seeder')
  @ApiOperation({ summary: 'Carga inicial de categorías' })
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
  @ApiOperation({ summary: 'Cambiar una categoría' })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully updated.',
    type: CategoryResponseDTO,
  })
  @HttpCode(200)
  async updateCategory(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateCategoryDto: UpdateCategoryDTO,
  ) {
    return this.categoriesDBService.updateCategory(id, updateCategoryDto);
  }

  // @Delete(':id')
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Delete category' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The category has been successfully deleted.',
  //   type: CategoryResponseDTO,
  // })
  // @HttpCode(200)
  // async deleteCategory(@Param('id') id: string) {
  //   return this.categoriesDBService.deleteCategory(id);
  // }
}
