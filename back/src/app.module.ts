import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthsModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { OrdersDetailModule } from './orders-detail/orders-detail.module';
import { FilesModule } from './files/files.module';
import typeOrmConfig from './config/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthErrorsInterceptor } from './interceptors/authErrorsInterceptor';
import { AllExceptionsFilter } from './filter/global-http-filter';
import { RoleInterceptor } from './interceptors/role.interceptor';
import { SeedsModule } from './seeds/seeds.module';
import { DateTimeMiddleware } from './middlewares/date-time.middleware';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    UsersModule,
    ProductsModule,
    AuthsModule,
    CategoriesModule,
    OrdersModule,
    OrdersDetailModule,
    FilesModule,
    SeedsModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthErrorsInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RoleInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DateTimeMiddleware).forRoutes('*'); // Aplica el middleware a todas las rutas
  }
}
