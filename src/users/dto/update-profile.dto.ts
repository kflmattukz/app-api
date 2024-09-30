import { IsOptional } from "class-validator";
import { CreateProfileReq, CreateProfileRes } from "./create-profile.dto";
import { Transform } from "class-transformer";

export class UpdateProfileReq extends CreateProfileReq{
  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  @Transform(({value}) => parseInt(value))
  age: number;

  @IsOptional()
  about: string;
}

export class UpdateProfileRes extends CreateProfileRes {}