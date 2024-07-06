import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Category } from '../../categories/categories.entity';
import { categories } from './categories-mock';

@Injectable()
export class CategoriesSeed {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async seed() {
    // Obtener todas las categorías existentes de una vez
    const existingCategories = await this.categoryRepository.find({
      where: { name: In(categories) },
    });

    for (const categoryName of categories) {
      if (
        !existingCategories.some((category) => category.name === categoryName)
      ) {
        const category = new Category();
        category.name = categoryName;
        await this.categoryRepository.save(category);
      }
    }
  }
}
