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

  @IsString()
  @IsOptional()
  imgUrl: string;
}
