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
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsDBService } from './productsDB.service';
import { ProductDto } from './dto/Product.dto';
import { AuthGuard } from '../auth/auth.guards';
import { Product } from './products.entity';
import { TransformCategoryInterceptor } from '../interceptors/transform-category.interceptor';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../auth/roles.enum';
import { RolesGuard } from '../auth/roles.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsDBService: ProductsDBService) {
    console.log('ProductsController instantiated');
  }

  @Get()
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
  async getProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    const allProducts: Product[] = await this.productsDBService.getProducts(
      page,
      limit,
    );
    return allProducts;
  }

  @Get(':id')
  async getProductById(@Param('id', new ParseUUIDPipe()) id: string) {
    const product = await this.productsDBService.getProductById(id);
    if (!product) {
      return {
        error: 'No se encontró el producto.',
      };
    }
    return product;
  }

  @Post()
  @HttpCode(201)
  @UseInterceptors(TransformCategoryInterceptor)
  async createProduct(@Body() productDto: ProductDto) {
    return this.productsDBService.createProduct(productDto);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() product: ProductDto,
  ) {
    return this.productsDBService.updateProduct(id, product);
  }

  // DELETE /orders/:id no está pedido en el enunciado del HW pero lo agregué para completar el CRUD
  // y poder dar de baja un producto
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async deleteProduct(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productsDBService.deleteProduct(id);
  }

  @Post('seeder')
  @HttpCode(201)
  async seedProducts() {
    return this.productsDBService.addProductsSeeder();
  }
}
