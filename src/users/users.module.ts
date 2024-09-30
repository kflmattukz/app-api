import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

@Module({
  imports: [DrizzleModule],
  controllers: [UsersController, ProfilesController],
  providers: [UsersService, ProfilesService],
})
export class UsersModule {}
