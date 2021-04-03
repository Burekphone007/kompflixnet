import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsString,
  IsEnum,
  minLength,
  MinLength,
  MaxLength,
  ValidateIf,
} from 'class-validator';
import { Match } from '../../../decorators/match.decorator';
import { GenderType } from '../../../common/constants/gende-type';
export class CreateUserDto {
  @IsString()
  @MinLength(5, { message: 'name too short' })
  @MaxLength(30, { message: 'name is too long' })
  readonly name: string;

  @IsString()
  @MinLength(5, { message: 'username is too short' })
  @MaxLength(20, { message: 'username is too long' })
  readonly username: string;

  @Type(() => Date)
  @IsDate({ message: 'please choose  date ' })
  readonly birthDate: Date;

  @IsEnum(GenderType, { message: 'incorrect gender' })
  readonly gender: GenderType;

  @IsString()
  @MinLength(5, { message: 'password too short' })
  @MaxLength(25, { message: 'password is too long' })
  readonly password: string;

  @IsString()
  @Match('password', { message: 'doesnt match with password' })
  readonly confirmPassword: string;
}
