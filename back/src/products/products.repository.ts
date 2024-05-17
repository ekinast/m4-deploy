import { Injectable } from '@nestjs/common';
import { ProductDTO } from '../DTOs/ProductDTO';

@Injectable()
export class ProductsRepository {
  private products: ProductDTO[] = [
    {
      id: 1,
      name: 'vaso',
      description: 'Vaso de vidrio',
      price: 1000,
      stock: true,
      imgUrl:
        'https://cdn3.iconfinder.com/data/icons/education-209/64/education-10-512.png',
    },
    {
      id: 2,
      name: 'plato',
      description: 'Plato de vidrio',
      price: 500,
      stock: true,
      imgUrl:
        'https://cdn3.iconfinder.com/data/icons/education-209/64/education-10-512.png',
    },
    {
      id: 3,
      name: 'tenedor',
      description: 'Tenedor de acero inoxidable',
      price: 200,
      stock: true,
      imgUrl:
        'https://cdn3.iconfinder.com/data/icons/education-209/64/education-10-512.png',
    },
    {
      id: 4,
      name: 'cuchillo',
      description: 'Cuchillo de acero inoxidable',
      price: 300,
      stock: true,
      imgUrl:
        'https://cdn3.iconfinder.com/data/icons/education-209/64/education-10-512.png',
    },
  ];

  async findById(id: number) {
    return this.products.find((product) => product.id === id);
  }
  async getProducts() {
    return this.products;
  }

  private id = 4;

  createProduct(product: ProductDTO) {
    const newProduct: ProductDTO = { id: this.id, ...product };
    this.products.push(newProduct);
    newProduct.id = ++this.id;
    return newProduct.id;
  }

  updateProduct(id: number, product: ProductDTO) {
    const index = this.products.findIndex((product) => product.id === id);
    this.products[index] = product;
    return product.id;
  }

  deleteProduct(id: number) {
    const index = this.products.findIndex((product) => product.id === id);
    const product = this.products[index];
    this.products.splice(index, 1);
    return product.id;
  }
}
// Path: src/products/products.repository.ts
