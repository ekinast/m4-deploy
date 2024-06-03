import {
  IsString,
  IsNumber,
  Min,
  IsOptional,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';

export class ProductPartialDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4', { message: 'El ID debe ser un UUID de versión 4 válido' })
  id: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock: number;

  @IsOptional()
  @IsString()
  imgUrl: string;
}
