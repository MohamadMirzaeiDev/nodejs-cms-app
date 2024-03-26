
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((item) => this.hidePassword(item));
        } else {
          return this.hidePassword(data);
        }
      }),
    );
  }

  private hidePassword(user: any): any {
    const { password, ...rest } = user;
    return rest;
  }
}