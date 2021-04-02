import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionMessage = exception.getResponse();
    interface ExceptionErrorFormat {
      fieldName: string;
      message: string;
    }

    const errorMessages: ExceptionErrorFormat[] = exceptionMessage[
      'message'
    ].map((errors) => {
      let errMessage;
      for (let errtext in errors.constraints) {
        errMessage = errors.constraints[errtext];
      }
      return { fieldName: errors.property, message: errMessage };
    });

    response.status(status).json({
      statusCode: 400,
      error: 'Bad Request',
      message: errorMessages,
    });
  }
}
