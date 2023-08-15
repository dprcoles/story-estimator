import { Module } from "@nestjs/common";
import { SessionModule } from "src/application/session/session.module";
import { StoryModule } from "src/application/story/story.module";
import { TeamModule } from "src/application/team/team.module";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { PlayerGatewayModule } from "../player/player.module";
import { SocketModule } from "../socket.module";
import { RoomEventsHandler } from "./room.events";
import { RoomGateway } from "./room.gateway";
import { RoomRepository } from "./room.repository";
import { RoomGatewayService } from "./room.service";

@Module({
  imports: [
    InfrastructureModule,
    SocketModule,
    SessionModule,
    TeamModule,
    StoryModule,
    PlayerGatewayModule,
  ],
  providers: [
    RoomGatewayService,
    RoomGateway,
    RoomRepository,
    RoomEventsHandler,
  ],
  exports: [RoomGatewayService, RoomGateway],
})
export class RoomGatewayModule {}
