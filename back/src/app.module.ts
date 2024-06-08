import { Module } from '@nestjs/common';
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
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
