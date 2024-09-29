import { IsOptional } from 'class-validator';
import { CreateUserReq, CreateUserRes } from './create-user.dto';

export class UpdateUserReq extends CreateUserReq {
  @IsOptional()
  username: string;

  @IsOptional()
  email: string;

  @IsOptional()
  password: string;
}

export class UpdateUserRes extends CreateUserRes {}
