/*
 * @Author: Carlos
 * @Date: 2023-02-02 14:07:25
 * @LastEditTime: 2023-02-02 14:13:10
 * @FilePath: /nest-portal/src/http-exception.filter.ts
 * @Description: null
 */
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>()
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    response.status(status).json({
      code: status,
      // timestamp: new Date().toISOString(),
      // path: request.url,
      message: exceptionResponse.message || exceptionResponse.error,
      success: false,
    });
  }
}
