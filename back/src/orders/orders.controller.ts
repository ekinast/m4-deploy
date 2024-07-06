import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { AuthGuard } from '../auth/auth.guards';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { OrderApiDto } from './dto/orderApi.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { Order } from './entities/order.entity';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {
    console.log('OrdersController instantiated');
  }

  @Post()
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiOperation({ summary: 'Crear una orden nueva' })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
    type: OrderApiDto,
  })
  @HttpCode(201)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async addOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.addOrder(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Ver todas las órdenes' })
  @ApiResponse({
    status: 200,
    description: 'The order details',
    type: OrderResponseDto,
  })
  async findAll(): Promise<Order[]> {
    return await this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ver una orden por :id' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'The order details',
    type: OrderResponseDto,
  })
  async getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return await this.ordersService.findOne(id);
  }

  // DELETE /orders/:id no está pedido en el enunciado del HW pero lo agregué para completar el CRUD
  // y poder dar de baja una órden
  @Delete(':id')
  @ApiOperation({ summary: 'Borrar una orden por :id' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async deleteOrder(@Param('id', ParseUUIDPipe) id: string) {
    return await this.ordersService.deleteOrder(id);
  }
}
