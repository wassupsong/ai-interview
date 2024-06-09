import { Module } from "@nestjs/common";
import { AnalyzeController } from "./analyze.controller";
import { AnalyzeService } from "./analyze.service";
import { HttpModule } from "@nestjs/axios";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    HttpModule.register({
      timeout: 60000,
      maxRedirects: 5,
    }),
    AuthModule,
  ],
  controllers: [AnalyzeController],
  providers: [AnalyzeService],
})
export class AnalyzeModule {}
