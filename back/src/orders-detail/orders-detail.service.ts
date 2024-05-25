import { Injectable } from '@nestjs/common';
import { OrdersDetail } from './entities/orders-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/products.entity';

@Injectable()
export class OrdersDetailService {
  constructor(
    @InjectRepository(OrdersDetail)
    private ordersDetailRepository: Repository<OrdersDetail>,
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  create(createOrdersDetail: OrdersDetail) {
    return 'This action adds a new ordersDetail';
  }

  findAll() {
    return `This action returns all ordersDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ordersDetail`;
  }
}
