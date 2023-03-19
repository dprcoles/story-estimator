import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { SessionController } from "./session.controller";
import { SessionService } from "./session.service";

@Module({
  imports: [PrismaModule],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
