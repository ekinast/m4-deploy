import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/products.entity';
import { Repository } from 'typeorm';
import { Category } from '../categories/categories.entity';
import { Order } from './entities/order.entity';
import { User } from '../users/entities/users.entity';
import { OrderDetail } from '../orders-detail/entities/orders-detail.entity';
import { validateUser, validateProducts } from './orderValidation.service';
import { UsersDBService } from '../users/usersDB.service';
import { ProductsDBService } from '../products/productsDB.service';
import { CreateOrderDto } from '../orders/dto/CreateOrder.dto';
import { DataSource } from 'typeorm';

type OrderResponse = {
  id: string;
  price: number;
};

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
    private dataSource: DataSource,
  ) {}

  async addOrder(createOrderDto: CreateOrderDto): Promise<OrderResponse> {
    // Valido usuario
    const user: User = await validateUser(
      this.usersDBService,
      createOrderDto.userId,
    );
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Valido productos
    const products = await validateProducts(
      this.productsDBService,
      createOrderDto.products,
    );

    if (products.length === 0) {
      throw new NotFoundException(
        'No se encontraron productos, orden cancelada',
      );
    }

    const order = new Order();
    order.user = user;
    order.createdAt = new Date();

    // Primero guardo la orden para asegurar que tenga un ID
    try {
      await this.ordersRepository.save(order);
      console.log('Order saved', order);
    } catch (error) {
      console.error('Failed to save order', error);
      return;
    }

    const orderDetail = new OrderDetail();
    orderDetail.order = order;
    orderDetail.products = [];
    orderDetail.price = 0;

    for (const product of products) {
      if (product && product.stock > 0) {
        orderDetail.products.push(product);
        orderDetail.price += product.price;

        // Reducir stock
        product.stock -= 1;
        await this.productsRepository.save(product);
      } else {
        throw new BadRequestException(
          `El producto ${product.name} no tiene stock.`,
        );
      }
    }

    try {
      await this.ordersDetailRepository.save(orderDetail);
    } catch (error) {
      console.error('Failed to save orderDetail', error);
      throw new InternalServerErrorException(
        'Error al guardar los detalles de la orden',
      );
    }

    return {
      id: order.id,
      price: orderDetail.price,
    };
  }

  async findAll() {
    return await this.ordersRepository.find({ relations: ['orderDetails'] });
    //return await this.ordersRepository.find();
  }

  async findOne(id: string) {
    return await this.ordersRepository.findOne({
      where: { id: id },
      relations: ['orderDetails', 'orderDetails.products'],
    });
  }

  async deleteOrder(id: string) {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['orderDetails', 'orderDetails.products', 'user'],
    });

    if (!order) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }

    await this.dataSource.transaction(async (transactionalEntityManager) => {
      try {
        if (order.orderDetails) {
          await transactionalEntityManager.remove(
            OrderDetail,
            order.orderDetails,
          );
        }

        await transactionalEntityManager.remove(Order, order);

        // Opcional: Actualiza el usuario para eliminar la referencia a la orden si es necesario
        const user = await this.usersRepository.findOne({
          where: { id: order.user.id },
          relations: ['orders'],
        });

        if (user) {
          user.orders = user.orders.filter((o) => o.id !== id);
          await transactionalEntityManager.save(User, user);
        }
      } catch (error) {
        console.error(
          'Error durante la transacción, haciendo rollback...',
          error,
        );
        throw error;
      }
    });

    return { success: `Órden con ID ${id} eliminada correctamente` };
  }
}
