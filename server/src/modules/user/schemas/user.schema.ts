import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GenderType } from '../../../common/constants/gende-type';
export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({
    type: String,
    enum: GenderType,
    default: GenderType.FEMALE,
  })
  gender: GenderType;

  @Prop()
  isCast: boolean;

  @Prop()
  birthDate: Date;

  @Prop()
  bio: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
