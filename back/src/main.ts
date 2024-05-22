import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobal } from './middlewares/logger.middleware';
// import { CategoriesController } from './categories/categories.controller';
// import { ProductsController } from './products/products.controller';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(LoggerGlobal);
  await app.listen(3000);
  // await CategoriesController.createCategorySeeder();
  // await ProductsController.createProductSeeder();
}
bootstrap();
