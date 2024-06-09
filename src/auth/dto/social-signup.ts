import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SocialSignUpDto {
  @IsString()
  userId: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  username: string;
}
