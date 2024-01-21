import { Module } from "@nestjs/common";
import { PlayerModule } from "src/application/player/player.module";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { SocketModule } from "../socket.module";
import { PlayerEventsHandler } from "./player.events";
import { PlayerGateway } from "./player.gateway";
import { PlayerRepository } from "./player.repository";
import { PlayerGatewayService } from "./player.service";

@Module({
  imports: [PlayerModule, SocketModule, InfrastructureModule],
  providers: [PlayerGatewayService, PlayerGateway, PlayerRepository, PlayerEventsHandler],
  exports: [PlayerGatewayService, PlayerGateway],
})
export class PlayerGatewayModule {}
