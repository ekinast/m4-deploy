import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsOptional, IsUUID } from 'class-validator';

export class CategoryResponseDTO {
  @ApiProperty({
    description: 'El ID de la categoría.',
    example: 'c52c6985-44a2-4e82-9bd4-50fe6a1ce18c',
    type: String,
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'El nombre de la categoría.',
    example: 'Vajilla',
    type: String,
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  @ApiProperty({
    description: 'El nombre de la categoría debe ser un nombre válido.',
    example: 'Vajilla',
    type: String,
  })
  name?: string;
}
