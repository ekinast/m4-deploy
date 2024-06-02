import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { CategoriesDBService } from './categoriesDB.service';

@Injectable()
export class ParseCategoryPipe implements PipeTransform {
  constructor(private readonly categoriesDBService: CategoriesDBService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (!value.category) {
      return value;
    }

    const category = await this.categoriesDBService.findByName(value.category);
    console.log('Pasé por el pie de categoría', category);

    if (!category) {
      throw new BadRequestException(`Category not found`);
    }

    value.category = category.id; // Set the category to its UUID
    return value;
  }
}
