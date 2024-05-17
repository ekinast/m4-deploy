import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDTO } from 'src/DTOs/ProductDTO';
import { AuthGuard } from 'src/auth/auth.guards';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {
    console.log('ProductsController instantiated');
  }
  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(Number(id));
  }

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  createProduct(@Body() product: ProductDTO) {
    return this.productsService.createProduct(product);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  updateProduct(@Param('id') id: string, @Body() product: ProductDTO) {
    return this.productsService.updateProduct(Number(id), product);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(Number(id));
  }
}
