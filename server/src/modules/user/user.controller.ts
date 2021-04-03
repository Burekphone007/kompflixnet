import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpStatus,
  UseFilters,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUserDto';
import { HttpExceptionFilter } from '../../http-exception.filter';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseFilters(new HttpExceptionFilter())
  @Post('registration')
  async addUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'User added successfully',
      data: user,
    };
  }
}
