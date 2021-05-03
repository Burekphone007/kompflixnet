import { Controller, Post, Body, HttpCode, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDtoReq } from './dto/createCategoryDtoReq';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  async createCategory(@Body() createCategoryDtoReq: CreateCategoryDtoReq) {
    await this.categoryService.create(createCategoryDtoReq);
  }
}
