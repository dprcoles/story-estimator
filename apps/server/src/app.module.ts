import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { TeamModule } from "./team/team.module";
import { PrismaModule } from "./prisma/prisma.module";
import { PlayerModule } from "./player/player.module";
import { SessionModule } from "./session/session.module";
import { JiraModule } from "./jira/jira.module";
import { AppService } from "./app.service";
import { PlayerGatewayModule } from "./socket/player/player.module";
import { RoomGatewayModule } from "./socket/room/room.module";
import { TeamGatewayModule } from "./socket/team/team.module";

@Module({
  imports: [
    JiraModule,
    PlayerModule,
    PrismaModule,
    SessionModule,
    TeamModule,
    PlayerGatewayModule,
    RoomGatewayModule,
    TeamGatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
