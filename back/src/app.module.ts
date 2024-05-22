import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Category } from './categories/categories.entity';
import { User } from './users/users.entity';
import { Product } from './products/products.entity';
import { Order } from './orders/orders.entity';
import { OrderDetails } from './orders/details/orderDetails.entity';
import { AuthsModule } from './auth/auth.module';

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
        dropSchema: true,
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
    AuthsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
