import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesDBService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getCategories(page: number, limit: number): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  async getCategoryById(id: string): Promise<Category> {
    return this.categoriesRepository.findOneBy({ id: id });
  }

  async createCategory(category: Category): Promise<Category> {
    return this.categoriesRepository.save(category);
  }

  async updateCategory(
    id: string,
    updatedCategoryData: Partial<Category>,
  ): Promise<Category> {
    const oldCategory = await this.categoriesRepository.findOneBy({ id: id });

    if (!oldCategory) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }
    Object.assign(oldCategory, updatedCategoryData);

    // Guardar los cambios en la base de datos
    const updatedCategory = await this.categoriesRepository.save(oldCategory);

    // Retornar el usuario actualizado
    return updatedCategory;
  }

  async deleteCategory(id: string) {
    const oldCategory = await this.categoriesRepository.findOneBy({
      id: id,
    });

    if (!oldCategory) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }
    const id_category = oldCategory.id;
    await this.categoriesRepository.delete(id_category);
    return 'Categoría eliminada correctamente';
  }

  async createCategorySeeds(categories: any[]): Promise<Category[]> {
    if (!categories || categories.length === 0) {
      throw new Error('No categories provided');
    }
    try {
      return await this.categoriesRepository.save(categories);
    } catch (error) {
      throw new Error(`Failed to create categories: ${error.message}`);
    }
  }
}
