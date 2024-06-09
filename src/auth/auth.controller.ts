import { Body, Controller, Logger, Post, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SocialSignUpDto } from "./dto/social-signup";

@Controller("auth")
export class AuthController {
  private logger = new Logger("Controller-Auth");
  constructor(private readonly authService: AuthService) {}

  @Post("social/signUp")
  async socialSignUp(
    @Body(ValidationPipe) socialSignUpDto: SocialSignUpDto,
  ): Promise<void> {
    this.logger.debug(`SignUp userId: ${socialSignUpDto.userId}`);
    return this.authService.socialSignUp(socialSignUpDto);
  }

  @Post("social/signIn")
  async socialSignIn(@Body("userId") userId: string) {
    this.logger.debug(`SignIn userId: ${userId}`);
    return this.authService.socialSignIn(userId);
  }
}
