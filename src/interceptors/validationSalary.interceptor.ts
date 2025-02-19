import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ValidSalary implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { salary } = request.body;

    if (typeof salary === 'number') {
      return next.handle();
    } else {
      throw new BadRequestException('Please Insert a valid Salary');
    }
  }
}
