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
import { Order } from './entities/order.entity';
import { User } from 'src/users/users.entity';
import { OrderDetail } from 'src/orders-detail/entities/orders-detail.entity';
import { validateUser, validateProducts } from './orderValidation.service';
import { UsersDBService } from '../users/usersDB.service';
import { ProductsDBService } from 'src/products/productsDB.service';
import { CreateOrderDto } from './dto/CreateOrder.dto';

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

    // Crear la orden
    const order = new Order();
    order.user = user;
    order.createdAt = new Date();

    // Primero guardar la orden para asegurar que tenga un ID
    try {
      await this.ordersRepository.save(order);
      console.log('Order saved', order);
    } catch (error) {
      console.error('Failed to save order', error);
      return; // Regresar o manejar el error adecuadamente
    }

    const orderDetail = new OrderDetail(); // Crear un solo OrderDetail
    orderDetail.order = order;
    orderDetail.products = []; // Inicializar la lista de productos como un arreglo vacío
    orderDetail.price = 0; // Inicializar el precio del OrderDetail

    // Añadir productos al OrderDetail
    for (const product of products) {
      if (product && product.stock > 0) {
        orderDetail.products.push(product); // Agregar producto al OrderDetail
        orderDetail.price += product.price; // Acumular el precio en el OrderDetail

        // Reducir stock
        product.stock -= 1;
        await this.productsRepository.save(product);
      } else {
        throw new BadRequestException(
          `El producto ${product.name} no tiene stock.`,
        );
      }
    }

    // Guardar el OrderDetail completo con todos los productos
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
