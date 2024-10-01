import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateProfileReq {
  @IsString()
  @IsNotEmpty()
  @Length(3, 25)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 25)
  lastName: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(200)
  age: number;

  @IsString()
  @IsOptional()
  about: string;
}

export class CreateProfileRes {
  userId: number;
  firstName: string;
  lastName: string;
  age: number;
  about: string | undefined | null;
}

