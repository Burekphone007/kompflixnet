import { IsString, MaxLength, MinLength } from 'class-validator';
export class CreateCategoryDtoReq {
  @MinLength(3)
  @MaxLength(30)
  @IsString()
  readonly name: string;
}
