import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { Match } from '../../../decorators/match.decorator';
import { GenderType } from '../../../common/constants/gende-type';
export class LoginUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
