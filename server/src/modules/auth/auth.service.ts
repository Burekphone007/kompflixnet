import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../user/dto/loginUserDto';
import { User } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user: User = await this.userService.findOne(username);
    if (!user) {
      throw new UnauthorizedException();
    } else if (await this.userService.comparePasswords(user.password, pass)) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
  async login(loginUserDto: LoginUserDto) {
    const user: User = await this.validateUser(
      loginUserDto.username,
      loginUserDto.password,
    );
    const _id = user._id;
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { id: user._id }; //user idt kellene elerni
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
