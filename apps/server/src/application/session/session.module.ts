import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { TeamGatewayModule } from "src/socket/team/team.module";
import { SessionCommandHandlers } from "./commands";
import { SessionQueryHandlers } from "./queries";
import { SessionService } from "./session.service";

@Module({
  imports: [InfrastructureModule, TeamGatewayModule, CqrsModule],
  providers: [
    SessionService,
    ...SessionQueryHandlers,
    ...SessionCommandHandlers,
  ],
  exports: [SessionService],
})
export class SessionModule {}
