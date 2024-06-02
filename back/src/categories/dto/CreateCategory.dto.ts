import { IsString, Length } from 'class-validator';

export class CreateCategoryDTO {
  @IsString()
  @Length(1, 50)
  name: string;
}
