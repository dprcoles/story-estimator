import { Module } from "@nestjs/common";
import { PlayerModule } from "src/application/player/player.module";
import { SocketStore } from "../socket.store";
import { PlayerEventsHandler } from "./player.events";
import { PlayerGateway } from "./player.gateway";
import { PlayerRepository } from "./player.repository";
import { PlayerGatewayService } from "./player.service";

@Module({
  imports: [PlayerModule],
  providers: [
    PlayerGatewayService,
    PlayerGateway,
    PlayerRepository,
    SocketStore,
    PlayerEventsHandler,
  ],
  exports: [PlayerGatewayService, PlayerGateway],
})
export class PlayerGatewayModule {}
