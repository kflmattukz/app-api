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
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { JwtTokenType } from 'src/type/jwt.type';
import { AddRoleReq } from './dto/add-role.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Patch('roles')
  async addRoleToUser(
    @CurrentUser() user: JwtTokenType,
    @Body() addrole: AddRoleReq,
  ) {
    return await this.usersService.addRoleToUser(user.sub, addrole.roleId);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserReq,
  ) {
    return await this.usersService.updateUser(id, user);
  }

  @Get('/me')
  async getUserInfo(@CurrentUser() user: JwtTokenType) {
    return await this.usersService.getUserInfo(user.sub);
  }
}
