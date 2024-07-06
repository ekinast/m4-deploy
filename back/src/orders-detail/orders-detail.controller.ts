import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrdersDetailService } from './orders-detail.service';
import { OrderDetail } from './entities/orders-detail.entity';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';

@ApiTags('OrdersDetail')
@Controller('orders-detail')
export class OrdersDetailController {
  constructor(private readonly ordersDetailService: OrdersDetailService) {
    console.log('OrdersDetailController instantiated');
  }

  @Post()
  @ApiExcludeEndpoint()
  async create(@Body() createOrdersDetail: OrderDetail) {
    return this.ordersDetailService.create(createOrdersDetail);
  }

  @Get()
  @ApiExcludeEndpoint()
  findAll() {
    return this.ordersDetailService.findAll();
  }

  @Get(':id')
  @ApiExcludeEndpoint()
  findOne(@Param('id') id: string) {
    return this.ordersDetailService.findOne(id);
  }
}
