/*
 * @Author: Carlos
 * @Date: 2023-01-16 23:11:18
 * @LastEditTime: 2023-01-16 23:25:50
 * @FilePath: /nest-portal/src/wrapper/wrapper.interceptor.ts
 * @Description:
 */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Data<T> {
  data: T;
}
@Injectable()
export class WrapperInterceptor<T = any> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Data<T>> {
    const response = next.handle().pipe(
      map(data => ({
        data,
        code: 200,
        success: true,
        message: 'success',
      }))
    );
    return response;
  }
}
