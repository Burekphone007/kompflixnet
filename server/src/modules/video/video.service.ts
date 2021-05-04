import { Model } from 'mongoose';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Video, VideoDocument } from './schemas/video.schema';
import { UploadVideoDtoReq } from './dto/uploadVideoDtoReq';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
  ) {}

  async upload(uploadVideoDto: UploadVideoDtoReq): Promise<VideoDocument> {
    const videoModel = new this.videoModel({
      ...uploadVideoDto,
    });
    if (!videoModel.save()) {
      throw new InternalServerErrorException('The db currently is not working');
    }
    return videoModel;
  }
}
