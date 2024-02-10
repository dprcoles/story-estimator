import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { __prod__ } from "./constants/app.constants";
import { AppModule } from "./app.module";
import { AzureSocketIoAdapter } from "./adapters/azure-socketio.adapter";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const isAzureWps = Boolean(process.env.HUB_CONNECTION_STRING);

  if (isAzureWps) {
    const azureSocketIoAdapter = new AzureSocketIoAdapter(app);
    await azureSocketIoAdapter.createAzureSocketIOServer(0, {
      cors: {
        origin: __prod__ ? process.env.WEB_URL : "*",
      },
    });

    app.useWebSocketAdapter(azureSocketIoAdapter);
  }

  app.enableCors({
    allowedHeaders: "*",
    origin: __prod__ ? process.env.WEB_URL : "*",
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(process.env.PORT || 4000);
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
}

bootstrap();
