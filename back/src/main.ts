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
        const flattenValidationErrors = (validationErrors, parentPath = '') => {
          const result = [];
          validationErrors.forEach((error) => {
            const propertyPath = parentPath
              ? `${parentPath}.${error.property}`
              : error.property;
            if (error.constraints) {
              result.push({
                property: propertyPath,
                constraints: Object.values(error.constraints),
              });
            }
            if (error.children && error.children.length) {
              result.push(
                ...flattenValidationErrors(error.children, propertyPath),
              );
            }
          });
          return result;
        };

        const flattenedErrors = flattenValidationErrors(errors);

        const formattedErrors = flattenedErrors
          .map((e) => {
            const propertyPath = e.property.replace(
              /\.\d+/g,
              (match) => `[${match.slice(1)}]`,
            );
            return `${propertyPath}: ${e.constraints.join(', ')}`;
          })
          .join('; ');

        return new BadRequestException({
          alert:
            'Se ha detectado un error en la petición, por favor revise los datos enviados.',
          statusCode: 400,
          error: 'Bad Request',
          message: formattedErrors,
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
