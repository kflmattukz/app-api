import {
  Body,
  Controller,
  Get,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserReq } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserReq,
  ) {
    return await this.usersService.updateUser(id, user);
  }
}
