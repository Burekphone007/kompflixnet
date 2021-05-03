import { Model } from 'mongoose';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDtoReq } from './dto/createCategoryDtoReq';
import { DeleteCategoryDtoReq } from './dto/deleteCategoryDtoReq';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDtoReq) {
    const category: Category = await this.findOne(createCategoryDto.name);
    if (category) {
      throw new ConflictException('Category already exist');
    }

    const createdCategory = new this.categoryModel({
      name: createCategoryDto.name,
    });
    if (!createdCategory.save()) {
      throw new InternalServerErrorException('The db currently is not working');
    }
  }

  async delete(deleteCategoryDto: DeleteCategoryDtoReq) {
    if (
      !(await this.categoryModel.deleteOne({ name: deleteCategoryDto.name }))
    ) {
      throw new NotFoundException();
    }
  }
  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(categoryName: string): Promise<Category> {
    return await this.categoryModel.findOne({ name: categoryName }).exec();
  }
}
