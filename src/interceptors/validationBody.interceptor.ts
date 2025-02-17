import { Injectable } from '@nestjs/common';
import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ValidateRequestBodyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const body = request.body;

    if (Object.keys(body).length === 0) {
      throw new BadRequestException(
        'El cuerpo de la solicitud no puede estar vacío',
      );
    }

    return next.handle();
  }
}
