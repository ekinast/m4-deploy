import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

function validateAuthorizationHeader(request: Request): boolean {
  const authHeader = request.headers['authorization'];

  // Verificar si el encabezado Authorization está presente
  if (!authHeader) {
    return false;
  }

  // Verificar si el encabezado Authorization tiene la estructura 'Basic: <email>:<password>'
  const [method, credentials] = authHeader.split(' ');
  if (method !== 'Basic' || !credentials) {
    return false;
  }

  // Por ahora, no se valida si el email y la contraseña son válidos, solo se verifica su presencia
  return true;
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateAuthorizationHeader(request);
  }
}
