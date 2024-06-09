import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle("miri-interview api docs")
    .setDescription("너뭐되 프로젝트")
    .setVersion("1.0.0")
    .addTag("api")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api/docs", app, document);
}
