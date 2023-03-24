import { Module } from "@nestjs/common";
import { PlayerModule } from "src/application/player/player.module";
import { SessionModule } from "src/application/session/session.module";
import { JiraModule } from "src/application/jira/jira.module";
import { TeamModule } from "src/application/team/team.module";
import { JiraController } from "./controllers/jira.controller";
import { PlayerController } from "./controllers/player.controller";
import { SessionController } from "./controllers/session.controller";
import { TeamController } from "./controllers/team.controller";

@Module({
  imports: [JiraModule, PlayerModule, SessionModule, TeamModule],
  controllers: [
    JiraController,
    PlayerController,
    SessionController,
    TeamController,
  ],
  providers: [],
})
export class ApiModule {}
