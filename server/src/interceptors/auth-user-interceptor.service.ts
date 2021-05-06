import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ContextService } from '../providers/context.service';
import { UserService } from '../../src/modules/user/user.service';
import { User } from '../modules/user/schemas/user.schema';

@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
  constructor(private readonly userService: UserService) {} //private readonly jwtService: JwtService
  // ,
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    try {
      const request = context.switchToHttp().getRequest();

      const jwt = request.headers.authorization.replace('Bearer ', '');

      const jwtService = new JwtService(jwt).decode(jwt, { json: true });

      const idFromJwt = jwtService['id'];
      const user: User = await this.userService.findOneById(idFromJwt);

      if (user) {
        ContextService.setAuthUser(user);
      } else {
        throw new UnauthorizedException();
      }
    } catch (err) {
      throw new UnauthorizedException();
    }
    return next.handle();
  }
}
