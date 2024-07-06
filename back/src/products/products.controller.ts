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
  //UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsDBService } from './productsDB.service';
import { ProductDto } from './dto/Product.dto';
import { AuthGuard } from '../auth/auth.guards';
import { Product } from './products.entity';
//import { TransformCategoryInterceptor } from '../interceptors/transform-category.interceptor';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../auth/roles.enum';
import { RolesGuard } from '../auth/roles.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductResponseDto } from './dto/ProductResponse.dto';
import { IsEmpty } from 'class-validator';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsDBService: ProductsDBService) {
    console.log('ProductsController instantiated');
  }

  @Get()
  @ApiOperation({ summary: 'Ver todos los productos' })
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
  @ApiOperation({ summary: 'Ver un producto por :id' })
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
  @ApiOperation({ summary: 'Crear un producto' })
  @HttpCode(201)
  //@UseInterceptors(TransformCategoryInterceptor)
  async createProduct(@Body() productDto: ProductDto) {
    console.log(productDto);

    return this.productsDBService.createProduct(productDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un producto por :id' })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  @IsEmpty()
  @ApiResponse({
    status: 200,
    description: 'Detalles del producto',
    type: ProductResponseDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() product: ProductResponseDto,
  ) {
    return this.productsDBService.updateProduct(id, product);
  }

  // DELETE /orders/:id no está pedido en el enunciado del HW pero lo agregué para completar el CRUD
  // y poder dar de baja un producto
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto por :id' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async deleteProduct(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productsDBService.deleteProduct(id);
  }

  @Post('seeder')
  @ApiOperation({ summary: 'Carga inicial de productos' })
  @HttpCode(201)
  async seedProducts() {
    return this.productsDBService.addProductsSeeder();
  }
}
