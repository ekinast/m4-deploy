import { IsString, Length, IsOptional } from 'class-validator';

export class UpdateCategoryDTO {
  @IsOptional()
  @IsString()
  @Length(1, 50)
  name?: string;
}
