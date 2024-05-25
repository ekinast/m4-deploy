import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/products.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/categories.entity';
import { AddOrderDto } from './dto/add-order.dto';
import { Order } from './entities/order.entity';
import { User } from 'src/users/users.entity';
import { OrdersDetail } from 'src/orders-detail/entities/orders-detail.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(OrdersDetail)
    private ordersDetailRepository: Repository<OrdersDetail>,
  ) {}

  async addOrder(addOrderDto: AddOrderDto) {
    const userId = addOrderDto.userId;
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no fue encontrado`);
    }

    const products = await Promise.all(
      addOrderDto.products.map(async (productId: { id: string }) => {
        const product = await this.productsRepository.findOneBy({
          id: productId.id,
        });
        if (!product) {
          throw new Error(`No se encontró el producto con ID ${productId.id}`);
        }

        if (product.stock === 0) {
          throw new Error(
            `No hay stock disponible para el producto con ID ${productId.id}`,
          );
        } else {
          product.stock -= 1;
          await this.productsRepository.save(product);
        }

        return product;
      }),
    );

    // Ahora hay que agregar la lógica para manejar el stock y demás

    const order: Partial<Order> = {
      //id: 'ee74ea4c-8d5a-4ef6-9437-2d047805b8b5',
      user: user,
      products: products,
      createdAt: new Date(),
      updatedAt: new Date(),
      ordersDetail: null,
    };

    return this.ordersRepository.save(order);
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }
}
