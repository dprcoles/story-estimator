import { Module } from "@nestjs/common";
import { TeamModule } from "src/application/team/team.module";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { SocketModule } from "../socket.module";
import { TeamEventsHandler } from "./team.events";
import { TeamsGateway } from "./team.gateway";

@Module({
  imports: [InfrastructureModule, TeamModule, SocketModule],
  providers: [TeamsGateway, TeamEventsHandler],
  exports: [TeamsGateway, TeamEventsHandler],
})
export class TeamGatewayModule {}
