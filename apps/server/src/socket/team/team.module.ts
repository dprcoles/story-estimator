import { Module } from "@nestjs/common";
import { TeamModule } from "src/application/team/team.module";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { TeamEventsHandler } from "./team.events";
import { TeamsGateway } from "./team.gateway";

@Module({
  imports: [InfrastructureModule, TeamModule],
  providers: [TeamsGateway, TeamEventsHandler],
  exports: [TeamsGateway, TeamEventsHandler],
})
export class TeamGatewayModule {}
