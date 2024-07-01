import { Body, Controller, Logger, Post, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SocialSignUpDto } from "./dto/social-signup";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
  private logger = new Logger("Controller-Auth");
  constructor(private readonly authService: AuthService) {}

  @Post("social/signUp")
  @ApiOperation({
    summary: "소셜 회원가입",
  })
  @ApiResponse({
    status: 201,
  })
  async socialSignUp(
    @Body(ValidationPipe) socialSignUpDto: SocialSignUpDto,
  ): Promise<void> {
    this.logger.debug(`SignUp userId: ${socialSignUpDto.userId}`);
    return this.authService.socialSignUp(socialSignUpDto);
  }

  @Post("social/signIn")
  @ApiOperation({
    summary: "소셜 로그인",
  })
  async socialSignIn(@Body("userId") userId: string) {
    this.logger.debug(`SignIn userId: ${userId}`);
    return this.authService.socialSignIn(userId);
  }
}
