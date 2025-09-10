import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IWrappedResponse } from '../interfaces/response.interface';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, IWrappedResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<IWrappedResponse<T>> {
    const response = context.switchToHttp().getResponse();
    const statusCode: number = response.statusCode;

    return next.handle().pipe(
      map((res: T | { data: T; message?: string }) => {
        const data = (res as { data: T }).data ?? (res as T);
        const message = (res as { message?: string }).message;

        return {
          meta: {
            status: statusCode >= 200 && statusCode < 300 ? 'success' : 'error',
            statusCode,
            message:
              message ??
              (statusCode >= 200 && statusCode < 300 ? 'OK' : 'Error'),
          },
          data,
        };
      }),
    );
  }
}
