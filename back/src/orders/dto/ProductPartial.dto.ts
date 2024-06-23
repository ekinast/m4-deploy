import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  Min,
  IsOptional,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';

export class ProductPartialDto {
  @ApiProperty({
    description: 'El ID debe ser un UUID de versión 4 válido.',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID('4', { message: 'El ID debe ser un UUID de versión 4 válido' })
  id: string;

  @ApiProperty({
    description: 'El nombre del producto debe ser válido.',
    type: String,
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'La descripción del producto debe ser válida.',
    type: String,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description:
      'El precio del producto debe ser un número positivo con hasta dos decimales.',
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'El stock del producto debe ser un número entero positivo.',
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({
    description: 'La URL del producto debe ser una URL válida.',
    type: String,
  })
  @IsOptional()
  @IsString()
  imgUrl: string;
}
