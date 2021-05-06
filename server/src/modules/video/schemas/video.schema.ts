import { Prop, SchemaFactory, Schema as NestSchema } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';
import { Category } from '../../../modules/category/schemas/category.schema';
import { v4 as uuidv4 } from 'uuid';
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

  @Prop({ type: Date, default: Date.now })
  uploadDate: Date;

  @Prop({ default: uuidv4() })
  storageUID: string;

  @Prop()
  uploaderId: string;
  // uploaderId: {
  //   type: Schema.Types.ObjectId;
  // };

  @Prop()
  categories: [
    {
      type: Schema.Types.ObjectId;
      ref: Category;
    },
  ];
}

export const VideoSchema = SchemaFactory.createForClass(Video);
