import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length  } from "class-validator";

export class LoginDto{
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @IsString()
  @Length(4,20)
  @IsNotEmpty()
  password: string

}