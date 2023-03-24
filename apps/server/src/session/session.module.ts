import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { PrismaModule } from "src/prisma/prisma.module";
import { TeamGatewayModule } from "src/socket/team/team.module";
import { SessionCommandHandlers } from "./commands/handlers";
import { SessionQueryHandlers } from "./queries/handlers";
import { SessionController } from "./session.controller";
import { SessionRepository } from "./session.repository";
import { SessionService } from "./session.service";

@Module({
  imports: [PrismaModule, TeamGatewayModule, CqrsModule],
  controllers: [SessionController],
  providers: [
    SessionService,
    SessionRepository,
    ...SessionQueryHandlers,
    ...SessionCommandHandlers,
  ],
  exports: [SessionService],
})
export class SessionModule {}
