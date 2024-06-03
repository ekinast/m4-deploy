import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof BadRequestException) {
          const response = err.getResponse();
          const message =
            typeof response === 'string' ? response : response['message'];

          console.error(
            'Validation error details:',
            JSON.stringify(response, null, 2),
          );

          const transformedMessage = Array.isArray(message)
            ? message
                .map((msg) => {
                  if (typeof msg === 'object' && msg.constraints) {
                    if (msg.constraints.isUUID) {
                      return `El campo ${msg.property} debe ser un UUID válido.`;
                    }
                    return Object.values(msg.constraints).join(', ');
                  }
                  return msg;
                })
                .join(', ')
            : `Error de validación: ${message}`;

          return throwError(() => new BadRequestException(transformedMessage));
        }

        // Log more details for unhandled errors
        console.error('Unhandled error:', err);
        if (err instanceof TypeError) {
          console.error('Type error:', err.message, err.stack);
        } else {
          console.error('Other error:', err);
        }

        return throwError(
          () =>
            new InternalServerErrorException('Ocurrió un error inesperado.'),
        );
      }),
    );
  }
}
