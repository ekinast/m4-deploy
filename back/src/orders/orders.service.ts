import {
  BadRequestException,
  Injectable,
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

  async addOrder(addOrderDto: AddOrderDto): Promise<Order> {
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

    console.log('products', products);

    if (products.length === 0) {
      throw new NotFoundException(
        'No se encontraron productos, orden cancelada',
      );
    }

    // Crear la orden
    const order = new Order();
    order.user = user;
    order.createdAt = new Date();
    order.updatedAt = new Date();
    order.total = 0; // Inicialización del total

    let total = 0;
    const orderDetails: OrderDetail[] = [];

    // Crear y guardar detalles de la orden para cada producto
    for (const product of products) {
      if (product && product.stock > 0) {
        const orderDetail = new OrderDetail();
        orderDetail.order = order;
        orderDetail.product = product;
        orderDetail.price = product.price;
        total += product.price;
        console.log('total', total);
        console.log('orderDetail', orderDetail);

        // Reducir stock
        product.stock -= 1;
        await this.productsRepository.save(product);

        // Guardar detalle de la orden
        try {
          await this.ordersDetailRepository.save(orderDetail);
          orderDetails.push(orderDetail);
          console.log('orderDetails saved', orderDetails);
        } catch (error) {
          console.error('Failed to save orderDetail', error);
        }
      } else {
        throw new BadRequestException(
          `El producto ${product.name} no tiene stock.`,
        );
      }
    }

    // Asignar total a la orden y guardar
    order.total = total;
    await this.ordersRepository.save(order);

    // Recargar la orden con todas las relaciones
    const completeOrder = await this.ordersRepository.findOne({
      where: { id: order.id },
      relations: ['user', 'products', 'orderDetails', 'orderDetails.product'],
    });

    return completeOrder;
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }
}
