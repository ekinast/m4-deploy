import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class ProductDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  stock: number;

  @IsOptional()
  @IsString()
  imgUrl?: string;

  @IsOptional()
  @IsUUID()
  category?: string;
}
