import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/createUserDto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.hashPassword(createUserDto.password);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async hashPassword(password: string) {
    const saltOrRounds = parseInt(
      this.configService.get<string>('PASSWORDSALT'),
    );
    return await bcrypt.hash(password, saltOrRounds);
  }
  async comparePasswords(
    userPassword: string,
    inputPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(userPassword, inputPassword);
  }
  async findOne(username: string): Promise<User> {
    return await this.userModel.findOne({ username: username }).exec();
  }
}
