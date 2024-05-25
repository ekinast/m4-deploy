import { PartialType } from '@nestjs/mapped-types';
import { AddOrderDto } from './add-order.dto';

export class UpdateOrderDto extends PartialType(AddOrderDto) {}
