import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ProductPartialDto } from './ProductPartial.dto';
import { IsUniqueArray } from './custom-decorators';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

@ApiExtraModels(ProductPartialDto)
export class CreateOrderDto {
  @IsNotEmpty({ message: 'El userId es obligatorio.' })
  @IsUUID('4', { message: 'El userId debe ser un UUID válido.' })
  @ApiProperty({
    description: 'El userId debe ser un UUID válido.',
    example: '11e50939-1c06-475e-abc3-09d94f07728a',
  })
  userId: string;

  @ApiProperty({
    description: 'El arreglo de productos puede contener varios productos.',
    type: ProductPartialDto,
    isArray: true,
    example: [
      {
        id: '617b3d82-0c8d-4c6a-a204-156b33484b6e',
      },
      {
        id: '3a298f80-cadb-4354-b916-1073f648760d',
      },
      {
        id: 'f58afdb0-f0bc-48b6-b263-f8c7420d04e5',
      },
    ],
  })
  @IsArray({ message: 'Products debe ser un arreglo.' })
  @ArrayMinSize(1, {
    message: 'El arreglo de products debe contener al menos un elemento.',
  })
  @ValidateNested({ each: true })
  @Type(() => ProductPartialDto)
  @IsUniqueArray({
    message: 'El arreglo de productos contiene elementos duplicados.',
  })
  products: ProductPartialDto[];

  constructor(userId: string, products: ProductPartialDto[]) {
    this.userId = userId;
    this.products = products;
  }
}
