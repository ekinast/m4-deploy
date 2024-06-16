import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Repository } from 'typeorm';
import { Category } from '../categories/categories.entity';
import { data } from '../archivo/archivo.js';
import { ProductDto } from './dto/Product.dto';

@Injectable()
export class ProductsDBService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getProducts(page: number, limit: number): Promise<Product[]> {
    const skippedItems = (page - 1) * limit;
    return await this.productsRepository.find({
      relations: ['category'],
      skip: skippedItems,
      take: limit,
    });
  }

  async getProductById(id: string) {
    return await this.productsRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async createProduct(productDto: ProductDto): Promise<Product> {
    const product = new Product();
    product.name = productDto.name;
    product.description = productDto.description;
    product.price = productDto.price;
    product.stock = productDto.stock;
    product.imgUrl = productDto.imgUrl;

    if (productDto.category) {
      const category = await this.categoriesRepository.findOne({
        where: { id: productDto.category }, // Buscar por UUID
      });

      if (!category) {
        throw new NotFoundException('Categoría no encontrada');
      }
      product.category = category;
    }

    return this.productsRepository.save(product);
  }

  async updateProduct(id: string, updatedProductData: Partial<ProductDto>) {
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

  async addProductsSeeder(): Promise<Product[]> {
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
    return this.productsRepository.find();
  }

  async validateProduct(product) {
    // Verificar si el producto ya existe
    const existingProduct = await this.productsRepository.findOne({
      where: { name: product.name },
    });
    if (existingProduct) {
      throw new NotFoundException(`Product already exists: ${product.name}`);
    }

    // Verificar si la categoría existe
    const category = await this.categoriesRepository.findOne({
      where: { name: product.category },
    });
    if (!category) {
      throw new NotFoundException(
        `Category not found for product ${product.name}`,
      );
    }

    // Retornar la categoría si el producto es válido y la categoría existe
    return category;
  }

  async findByName(name: string): Promise<Category> {
    return this.categoriesRepository.findOne({ where: { name } });
  }
}
