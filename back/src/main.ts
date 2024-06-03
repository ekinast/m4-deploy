import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobal } from './middlewares/logger.middleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
// import { CategoriesController } from './categories/categories.controller';
// import { ProductsController } from './products/products.controller';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        const cleanErrors = errors.map((error) => {
          return {
            property: error.property,
            constraints: Object.values(error.constraints),
          };
        });
        return new BadRequestException({
          alert:
            'Se ha detectado un error en la petición, por favor revise los datos enviados.',
          statusCode: 400,
          error: 'Bad Request',
          message: cleanErrors,
        });
      },
    }),
  );
  app.use(LoggerGlobal);
  await app.listen(3000);
  // await CategoriesController.createCategorySeeder();
  // await ProductsController.createProductSeeder();
}
bootstrap();
