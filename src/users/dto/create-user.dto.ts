import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
export class CreateUserReq {
  @IsString()
  @IsNotEmpty()
  @Length(4, 25)
  username: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Length(6, 60)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 90)
  password: string;
}

export class CreateUserRes {
  id: number;
  username: string;
  email: string;
}
