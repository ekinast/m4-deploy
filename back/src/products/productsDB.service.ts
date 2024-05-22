import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/categories.entity';
import { CategoriesDBService } from 'src/categories/categoriesDB.service';

@Injectable()
export class ProductsDBService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getProducts(page: number, limit: number) {
    return this.productsRepository.find();
  }

  async getProductById(id: string) {
    return this.productsRepository.findOneBy({ id: id });
  }
  async createProduct(product: Product) {
    return this.productsRepository.save(product);
  }

  async updateProduct(id: string, updatedProductData: Partial<Product>) {
    const oldProduct = await this.productsRepository.findOneBy({ id: id });

    if (!oldProduct) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    // Merge de datos: copiar las propiedades actualizadas al usuario existente
    Object.assign(oldProduct, updatedProductData);

    // Guardar los cambios en la base de datos
    const updatedProduct = await this.productsRepository.save(oldProduct);

    // Retornar el usuario actualizado
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

  // products.service.ts

  async addProductsSeeder() {
    const productsToSeed = [
      {
        name: 'Iphone 15',
        description: 'The best smartphone in the world',
        price: 199.99,
        stock: 12,
        category: 'smartphone',
      },
      {
        name: 'Samsung Galaxy S23',
        description: 'The best smartphone in the world',
        price: 150.0,
        stock: 12,
        category: 'smartphone',
      },
      {
        name: 'Motorola Edge 40',
        description: 'The best smartphone in the world',
        price: 179.89,
        stock: 12,
        category: 'smartphone',
      },
      {
        name: 'Samsung Odyssey G9',
        description: 'The best monitor in the world',
        price: 299.99,
        stock: 12,
        category: 'monitor',
      },
      {
        name: 'LG UltraGear',
        description: 'The best monitor in the world',
        price: 199.99,
        stock: 12,
        category: 'monitor',
      },
      {
        name: 'Acer Predator',
        description: 'The best monitor in the world',
        price: 150.0,
        stock: 12,
        category: 'monitor',
      },
      {
        name: 'Razer BlackWidow V3',
        description: 'The best keyboard in the world',
        price: 99.99,
        stock: 12,
        category: 'keyboard',
      },
      {
        name: 'Corsair K70',
        description: 'The best keyboard in the world',
        price: 79.99,
        stock: 12,
        category: 'keyboard',
      },
      {
        name: 'Logitech G Pro',
        description: 'The best keyboard in the world',
        price: 59.99,
        stock: 12,
        category: 'keyboard',
      },
      {
        name: 'Razer Viper',
        description: 'The best mouse in the world',
        price: 49.99,
        stock: 12,
        category: 'mouse',
      },
      {
        name: 'Logitech G502 Pro',
        description: 'The best mouse in the world',
        price: 39.99,
        stock: 12,
        category: 'mouse',
      },
      {
        name: 'SteelSeries Rival 3',
        description: 'The best mouse in the world',
        price: 29.99,
        stock: 12,
        category: 'mouse',
      },
    ];

    const existingProducts = await this.productsRepository.find();
    const filteredProducts = productsToSeed.filter(
      (prod) => !existingProducts.some((p) => p.name === prod.name),
    );

    for (const product of filteredProducts) {
      const category = await this.categoriesRepository.findOne({
        where: { name: product.category },
      });
      if (category) {
        const newProduct = this.productsRepository.create({
          ...product,
          category: category,
        });
        await this.productsRepository.save(newProduct);
      } else {
        console.error(`Category not found for product ${product.name}`);
      }
    }
    return 'Products seeded';
  }
}
