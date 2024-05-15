import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly _productsService: ProductsService) {
    console.log('ProductsController instantiated');
  }
  @Get()
  getProducts() {
    return this._productsService.getProducts();
  }
}
