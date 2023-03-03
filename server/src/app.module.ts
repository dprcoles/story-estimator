import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { JiraController } from "./controllers/jira.controller";
import { PlayerController } from "./controllers/player.controller";
import { SessionController } from "./controllers/session.controller";
import { TeamController } from "./controllers/team.controller";
import { AppGateway } from "./gateways/app.gateway";
import { JiraService } from "./services/jira.service";
import { PlayerService } from "./services/player.service";
import { PrismaService } from "./services/prisma.service";
import { SessionService } from "./services/session.service";
import { TeamService } from "./services/team.service";

@Module({
  imports: [],
  controllers: [
    AppController,
    JiraController,
    PlayerController,
    SessionController,
    TeamController,
  ],
  providers: [
    AppService,
    JiraService,
    PlayerService,
    PrismaService,
    SessionService,
    TeamService,
    AppGateway,
  ],
})
export class AppModule {}
