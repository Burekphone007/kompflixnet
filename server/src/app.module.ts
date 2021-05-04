import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { VideoModule } from './modules/video/viceo.module';
@Module({
  imports: [
    //  MongooseModule.forRoot(`mongodb://${process.env.MONGOHOST}/nest`),

    MongooseModule.forRoot(`mongodb://0.0.0.0:27017/nest`),
    ConfigModule.forRoot({ envFilePath: '.development.env', isGlobal: true }),
    VideoModule,
    AuthModule,
    CategoryModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
