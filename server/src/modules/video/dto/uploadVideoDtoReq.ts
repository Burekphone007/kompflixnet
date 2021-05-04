import { Type } from 'class-transformer';
import { IsString, MinLength, MaxLength, IsArray } from 'class-validator';

export class UploadVideoDtoReq {
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsArray()
  @IsString({ each: true })
  readonly categories: string[];
}
