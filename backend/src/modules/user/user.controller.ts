import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserByEmailDto } from './dto/find-user-by-email.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Get('by-email')
  findByEmail(@Query() query: FindUserByEmailDto) {
    return this.userService.getUserByEmail(query.email);
  }

  @Patch(':userId')
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, body);
  }

  @Delete(':userId')
  remove(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.deleteUser(userId);
  }
}
