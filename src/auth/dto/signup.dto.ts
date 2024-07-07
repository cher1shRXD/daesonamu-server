import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SignupCredentialDto {
  @IsString()
  @MinLength(4)
  @MaxLength(4)
  studentId: string;
  @IsString()
  @MinLength(4)
  @MaxLength(10)
  username: string;
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,{
    message:"include at least one english character, one number and one special character"
  })
  password: string;
}