import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    ConfigModule.forRoot({ envFilePath: '.development.env', isGlobal: true }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
