import { Type } from 'class-transformer';
import { IsDate, IsInt, IsString, IsEnum } from 'class-validator';
import { GenderType } from '../../../common/constants/gende-type';
export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly username: string;

  @Type(() => Date)
  @IsDate()
  readonly birthDate: Date;

  @IsEnum(GenderType)
  readonly gender: GenderType;

  @IsString()
  readonly password: string;
}
