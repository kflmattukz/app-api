import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { SignUpReq, SignUpRes } from './dto/sign-up.dto';
import { SignInReq } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async signUp(signUp: SignUpReq): Promise<SignUpRes[]> {
    const saltRound = await bcrypt.genSalt();
    const password = await bcrypt.hash(signUp.password, saltRound);
    Object.assign(signUp, { password });
    return await this.userService.createUser(signUp);
  }

  async signIn(signIn: SignInReq) {
    const user = await this.userService.getUser(signIn.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isMatch = await bcrypt.compare(signIn.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Username and password not match.');
    }
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };

    return {
      responseCode: 200,
      message: 'SUCCESS',
      data: {
        access_token: await this.jwtService.signAsync(payload),
      },
    };
  }
}
