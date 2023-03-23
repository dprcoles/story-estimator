import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { TeamGatewayModule } from "src/socket/team/team.module";
import { SessionController } from "./session.controller";
import { SessionService } from "./session.service";

@Module({
  imports: [PrismaModule, TeamGatewayModule],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
