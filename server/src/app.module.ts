import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { RoomGateway } from "./gateways/room.gateway";
import { TeamModule } from "./team/team.module";
import { PrismaModule } from "./prisma/prisma.module";
import { PlayerModule } from "./player/player.module";
import { SessionModule } from "./session/session.module";
import { JiraModule } from "./jira/jira.module";
import { AppService } from "./app.service";

@Module({
  imports: [JiraModule, PlayerModule, PrismaModule, SessionModule, TeamModule],
  controllers: [AppController],
  providers: [AppService, RoomGateway],
})
export class AppModule {}
