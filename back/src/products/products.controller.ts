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
  getProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    return this.productsDBService.getProducts(page, limit);
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsDBService.getProductById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  createProduct(@Body() product: Product) {
    return this.productsDBService.createProduct(product);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  updateProduct(@Param('id') id: string, @Body() product: Product) {
    return this.productsDBService.updateProduct(id, product);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  deleteProduct(@Param('id') id: string) {
    return this.productsDBService.deleteProduct(id);
  }

  @Post('seeder')
  @UseGuards(AuthGuard)
  @HttpCode(201)
  createProductSeeder(@Body() product: Product) {
    return this.productsDBService.createProduct(product);
  }
}
