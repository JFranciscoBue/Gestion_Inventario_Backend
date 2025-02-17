import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ValidParamRequest implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const id = request.params.id;

    console.log(id);

    const validId = Number(id);
    if (isNaN(validId)) {
      throw new BadRequestException('El parámetro id debe ser un número');
    }

    return next.handle();
  }
}
