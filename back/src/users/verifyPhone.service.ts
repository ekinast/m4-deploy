import { User } from './users.entity';

const VerifyPhoneService = (user: User): { error?: string } => {
  if (typeof user.phone === 'string') {
    // Eliminar todos los espacios en blanco de la cadena de teléfono
    const newPhone = (user.phone as string).replace(/\s/g, '');

    // Verificar si la cadena resultante solo contiene dígitos
    if (/^\d+$/.test(newPhone)) {
      user.phone = Number(newPhone);
    } else {
      return {
        error: 'El número de teléfono contiene caracteres no válidos.',
      };
    }
    return {};
  }
};

export default VerifyPhoneService;
