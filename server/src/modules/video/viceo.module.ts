import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { Video, VideoSchema } from './schemas/video.schema';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    UserModule,
  ],
  controllers: [VideoController],
  providers: [VideoService],
  exports: [VideoService],
})
export class VideoModule {}
