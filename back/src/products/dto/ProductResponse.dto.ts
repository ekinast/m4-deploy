import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class ProductResponseDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'El nombre del producto debe ser válido.',
    example: 'Teclado Genius',
    type: String,
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'La descripción del producto debe ser válido.',
    example: 'Teclado de escritorio',
    type: String,
  })
  description: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'El precio del producto debe ser numérico y positivo.',
    example: '299.99',
    type: Number,
  })
  price: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'El stock del producto debe ser un número entero.',
    example: '1200',
    type: Number,
  })
  stock: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'La URL del producto debe ser válida.',
    example: 'https://www.sample.com/image.jpg',
    type: String,
  })
  imgUrl?: string;
}
