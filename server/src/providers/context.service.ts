import requestContext from 'request-context';

import { User } from '../modules/user/schemas/user.schema';

export class ContextService {
  private static readonly nameSpace = 'request';
  private static authUserKey = 'user_key';

  private static get<T>(key: string): T {
    return requestContext.get(ContextService.getKeyWithNamespace(key));
  }

  private static set(key: string, value: any): void {
    requestContext.set(ContextService.getKeyWithNamespace(key), value);
  }

  private static getKeyWithNamespace(key: string): string {
    return `${ContextService.nameSpace}.${key}`;
  }

  static setAuthUser(user: User): void {
    ContextService.set(ContextService.authUserKey, user);
  }

  static getAuthUser(): User {
    return ContextService.get(ContextService.authUserKey);
  }
}
