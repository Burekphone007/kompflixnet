import {
  Controller,
  Post,
  Body,
  HttpStatus,
  UseFilters,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UploadVideoDtoReq } from './dto/uploadVideoDtoReq';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AuthUserInterceptor)
  @Post('upload')
  async addUser(@Body() uploadVideoDto: UploadVideoDtoReq) {
    const videoDocument = await this.videoService.upload(uploadVideoDto);
    return {
      statusCode: HttpStatus.OK,
      data: videoDocument,
    };
  }
}
