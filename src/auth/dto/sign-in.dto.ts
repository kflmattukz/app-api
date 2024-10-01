import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignInReq {
  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

