import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.services';

@Module({
  imports: [DrizzleModule],
  controllers: [UsersController, ProfilesController, RolesController],
  providers: [UsersService, ProfilesService, RolesService],
})
export class UsersModule { }
