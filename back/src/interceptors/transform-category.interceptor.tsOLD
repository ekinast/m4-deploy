import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CategoriesDBService } from '../categories/categoriesDB.service';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformCategoryInterceptor implements NestInterceptor {
  constructor(private readonly categoriesDBService: CategoriesDBService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { category } = request.body;

    if (category) {
      const categoryEntity =
        await this.categoriesDBService.findByName(category);

      if (!categoryEntity) {
        throw new BadRequestException('Category not found');
      }

      request.body.category = categoryEntity.id; // Transform category name to UUID
    }

    return next.handle().pipe(map((data) => data));
  }
}
