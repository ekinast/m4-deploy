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
  @ApiOperation({ summary: 'Create order' })
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
  async findAll() {
    return await this.ordersService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getOrder(@Param('id') id: string) {
    return await this.ordersService.findOne(id);
  }

  // DELETE /orders/:id no está pedido en el enunciado del HW pero lo agregué para completar el CRUD
  // y poder dar de baja una órden
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async deleteOrder(@Param('id') id: string) {
    return await this.ordersService.deleteOrder(id);
  }
}
