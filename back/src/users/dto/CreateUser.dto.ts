import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { addMinutes } from 'date-fns';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'El nombre es obligatorio y no puede estar vacío.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres.' })
  @ApiProperty({
    description:
      'El nombre del usuario debe ser válido y contener al menos 3 caracteres.',
    example: 'Juan Pérez',
    type: String,
  })
  name: string;

  @IsNotEmpty({ message: 'El email es obligatorio y no puede estar vacío.' })
  @IsEmail(
    {},
    {
      message: 'El correo electrónico no es válido.',
    },
  )
  @ApiProperty({
    description: 'El email del usuario debe ser un email válido.',
    example: 'jperez@mail.com',
    type: String,
  })
  email: string;

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    {
      message:
        'La contraseña debe contener al menos una letra minúscula, una mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*. Debe tener entre 8 y 15 caracteres.',
    },
  )
  @ApiProperty({
    description:
      'La contraseña del usuario debe contener al menos una letra minúscula, una mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*. Debe tener entre 8 y 15 caracteres.',
    example: 'P@ssw0rd',
    type: String,
  })
  password: string;

  @IsNotEmpty({
    message: 'El número de teléfono es obligatorio.',
  })
  @IsNumber({}, { message: 'El teléfono debe ser un número entero' })
  @Min(1000000, { message: 'El teléfono debe tener al menos 7 dígitos' })
  @Max(999999999999999, {
    message: 'El teléfono debe tener como máximo 15 dígitos',
  })
  @ApiProperty({
    description: 'El número de teléfono debe ser un número entero.',
    example: 1234567,
    type: Number,
  })
  phone?: number | undefined;

  @Length(5, 20, {
    message: 'El nombre del país debe tener entre 3 y 80 caracteres.',
  })
  @ApiProperty({
    description: 'El nombre del país debe ser válido.',
    example: 'Argentina',
    type: String,
  })
  country: string;

  @Length(3, 80, {
    message: 'La dirección debe tener entre 3 y 80 caracteres.',
  })
  @ApiProperty({
    description: 'La dirección del usuario debe ser válida.',
    example: 'Calle Falsa 123',
    type: String,
  })
  address: string;

  @Length(5, 20, {
    message: 'El nombre de la ciudad debe tener entre 5 y 20 caracteres.',
  })
  @ApiProperty({
    description: 'El nombre de la ciudad debe ser válido.',
    example: 'Springfield',
    type: String,
  })
  city: string;

  @IsOptional()
  @IsDate({ message: 'createdAt debe ser una instancia de Date' })
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @ApiProperty({
    description: 'La fecha de creación del usuario se genera automáticamente.',
    type: Date,
  })
  createdAt: Date;

  @IsOptional()
  @ApiProperty({
    description: 'El rol del usuario se asigna automáticamente.',
    type: Boolean,
    default: false,
  })
  isAdmin: boolean;

  constructor(createdAt?: Date) {
    this.createdAt = createdAt ? new Date(createdAt) : this.getLocalDate();
  }

  private getLocalDate(): Date {
    const now = new Date();
    const offsetInMinutes = now.getTimezoneOffset();
    return addMinutes(now, -offsetInMinutes);
  }
}
