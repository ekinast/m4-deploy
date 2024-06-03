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

export class CreateOrderDto {
  @IsNotEmpty({ message: 'El userId es obligatorio.' })
  @IsUUID('4', { message: 'El userId debe ser un UUID válido.' })
  userId: string;

  @IsArray({ message: 'Products debe ser un arreglo.' })
  @ArrayMinSize(1, {
    message: 'El arreglo de products debe contener al menos un elemento.',
  })
  @ValidateNested({ each: true })
  @Type(() => ProductPartialDto)
  @IsUniqueArray({
    message: 'El arreglo de products contiene elementos duplicados.',
  })
  products: ProductPartialDto[];

  constructor(userId: string, products: ProductPartialDto[]) {
    this.userId = userId;
    this.products = products;
  }
}
