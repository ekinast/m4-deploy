import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/categories.entity';
import { data } from '../archivo/archivo.js';

@Injectable()
export class ProductsDBService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getProducts(page: number, limit: number): Promise<Product[]> {
    const skippedItems = (page - 1) * limit;
    return this.productsRepository.find({
      skip: skippedItems,
      take: limit,
    });
  }

  async getProductById(id: string) {
    return this.productsRepository.findOneBy({ id: id });
  }

  async createProduct(product) {
    const category = await this.validateProduct(product);
    if (!category) return 'Validation failed';

    product.category = category;
    return this.productsRepository.save(product);
  }

  async updateProduct(id: string, updatedProductData: Partial<Product>) {
    const oldProduct = await this.productsRepository.findOneBy({ id: id });

    if (!oldProduct) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    // Merge de datos: copiar las propiedades actualizadas al usuario existente
    Object.assign(oldProduct, updatedProductData);

    const updatedProduct = await this.productsRepository.save(oldProduct);

    return updatedProduct;
  }

  async deleteProduct(id: string) {
    const oldProduct = await this.productsRepository.findOneBy({ id: id });

    if (!oldProduct) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    const id_product = oldProduct.id;
    await this.productsRepository.delete(id_product);
    return 'Producto eliminado correctamente';
  }

  async addProductsSeeder() {
    for (const product of data) {
      const exists = await this.productsRepository.findOne({
        where: { name: product.name },
      });
      if (!exists) {
        const category = await this.validateProduct(product);
        if (category) {
          const newProduct = this.productsRepository.create({
            ...product,
            category: category,
          });
          await this.productsRepository.save(newProduct);
        }
      }
    }
    return 'Products seeded';
  }

  async validateProduct(product) {
    // Verificar si el producto ya existe
    const existingProduct = await this.productsRepository.findOne({
      where: { name: product.name },
    });
    if (existingProduct) {
      console.error(`Product already exists: ${product.name}`);
      return null;
    }

    // Verificar si la categoría existe
    const category = await this.categoriesRepository.findOne({
      where: { name: product.category },
    });
    if (!category) {
      console.error(`Category not found for product ${product.name}`);
      return null;
    }

    // Retornar la categoría si el producto es válido y la categoría existe
    return category;
  }
}
