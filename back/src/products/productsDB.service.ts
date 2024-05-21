import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsDBService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
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
}
