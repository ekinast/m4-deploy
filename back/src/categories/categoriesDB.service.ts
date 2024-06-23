import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './categories.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from './dto/CreateCategory.dto';

@Injectable()
export class CategoriesDBService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async findByName(name: string): Promise<Category> {
    return this.categoriesRepository.findOne({ where: { name } });
  }

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

  async addCategory(category: CreateCategoryDTO): Promise<Category> {
    console.log('category.name', category.name);

    if (await this.categoryExists(category.name)) {
      throw new NotFoundException(`La categoría ya existe: ${category.name}`);
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

    const updatedCategory = await this.categoriesRepository.save(oldCategory);

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
      throw new NotFoundException('No se proveyeron categorías');
    }

    const uniqueCategories: Category[] = [];

    for (const category of categories) {
      const exists = await this.categoryExists(category.name);
      if (!exists) {
        uniqueCategories.push(category);
      }
    }

    if (uniqueCategories.length === 0) {
      throw new NotFoundException('All categories already exist');
    }

    try {
      return await this.categoriesRepository.save(uniqueCategories);
    } catch (error) {
      throw new NotFoundException(
        `Fallo al crear categorías: ${error.message}`,
      );
    }
  }

  private async categoryExists(name: string): Promise<boolean> {
    const count = await this.categoriesRepository.count({ where: { name } });
    return count > 0;
  }
}
