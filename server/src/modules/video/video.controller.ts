import { Controller, Post, Body, HttpStatus, UseFilters } from '@nestjs/common';
import { UploadVideoDtoReq } from './dto/uploadVideoDtoReq';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('upload')
  async addUser(@Body() uploadVideoDto: UploadVideoDtoReq) {
    const videoDocument = await this.videoService.upload(uploadVideoDto);
    return {
      statusCode: HttpStatus.OK,
      data: videoDocument,
    };
  }
}
