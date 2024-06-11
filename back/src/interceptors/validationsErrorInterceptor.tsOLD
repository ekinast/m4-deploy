import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ValidationErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof BadRequestException) {
          const response = err.getResponse();
          const message =
            typeof response === 'string' ? response : response['message'];

          // Transform the error message to be more user-friendly
          const transformedMessage = Array.isArray(message)
            ? message
                .map((msg) => {
                  if (typeof msg === 'object' && msg.constraints) {
                    if (msg.constraints.isUuid) {
                      return `El campo ${msg.property} debe ser un UUID válido.`;
                    }
                    return Object.values(msg.constraints).join(', ');
                  }
                  return msg;
                })
                .join(', ')
            : `Error de validación: ${message}`;

          return throwError(new BadRequestException(transformedMessage));
        }
        return throwError(err);
      }),
    );
  }
}
