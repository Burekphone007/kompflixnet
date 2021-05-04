import { Prop, SchemaFactory, Schema as NestSchema } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';
import { Category } from '../../../modules/category/schemas/category.schema';
export type VideoDocument = Video & Document;

@NestSchema()
export class Video {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  like: number;

  @Prop()
  dislike: number;

  @Prop()
  uploadDate: Date;

  @Prop()
  storageUID: string;

  @Prop()
  categories: [
    {
      type: Schema.Types.ObjectId;
      ref: Category;
    },
  ];
}

export const VideoSchema = SchemaFactory.createForClass(Video);
