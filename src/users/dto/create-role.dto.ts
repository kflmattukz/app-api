import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateRoleReq {
  @IsString()
  @IsNotEmpty()
  @Length(3, 25)
  roleName: string;
}

export class CreateRoleRes {
  id: number;
  role_name: string;
  created_at: string | Date;
}
