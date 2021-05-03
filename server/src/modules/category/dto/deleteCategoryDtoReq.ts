import { IsString } from 'class-validator';
export class DeleteCategoryDtoReq {
  @IsString()
  readonly name: string;
}
