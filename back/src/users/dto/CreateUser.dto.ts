import {
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'El nombre es obligatorio y no puede estar vacío.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres.' })
  name: string;

  @IsNotEmpty({ message: 'El email es obligatorio y no puede estar vacío.' })
  @IsEmail(
    {},
    {
      message: 'El correo electrónico no es válido.',
    },
  )
  email: string;

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    {
      message:
        'La contraseña debe contener al menos una letra minúscula, una mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*. Debe tener entre 8 y 15 caracteres.',
    },
  )
  password: string;

  @IsNotEmpty({
    message: 'El número de teléfono es obligatorio.',
  })
  @IsNumber({}, { message: 'El teléfono debe ser un número entero' })
  @Min(1000000, { message: 'El teléfono debe tener al menos 7 dígitos' })
  @Max(999999999999999, {
    message: 'El teléfono debe tener como máximo 15 dígitos',
  })
  phone?: number | undefined;

  @Length(5, 20, {
    message: 'El nombre del país debe tener entre 3 y 80 caracteres.',
  })
  country: string;

  @Length(3, 80, {
    message: 'La dirección debe tener entre 3 y 80 caracteres.',
  })
  address: string;

  @Length(5, 20, {
    message: 'El nombre de la ciudad debe tener entre 5 y 20 caracteres.',
  })
  city: string;

  // @IsDate()
  // createdAt: Date;

  // constructor(createdAt: number) {
  //   this.createdAt = new Date(createdAt);
  // }
}
