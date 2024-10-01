import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { CurrentUser } from '../decorator/current-user.decorator';
import { JwtTokenType } from '../type/jwt.type';
import { CreateProfileReq } from './dto/create-profile.dto';
import { UpdateProfileReq } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  async getProfile(@CurrentUser() user: JwtTokenType) {
    return await this.profilesService.getProfile(user.sub);
  }

  @Post()
  async createProfile(
    @CurrentUser() user: JwtTokenType,
    @Body() profile: CreateProfileReq,
  ) {
    return await this.profilesService.createProfile(user.sub, profile);
  }

  @Patch()
  async updateProfile(
    @CurrentUser() user: JwtTokenType,
    @Body() profile: UpdateProfileReq,
  ) {
    return await this.profilesService.updateProfile(user.sub, profile);
  }
}

