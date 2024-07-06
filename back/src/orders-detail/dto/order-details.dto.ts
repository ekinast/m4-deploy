import { ApiProperty } from '@nestjs/swagger';

export class OrderDetailsDto {
  @ApiProperty({
    description: 'ID del detalle de la orden',
    example: '1f960b18-d1a8-4558-b739-e073639c361f',
  })
  id: string;

  @ApiProperty({
    description: 'Precio',
    example: 959.98,
  })
  price: number;
}
