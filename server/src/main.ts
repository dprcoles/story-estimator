import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PrismaService } from "./prisma/prisma.service";
import { __prod__ } from "./constants/app.constants";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    allowedHeaders: "*",
    origin: __prod__ ? process.env.WEB_URL : "*",
    credentials: true,
  });

  await app.listen(process.env.PORT || 4000);
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
}

bootstrap();
