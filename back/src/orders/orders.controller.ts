import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AddOrderDto } from './dto/add-order.dto';
import { AuthGuard } from 'src/auth/auth.guards';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {
    console.log('OrdersController instantiated');
  }

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async addOrder(@Body() addOrderDto: AddOrderDto) {
    return this.ordersService.addOrder(addOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }
}
