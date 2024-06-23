import { ApiProperty } from '@nestjs/swagger';

export class OrderApiDto {
  @ApiProperty({
    description: 'Id de la orden',
    example: '87cecae9-fb7c-4046-a878-1aabcdb83f22',
  })
  id: string;

  @ApiProperty({
    description: 'Precio total de la orden',
    example: '499.98',
  })
  price: number;
}
