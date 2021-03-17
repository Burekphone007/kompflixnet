import { Controller,Post,Body,Get,Param,Patch,Delete,HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import {  CreateUserDto } from './dto/createUserDto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post("registration")
    async addCat(
        @Body() createUserDto: CreateUserDto
    ) {
        const user = await this.userService.create(
            createUserDto
        );
        return {
            statusCode: HttpStatus.OK,
            message: 'User added successfully',
            data: user,
        };
    }
}