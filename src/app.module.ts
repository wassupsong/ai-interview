import { Module } from "@nestjs/common";
import { AnalyzeModule } from "./analyze/analyze.module";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";

@Module({
  imports: [
    AnalyzeModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env.local" }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
