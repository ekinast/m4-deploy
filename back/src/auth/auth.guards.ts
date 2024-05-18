import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      return false;
    }

    const [method, credentialsBase64] = authHeader.split(' ');

    if (method !== 'Basic' || !credentialsBase64) {
      return false;
    }

    const credentials = Buffer.from(credentialsBase64, 'base64').toString(
      'utf-8',
    );
    //console.log('Decoded credentials:', credentials);

    // Aquí continua la lógica de validación de credenciales si es necesario

    return true;
  }
}
