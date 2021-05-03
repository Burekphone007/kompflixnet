import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
@Module({
  imports: [
    //  MongooseModule.forRoot(`mongodb://${process.env.MONGOHOST}/nest`),

    MongooseModule.forRoot(`mongodb://0.0.0.0:57793/nest`),
    ConfigModule.forRoot({ envFilePath: '.development.env', isGlobal: true }),

    AuthModule,
    CategoryModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
