import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/products.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/categories.entity';
import { AddOrderDto } from './dto/add-order.dto';
import { Order } from './entities/order.entity';
import { User } from 'src/users/users.entity';
import { OrderDetail } from 'src/orders-detail/entities/orders-detail.entity';
import { validateUser, validateProducts } from './orderValidation.service';
import { UsersDBService } from '../users/usersDB.service';
import { ProductsDBService } from 'src/products/productsDB.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    private readonly usersDBService: UsersDBService,
    private readonly productsDBService: ProductsDBService,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(OrderDetail)
    private ordersDetailRepository: Repository<OrderDetail>,
  ) {}

  async addOrder(addOrderDto: AddOrderDto): Promise<Partial<Order>> {
    // Valido usuario
    const user = await validateUser(this.usersDBService, addOrderDto.userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Valido productos
    const products = await validateProducts(
      this.productsDBService,
      addOrderDto.products,
    );

    if (products.length === 0) {
      throw new NotFoundException(
        'No se encontraron productos, orden cancelada',
      );
    }

    // Crear la orden
    const order = new Order();
    order.userId = user.id;
    order.createdAt = new Date();
    order.updatedAt = new Date();
    order.total = 0; // Inicialización del total

    // Primero guardar la orden para asegurar que tenga un ID
    try {
      await this.ordersRepository.save(order);
      console.log('Order saved', order);
    } catch (error) {
      console.error('Failed to save order', error);
      return; // Regresar o manejar el error adecuadamente
    }

    let total = 0;
    const orderDetails: OrderDetail[] = [];

    // Crear y guardar detalles de la orden para cada producto
    for (const product of products) {
      if (product && product.stock > 0) {
        const orderDetail = new OrderDetail();
        orderDetail.order = order;
        orderDetail.products = [product];
        orderDetail.price = product.price;
        total += product.price;

        // Reducir stock
        product.stock -= 1;
        await this.productsRepository.save(product);

        // Guardar detalle de la orden
        try {
          await this.ordersDetailRepository.save(orderDetail);
          orderDetails.push(orderDetail);
        } catch (error) {
          console.error('Failed to save orderDetail', error);
          throw new InternalServerErrorException(
            'Error al guardar los detalles de la orden',
          );
        }
      } else {
        throw new BadRequestException(
          `El producto ${product.name} no tiene stock.`,
        );
      }
    }

    // Asignar total a la orden y guardar
    order.total = total;
    try {
      const newOrder = await this.ordersRepository.save(order);
      return {
        id: order.id,
        total: order.total,
      };
    } catch (error) {
      console.error('Failed to save order', error);
      throw new InternalServerErrorException('Error al guardar la orden final');
    }
  }

  findAll() {
    return this.ordersRepository.find({ relations: ['orderDetails'] });
  }

  findOne(id: string) {
    return this.ordersRepository.findOne({
      where: { id: id },
      relations: ['orderDetails', 'orderDetails.products'],
    });
  }
}
