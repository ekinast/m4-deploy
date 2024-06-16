import { Injectable } from '@nestjs/common';
import { OrderDetail } from './entities/orders-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { Repository } from 'typeorm';
import { Product } from '../products/products.entity';

@Injectable()
export class OrdersDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private ordersDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  create(createOrdersDetail: OrderDetail) {
    return 'This action adds a new ordersDetail';
  }

  findAll() {
    return `This action returns all ordersDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ordersDetail`;
  }
}
