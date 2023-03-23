import { Module } from "@nestjs/common";
import { SessionModule } from "src/session/session.module";
import { StoryModule } from "src/story/story.module";
import { TeamModule } from "src/team/team.module";
import { PlayerGatewayModule } from "../player/player.module";
import { SocketStore } from "../socket.store";
import { RoomEventsHandler } from "./room.events";
import { RoomGateway } from "./room.gateway";
import { RoomRepository } from "./room.repository";
import { RoomGatewayService } from "./room.service";

@Module({
  imports: [SessionModule, TeamModule, StoryModule, PlayerGatewayModule],
  providers: [
    RoomGatewayService,
    RoomGateway,
    RoomRepository,
    SocketStore,
    RoomEventsHandler,
  ],
  exports: [RoomGatewayService, RoomGateway],
})
export class RoomGatewayModule {}
