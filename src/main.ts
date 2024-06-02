import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { setSwagger } from "./util/SetSwagger";
import { json, urlencoded } from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: "50mb" }));

  app.use(urlencoded({ extended: true, limit: "50mb" }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  setSwagger(app);
  await app.listen(4000);
}
bootstrap();
