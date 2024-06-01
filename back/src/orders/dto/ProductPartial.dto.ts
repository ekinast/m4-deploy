import {
  IsString,
  IsNumber,
  Min,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class ProductPartialDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty({
    message: 'El nombre es obligatorio.',
  })
  @IsString()
  name: string;

  @IsNotEmpty({
    message: 'La descripción es obligatoria.',
  })
  @IsString()
  description?: string;

  @IsNotEmpty({
    message: 'El precio es obligatorio.',
  })
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty({
    message: 'El stock es obligatorio.',
  })
  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  @IsOptional()
  imgUrl: string;
}
