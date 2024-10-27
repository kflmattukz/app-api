import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { RolesService } from './roles.services';
import { CreateRoleReq } from './dto/create-role.dto';
import { UpdateRoleReq } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async getRoles() {
    return await this.rolesService.getRoles();
  }

  @Post()
  async createPost(@Body() role: CreateRoleReq) {
    return await this.rolesService.creatRole(role);
  }

  @Patch(':id')
  async updateRole(
    @Param('id', ParseIntPipe) roleId: number,
    @Body() role: UpdateRoleReq,
  ) {
    return await this.rolesService.updateRole(roleId, role);
  }

  @Delete(':id')
  async removeRole(@Param('id', ParseIntPipe) roleId: number) {
    return await this.rolesService.removeRole(roleId);
  }
}
