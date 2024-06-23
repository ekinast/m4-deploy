import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateCategoryDTO {
  @IsString()
  @Length(1, 50)
  @ApiProperty({
    description: 'El nombre de la categoría debe ser un nombre válido.',
    example: 'Vajilla',
    type: String,
  })
  name: string;
}
