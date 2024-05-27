import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrdersDetailService } from './orders-detail.service';
import { OrderDetail } from './entities/orders-detail.entity';

@Controller('orders-detail')
export class OrdersDetailController {
  constructor(private readonly ordersDetailService: OrdersDetailService) {
    console.log('OrdersDetailController instantiated');
  }

  @Post()
  async create(@Body() createOrdersDetail: OrderDetail) {
    return this.ordersDetailService.create(createOrdersDetail);
  }

  @Get()
  findAll() {
    return this.ordersDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersDetailService.findOne(+id);
  }
}
