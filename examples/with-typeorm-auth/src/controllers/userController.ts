import { Controller, Get, Post, Body, Authenticated, User as UserParam } from '@varld/warp';
import { IsString, Length } from 'class-validator';
import { UserService } from '../services/userService';
import { User } from '../entities/user';

class CreateUserDTO {
  @IsString()
  @Length(2, 40)
  name: string;
}

@Controller('/user')
export class UserController {
  constructor(
    private userService: UserService
  ) {}

  @Get('/')
  @Authenticated()
  async getCurrentUser(@UserParam() user: User) {
    return {
      user
    };
  }

  @Post('/signup')
  async signup(@Body() body: CreateUserDTO) {
    let user = await this.userService.create(body.name);

    return {
      user
    };
  }
}
