import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignUpReq, SignUpRes } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async signUp(signUp: SignUpReq): Promise<SignUpRes[]> {
    return await this.userService.createUser(signUp);
  }

  async signIn(signIn:any) {
    return 'sign in here'
  }

  private validate(username: string, password: string) {
    // valiate if user is exist 
    // validate if password is match
    // return jwt token

    return 'not implemented yet.';
  }
}

