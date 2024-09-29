import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpReq, SignUpRes } from './dto/sign-up.dto';
import { SignInReq } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signUp(@Body() signUpDto: SignUpReq): Promise<SignUpRes[]>{
    return await this.authService.signUp(signUpDto);
  }

  @Post()
  async signIn(@Body() signInDto: SignInReq) {
    return await this.authService.signIn(signInDto);
  }
}
