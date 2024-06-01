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
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { AuthGuard } from 'src/auth/auth.guards';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {
    console.log('OrdersController instantiated');
  }

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async addOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.addOrder(createOrderDto);
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
