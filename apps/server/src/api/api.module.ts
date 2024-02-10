import { Module } from "@nestjs/common";
import { PlayerModule } from "src/application/player/player.module";
import { SessionModule } from "src/application/session/session.module";
import { JiraModule } from "src/application/jira/jira.module";
import { TeamModule } from "src/application/team/team.module";
import { OrganisationModule } from "src/application/organisation/organisation.module";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { JiraController } from "./controllers/jira.controller";
import { PlayerController } from "./controllers/player.controller";
import { SessionController } from "./controllers/session.controller";
import { TeamController } from "./controllers/team.controller";
import { OrganisationController } from "./controllers/organisation.controller";

@Module({
  imports: [
    InfrastructureModule,
    JiraModule,
    PlayerModule,
    SessionModule,
    TeamModule,
    OrganisationModule,
  ],
  controllers: [
    JiraController,
    PlayerController,
    SessionController,
    TeamController,
    OrganisationController,
  ],
  providers: [],
})
export class ApiModule {}
