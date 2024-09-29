import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpReq, SignUpRes } from './dto/sign-up.dto';
import { SignInReq } from './dto/sign-in.dto';
import { IsPublic } from 'src/decorator/is-public.decorator';

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpReq): Promise<SignUpRes[]> {
    return await this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() signInDto: SignInReq) {
    return await this.authService.signIn(signInDto);
  }
}
