import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import {JwtModule} from '@nestjs/jwt';
import { jwtConstant } from '../constant/jwt.constant';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: jwtConstant.secret,
    signOptions: { expiresIn: jwtConstant.expired }
  }), DrizzleModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
