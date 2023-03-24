import { Module } from "@nestjs/common";
import { TeamModule } from "src/application/team/team.module";
import { SocketStore } from "../socket.store";
import { TeamEventsHandler } from "./team.events";
import { TeamsGateway } from "./team.gateway";

@Module({
  imports: [TeamModule],
  providers: [TeamsGateway, SocketStore, TeamEventsHandler],
  exports: [TeamsGateway, TeamEventsHandler],
})
export class TeamGatewayModule {}
