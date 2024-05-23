import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsDBService } from './productsDB.service';
import { Product } from './products.entity';
import { AuthGuard } from 'src/auth/auth.guards';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsDBService: ProductsDBService) {
    console.log('ProductsController instantiated');
  }

  @Get()
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
  async getProductById(@Param('id') id: string) {
    const product = await this.productsDBService.getProductById(id);
    if (!product) {
      return {
        error: 'No se encontró el producto.',
      };
    }
    return product;
  }

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async createProduct(@Body() product: Product) {
    return this.productsDBService.createProduct(product);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async updateProduct(@Param('id') id: string, @Body() product: Product) {
    return this.productsDBService.updateProduct(id, product);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async deleteProduct(@Param('id') id: string) {
    return this.productsDBService.deleteProduct(id);
  }

  @Post('seeder')
  @HttpCode(201)
  async seedProducts() {
    return this.productsDBService.addProductsSeeder();
  }
}
