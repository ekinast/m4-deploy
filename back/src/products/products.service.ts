import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductDTO } from 'src/DTOs/ProductDTO';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}
  getProducts() {
    return this.productsRepository.getProducts();
  }

  getProductById(id: number) {
    return this.productsRepository.findById(id);
  }

  createProduct(product: ProductDTO) {
    return this.productsRepository.createProduct(product);
  }

  updateProduct(id: number, product: ProductDTO) {
    return this.productsRepository.updateProduct(id, product);
  }

  deleteProduct(id: number) {
    return this.productsRepository.deleteProduct(id);
  }
}
