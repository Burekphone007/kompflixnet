import { Type } from 'class-transformer';
import { IsDate, IsInt, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly username: string;

  @Type(() => Date)
  @IsDate()
  readonly birthDate: Date;

  @IsString()
  readonly password: string;
}
