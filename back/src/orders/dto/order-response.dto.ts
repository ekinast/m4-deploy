import { ApiProperty } from '@nestjs/swagger';
import { OrderDetailsDto } from '../../orders-detail/dto/order-details.dto';

export class OrderResponseDto {
  @ApiProperty({
    description: 'The ID of the order',
    example: '574fc0c1-9da3-4955-9117-daa9af93ad3c',
  })
  id: string;

  @ApiProperty({
    description: 'The creation date of the order',
    example: '2024-07-02T19:34:28.236Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Details of the order',
    type: OrderDetailsDto,
  })
  orderDetails: OrderDetailsDto;
}
