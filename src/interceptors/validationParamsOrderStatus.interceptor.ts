import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Status } from 'src/enum/Status.enum';

@Injectable()
export class ValidParamsOrderStatusChange implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { order_id, status } = request.params;

    const validId = Number(order_id);
    if (isNaN(validId)) {
      throw new BadRequestException('The order_id must be an Number');
    }

    if (!Status[status]) {
      throw new BadRequestException('The Status is invalid. Please Try Again');
    }

    return next.handle();
  }
}
