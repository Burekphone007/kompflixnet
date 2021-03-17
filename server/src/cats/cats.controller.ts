import { Controller,Post,Body,Get,Param,Patch,Delete,HttpStatus } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/createCatDto';

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) { }

    @Post()
    async addCat(
        @Body() createCatDto: CreateCatDto
    ) {
        const cat = await this.catsService.create(
            createCatDto
        );
        return {
            statusCode: HttpStatus.OK,
            message: 'Cat added successfully',
            data: cat,
        };
    }
}