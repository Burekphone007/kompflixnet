import { ConfigService } from '@nestjs/config';
export const configService: ConfigService = new ConfigService();
export const jwtConstants = {
  secret: 'secretKey',
};
