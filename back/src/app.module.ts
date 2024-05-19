import { Module } from '@nestjs/common';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersRepository } from './users/users.repository';
import { ProductsRepository } from './products/products.repository';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Category } from './products/categories/categories.entity';
import { User } from './users/users.entity';
import { Product } from './products/products.entity';
import { Order } from './orders/orders.entity';
import { OrderDetails } from './orders/details/orderDetails.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        database: configService.get('DB_NAME'),
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        entities: [User, Category, Product, Order, OrderDetails],
        synchronize: true,
        logging: true,
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env.development',
    }),
    UsersModule,
    ProductsModule,
  ],
  controllers: [ProductsController, UsersController, AuthController],
  providers: [
    ProductsService,
    UsersService,
    AuthService,
    UsersRepository,
    ProductsRepository,
  ],
})
export class AppModule {}
