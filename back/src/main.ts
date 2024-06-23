import { NestFactory } from '@nestjs/core';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filter/global-http-filter';
import { LoggerGlobal } from './middlewares/logger.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CreateOrderDto } from './orders/dto/CreateOrder.dto';
import { ProductPartialDto } from './orders/dto/ProductPartial.dto';

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
  app.useGlobalFilters(new AllExceptionsFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Demo NestJS API')
    .setDescription(
      'Esta es una API creada con NestJS para el módulo 4 del curso de FullStack de HENRY',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    extraModels: [CreateOrderDto, ProductPartialDto],
  });

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
