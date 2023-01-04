import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch(BadRequestException)
export class ValidationExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: FastifyReply<any> = ctx.getResponse<FastifyReply>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);

    response.status(status).send({
      ...error,
      statusCode: status,
      timestamp: new Date().toISOString(),
      description: 'Bad Request!!!',
      path: ctx.getRequest().url,
    });
  }
}
