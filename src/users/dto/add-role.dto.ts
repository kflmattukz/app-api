import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class AddRoleReq {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  roleId: number;
}
