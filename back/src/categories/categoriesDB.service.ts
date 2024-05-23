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
    const skippedItems = (page - 1) * limit;
    return this.categoriesRepository.find({
      skip: skippedItems,
      take: limit,
    });
  }

  async getCategoryById(id: string): Promise<Category> {
    return this.categoriesRepository.findOneBy({ id: id });
  }

  async addCategory(category: Category): Promise<Category> {
    if (await this.categoryExists(category.name)) {
      throw new Error(`La categoría ya existe: ${category.name}`);
    }
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

  async createCategorySeeds(categories: Category[]): Promise<Category[]> {
    if (!categories || categories.length === 0) {
      throw new Error('No se proveyeron categorías');
    }

    // Crear un array para almacenar las categorías únicas
    const uniqueCategories: Category[] = [];

    // Verificar cada categoría individualmente y añadir las que no existen
    for (const category of categories) {
      const exists = await this.categoryExists(category.name);
      if (!exists) {
        uniqueCategories.push(category);
      }
    }

    if (uniqueCategories.length === 0) {
      throw new Error('All categories already exist');
    }

    try {
      // Guardar todas las categorías únicas en la base de datos
      return await this.categoriesRepository.save(uniqueCategories);
    } catch (error) {
      throw new Error(`Fallo al crear categorías: ${error.message}`);
    }
  }

  private async categoryExists(name: string): Promise<boolean> {
    const count = await this.categoriesRepository.count({ where: { name } });
    return count > 0;
  }
}
