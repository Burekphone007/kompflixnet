import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { CatsModule } from './cats/cat.module';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [ MongooseModule.forRoot('mongodb://localhost/nest'),ConfigModule.forRoot({ envFilePath: '.development.env', isGlobal: true}), CatsModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
