import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { User } from "./entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { SocialSignUpDto } from "./dto/social-signup";

@Injectable()
export class AuthService {
  private logger = new Logger("Service-Auth");
  constructor(private readonly jwtService: JwtService) {}

  async socialSignUp(socialSignUpDto: SocialSignUpDto): Promise<void> {
    try {
      const user = User.create({ ...socialSignUpDto });
      await User.save(user);
    } catch (error) {
      if (error.code === "23505") {
        this.logger.error(
          `already existing username: ${socialSignUpDto.username}`,
        );
        throw new ConflictException("Existing username");
      } else {
        this.logger.error(`method: socialSignUp, param: ${socialSignUpDto}`);
        throw new InternalServerErrorException();
      }
    }
  }

  async socialSignIn(userId: string): Promise<{ accessToken: string }> {
    const findUser = await User.findOne({ where: { userId } });
    if (!findUser) {
      this.logger.error(`not found userId: ${userId}`);
      return {
        accessToken: "",
      };
    }
    const payload = { userId };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
    };
  }
}
