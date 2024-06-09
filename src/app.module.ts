import { Module } from "@nestjs/common";
import { AnalyzeModule } from "./analyze/analyze.module";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeORMConfig } from "./configs/typeorm.config";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AnalyzeModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ".env.local",
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeORMConfig,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
